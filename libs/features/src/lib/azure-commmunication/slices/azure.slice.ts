import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../../app-store/app-store';
import {
	createThread,
	listThreadMessages,
	listThreads,
	sendMessageACS
} from '../thunk-apis/azure';
import { AzureState } from '../interfaces/state-interface';
import { IUser } from '../../user-profile/interfaces/user-profile-interfaces';

export const AZURE_COMMUNICATION_FEATURE_KEY = 'azure';

const initialAzureCommunicationState : AzureState = {
	loadingStatus: 'not loaded',
	error: undefined,
	parentMessage: undefined,
	otherUser: {},
	currentChat: [],
	currentThread: undefined,
	allThreads: [],
	totalPages: 0,
	currentPage: 0,
	Limit: 0,
	tempMessage: {}
};

export const azureSlice = createSlice({
	name: AZURE_COMMUNICATION_FEATURE_KEY,
	initialState: initialAzureCommunicationState,
	reducers: {
		setCurrentThread(state, action) {
			const otherUser = action.payload.thread.participants.find((p: IUser) => p.id !== action.payload.user.id);

			state.currentThread = action.payload.thread;
			state.otherUser = otherUser
		},
		addParentMessage(state, action) {
			state.parentMessage = action.payload
		},
		removeParentMessage(state) {
			state.parentMessage = undefined
		},
		setTempMessage(state, {payload}) {
			state.tempMessage = payload
		}
	},
	extraReducers: builder => {
		// /**
		//  * Set Current Thread
		//  */
		builder
			.addCase(createThread.pending, state => {
				state.loadingStatus = 'loading';
			})
			.addCase(createThread.fulfilled, (state, action) => {
				state.loadingStatus = 'loaded';
				state.currentThread = action.payload;
			})
			.addCase(createThread.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.error = action.error.message;
				toast.error('Error while creating dialog of QB');
			});

		/**
		 * Set All Thread
		 */
		builder
			.addCase(listThreads.pending, state => {
				state.loadingStatus = 'loading';
			})
			.addCase(listThreads.fulfilled, (state, action) => {
				state.loadingStatus = 'loaded';
				state.allThreads = action.payload;
			})
			.addCase(listThreads.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.error = action.error.message;
				toast.error('Error while getting all dialogs of QB');
			});

		/**
		 * Set Current Chat
		 */
		builder
			.addCase(listThreadMessages.pending, state => {
				state.loadingStatus = 'loading';
			})
			.addCase(listThreadMessages.fulfilled, (state, action) => {
				state.loadingStatus = 'loaded';
				state.currentChat = action.payload;
			})
			.addCase(listThreadMessages.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.error = action.error.message;
				toast.error('Error while getting chats of QB');
			});

		/**
		 * Send Message
		 */
		builder
			.addCase(sendMessageACS.pending, state => {
				state.loadingStatus = 'sending message';
			})
			.addCase(sendMessageACS.fulfilled, (state, action) => {
				state.loadingStatus = 'loaded';
			})
			.addCase(sendMessageACS.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.error = action.error.message;
				toast.error('Error Sending Message');
			});
	},
});

/*
 * Exporting reducer for store configuration.
 */
export const azureReducer = azureSlice.reducer;

export const azureActions = azureSlice.actions;

export const getAzureSliceState = (rootState: RootState) =>
	rootState[AZURE_COMMUNICATION_FEATURE_KEY];
