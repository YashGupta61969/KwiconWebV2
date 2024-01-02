import { Box, Breadcrumb } from '@kwicon/kwicon-ui';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import styles from './chat.module.css';
import { ChatBody } from './components/chat-body';
import { ChatSidebar } from './components/chat-sidebar';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app-store/app-store';
import { getConnections } from '../user-profile/thunk-apis/get-connections';

export function Chat() {
	// hooks
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const [connectedAdvisors, setConnectedAdvisors] = useState([]);
	const [connectedStudents, setConnectedStudents] = useState([]);
	const [qbUserIdWithActiveStatus, setQbUserIdWithActiveStatus] = useState([]);

	useEffect(() => {
		handleGetAdvisorsConnection();
		handleGetSeekersConnection();
	}, []);

	useEffect(() => {
		// merge all connected users
		if (connectedAdvisors?.length && connectedStudents?.length) {
			const allConnectedUsers = [...connectedAdvisors, ...connectedStudents];

			const mappedActiveStatusAndId = allConnectedUsers?.map(user => {
				return {
					quickbloxUserId: user?.quickbloxUserId,
					isActive: user?.isActive,
				};
			});

			setQbUserIdWithActiveStatus(mappedActiveStatusAndId);
		}
	}, [connectedAdvisors, connectedStudents]);

	const handleGetAdvisorsConnection = async () => {
		try {
			const response = await dispatch(
				getConnections({
					type: 'advisor',
					limit: 100,
				}),
			);
			setConnectedAdvisors(response.payload.docs);
		} catch (error) {
			throw new Error(error as string);
		}
	};
	const handleGetSeekersConnection = async () => {
		try {
			const response = await dispatch(
				getConnections({
					type: 'seeker',
					limit: 100,
				}),
			);
			setConnectedStudents(response.payload.docs);
		} catch (error) {
			throw new Error(error as string);
		}
	};

	return (
		<Box className={styles['chat_wrapper']}>
			<Breadcrumb navigate={navigate} />
			<Box className={styles['chat_container']}>
				{/* Chat Sidebar */}
				<ChatSidebar />

				{/* Chat body */}
				<ChatBody />
				{/* <Box
					bg={theme.palettes.colors.white as string}
					className={styles['chat_body']}
				>
					<Paragraph fs="1rem">
						Select a contact (sample placeholder, needs update)
					</Paragraph>
				</Box> */}
			</Box>
		</Box>
	);
}

export default Chat;
