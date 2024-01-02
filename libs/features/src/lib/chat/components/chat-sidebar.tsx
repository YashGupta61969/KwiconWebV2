import { Avatar, Box, Heading } from '@kwicon/kwicon-ui';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import styles from '../chat.module.css';
import { StartConversation } from './start-conversation';
import { getUserState } from '../../user-profile/slices/user.slice';
import { azureActions, getAzureSliceState } from '../../azure-commmunication/slices/azure.slice';
import { listThreadMessages, listThreads } from '../../azure-commmunication/thunk-apis/azure';
import { ACSConversation } from './ACSConversation';
import { thread } from '../interfaces/chat-interfaces';
import Skeleton from 'react-loading-skeleton';

export const ChatSidebar = () => {
	const theme = useTheme();
	const dispatch = useDispatch<AppDispatch>();

	const { user } = useSelector(getUserState)

	const {
		currentThread,
		allThreads,
		loadingStatus
	} = useSelector(getAzureSliceState);

	const handleClickChatuser = async (thread: thread) => {
		dispatch(azureActions.setCurrentThread({ thread, user }))
		await dispatch(listThreadMessages(thread.id));
		if (thread.unreadMessages !== 0) {
			dispatch(listThreads(null))
		}
	}

	useEffect(() => {
		dispatch(listThreads(null))
	}, [])

	return (
		<Box
			bg={theme.palettes.colors.white as string}
			width={'35%'}
			height={'auto'}
			// overflow={allThreads?.length !== 0 && 'auto'}
			className={allThreads?.length !== 0 ? styles['sidebar'] : ''}
		>
			<Box pb={'0.5rem'} px={'1rem'}>
				<Heading fs={'1.75rem'} fw={'700'} style={{ margin: 0 }}>
					Chat
				</Heading>
			</Box>

			<Box className={styles['chat_coversations']}>
				{allThreads?.length === 0 && loadingStatus === 'loading' ? (
					[0, 1, 2, 3, 4].map(() => {
						return <Box
							p={'1rem'}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '1rem',
							}}
						>
							<Avatar
								size="small"
								type={'text'}
								loading={true}
							/>
							<Box style={{ flex: 1 }}>
								<Box width={'100%'} height={'1rem'}>
									<Skeleton />
								</Box>
								<Box width={'100%'} height={'1rem'} mt={'0.5rem'}>
									<Skeleton />
								</Box>
							</Box>
						</Box>
					})
				) : allThreads?.length === 0 ? (
					<StartConversation />
				) : (
					allThreads?.map((thread: thread, index) => (
						<ACSConversation
							key={index}
							thread={thread}
							profilePicture="646dc079bd795d433f0fd39c"
							lastMessage={thread?.lastMessage}
							lastMessageDate={new Date(thread?.lastMessageSentDate)}
							unreadCount={thread?.lastMessageSentBy !== user.id ? thread?.unreadMessages : 0}
							status="private"
							onClickThread={() => handleClickChatuser(thread)}
							isActiveChat={currentThread?.id === thread.id}
						/>
					))
				)}
			</Box>
		</Box>
	);
};
