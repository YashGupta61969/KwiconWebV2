import { Box, Loaders } from '@kwicon/kwicon-ui';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import styles from '../chat.module.css';
import { ChatBlockedIndicator } from './chat-availability-indicator';
import { ChatEmpty } from './chat-empty';
import { ChatHeader } from './chat-header';
import { ChatInput } from './chat-input';
import { ChatMessages } from './chat-messages';
import { StartConversation } from './start-conversation';
import { azureActions, getAzureSliceState } from '../../azure-commmunication/slices/azure.slice';
import { useEffect, useState } from 'react';

export function ChatBody() {
	const dispatch = useDispatch()
	const theme = useTheme();

	// const { currentChat, currentDialog } = useSelector(getQuickbloxSliceState);
	const { currentThread, currentChat, loadingStatus, tempMessage } = useSelector(getAzureSliceState);
	const [searchValue, setSearchValue] = useState('')
	const [messages, setMessages] = useState(currentChat)

	useEffect(() => {
		setMessages(currentChat)
		dispatch(azureActions.setTempMessage({}))
	}, [currentChat.length])

	useEffect(() => {
		if (tempMessage?.sentBy) {
			// console.log(tempMessage)
			setMessages(prev => [...prev, tempMessage])
		}
	}, [tempMessage?.message])

	const isEmptyChat = !currentThread?.id;

	const getDateString = (date: Date) => {
		const now = new Date();
		if (date.getFullYear() === now.getFullYear()) {
			if (date.getMonth() === now.getMonth()) {
				if (date.getDate() === now.getDate()) {
					return 'Today';
				}
				if (date.getDate() === now.getDate() - 1) {
					return 'Yesterday';
				}
			}
			return date
				.toDateString()
				.replace(/(^\w+\s)|(\s\d+$)/g, '')
				.split(' ')
				.reverse()
				.join(' ')
				.replace(/^0/, '');
		} else {
			const [month, day, year] = date
				.toDateString()
				.replace(/(^\w+\s)/, '')
				.split(' ');
			return [day, month, year].join(' ');
		}
	};

	// const temp = currentChat?.items
	// 	?.reduce((acc, message) => {
	// 		const date = new Date(message?.created_at);

	// 		const section = acc.find(
	// 			({ title }: { title: Date }) =>
	// 				title.getDate() === date.getDate() &&
	// 				title.getMonth() === date.getMonth() &&
	// 				title.getFullYear() === date.getFullYear(),
	// 		);

	// 		if (section) {
	// 			section?.data?.push(message);
	// 		} else {
	// 			acc?.push({ data: [message], title: date });
	// 		}

	// 		return acc;
	// 	}, [])
	// 	?.map(object => {
	// 		const newTitle = getDateString(new Date(object.title));
	// 		object.title = newTitle;
	// 		return object;
	// 	});

	return isEmptyChat ? (
		<ChatEmpty />
	) : (
		<Box
			bg={theme.palettes.colors.white as string}
			className={styles['chat_body']}
		>
			{/* Chat Header */}
			<ChatHeader setSearchValue={setSearchValue} />

			{/* Start Conversation */}
			{messages?.length === 0 && loadingStatus !== 'loading' && <StartConversation />}

			{/* Messages */}
			<ChatMessages messages={messages} searchText={searchValue} loadingStatus={loadingStatus} />

			{/* Chat Input */}
			{/* If user is unavailable to chat need to pass name as 2nd parametter */}
			<ChatInput />
			{/* {currentThread?.participants?.some(p =>
				connectionsQBUserIds?.advisor
					?.concat(connectionsQBUserIds.seeker)
					?.includes(p),
			)
				? getUserChatComponent('available')
				: getUserChatComponent('unavailable', currentThread?.name)} */}
		</Box>
	);
}

// utility function for this component
function getUserChatComponent(availabilityStatus: string, username?: string) {
	switch (availabilityStatus) {
		case 'unavailable':
			return <ChatBlockedIndicator name={username} />;
		case 'available':
			return <ChatInput />;
		default:
			return null;
	}
}
