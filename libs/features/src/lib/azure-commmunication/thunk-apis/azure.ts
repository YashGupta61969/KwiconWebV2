import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
// @ts-ignore
import * as QB from 'quickblox/quickblox';
import { client, convertJSONToFormData, cookies, endpoints, envKeys, localhostClient } from '@kwicon/commons';
import axios from 'axios';
import decode from 'jwt-decode';
import { ChatClient, ChatMessageReceivedEvent, SendMessageOptions } from '@azure/communication-chat';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { IChat, thread } from '../../chat/interfaces/chat-interfaces';
import { azureActions } from '../slices/azure.slice';
import { File } from 'buffer';

export const createThread = createAsyncThunk(
    thunkString.createThread,
    async (
        payload: Array<string>,
        thunkAPI,
    ) => {
        try {
            const response = await client.post(endpoints.chat.createChat, { participants: payload })
            return response.data;
        } catch (error) {
            console.log('error creating chat thread', error)
            return thunkAPI.rejectWithValue(error);
        }
    },
);

export const listThreads = createAsyncThunk(
    thunkString.listThreads,
    async (
        payload: null,
        thunkAPI,
    ) => {
        try {
            const response = await client.get(endpoints.chat.getChats)

            function compareDates(item1: thread, item2: thread) {
                const date1 = item1?.lastMessageSentDate;
                const date2 = item2?.lastMessageSentDate;

                // Handle undefined dates
                if (date1 === undefined && date2 === undefined) {
                    return 0;
                }
                if (date1 === undefined) {
                    return 1; // undefined dates come after defined dates
                }
                if (date2 === undefined) {
                    return -1; // defined dates come before undefined dates
                }

                return new Date(date2).getTime() - new Date(date1).getTime();
            }
            return response.data.sort(compareDates)
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

export const listThreadMessages = createAsyncThunk(
    thunkString.getThreadMessages,
    async (
        payload: ChatMessageReceivedEvent | string,
        thunkAPI,
    ) => {
        try {
            if (typeof payload === 'string') {
                const res = await client.get(`${endpoints.chat.retrieveMEssages}/${payload}`)
                return res.data
            }
        } catch (error) {
            console.log('error listing azure messages', error)
            return thunkAPI.rejectWithValue(error);
        }
    },
);

export const sendMessageACS = createAsyncThunk(
    thunkString.sendMessageACS,
    async (
        payload: {
            message: string;
            from: string;
            to: string;
            thread: thread;
            unread: boolean;
            parentMessage: IChat | undefined,
            multimedia: File | undefined
        },
        thunkAPI,
    ) => {
        try {
            const token: string | null = cookies.get('access_token');
            const { azureAccessToken } = decode(token)
            // @ts-ignore
            let chatClient = new ChatClient(envKeys.COMMUNICATION_SERVICES_ENDPOINT, new AzureCommunicationTokenCredential(azureAccessToken));

            const getMessageType = () => {
                if (payload?.multimedia?.type === "image/png") {
                    return 'image'
                } else if (payload?.multimedia?.type === "application/pdf") {
                    return 'pdf'
                } else if (payload?.multimedia?.type?.startsWith("video")) {
                    return 'video'
                } else {
                    return 'text'
                }
            }

            const sendMessageRequest =
            {
                content: payload.message
            };
            const sendMessageOptions: SendMessageOptions =
            {
                senderDisplayName: payload.from,
                type: 'text',
                metadata: {
                    threadId: payload.thread.id,
                    type: getMessageType()
                }
            };

            const chatThreadClient = chatClient.getChatThreadClient(payload.thread.threadId);
            const messageSent = await chatThreadClient.sendMessage(sendMessageRequest, sendMessageOptions)
            
            const formData = convertJSONToFormData({
                multimedia: payload.multimedia,
                type: getMessageType(),
                message: payload.message || '',
                thread: payload.thread.id,
                azureThreadId: payload.thread.threadId,
                azureMessageId: messageSent.id,
                sentBy: payload.from,
                sentTo: payload.to,
                unread: payload.unread,
                parentMessage: payload.parentMessage?.id,
            });
            
            const response = await client.post(endpoints.chat.sendMessage, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            await chatThreadClient.updateMessage(messageSent.id, {
                metadata:{
                    threadId: payload.thread.id,
                    type: getMessageType()
                }
            })
            if (payload.parentMessage?.id) {
                thunkAPI.dispatch(azureActions.removeParentMessage());
            }
            return response.data
        } catch (error) {
            console.log('error sending acs message', error)
            return thunkAPI.rejectWithValue(error);
        }
    },
);

export const deleteMessageACS = createAsyncThunk(
    thunkString.deleteMessageACS,
    async (
        payload: IChat,
        thunkAPI,
    ) => {
        try {
            const token: string | null = cookies.get('access_token');
            const { azureAccessToken } = decode(token)
            // @ts-ignore
            let chatClient = new ChatClient(envKeys.COMMUNICATION_SERVICES_ENDPOINT, new AzureCommunicationTokenCredential(azureAccessToken));
            const chatThreadClient = chatClient.getChatThreadClient(payload.azureThreadId);

            await client.delete(`${endpoints.chat.deleteMessage}/${payload.id}`)
            await chatThreadClient.deleteMessage(payload.azureMessageId)
            thunkAPI.dispatch(listThreadMessages(payload.thread))

        } catch (error) {
            console.log('error deleting message', error)
            thunkAPI.rejectWithValue(error)
        }
    }
)