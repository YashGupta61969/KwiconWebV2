import {
	Box,
	FormElements,
	Heading,
	Icon,
	IconButton,
	Modal,
	Paper,
} from '@kwicon/kwicon-ui';
import { useTheme } from 'styled-components';
import { Icons, envKeys } from '@kwicon/commons';
import { getConnections } from '../../user-profile/thunk-apis/get-connections';
import { AppDispatch } from '../../app-store/app-store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { MediaImage } from '@kwicon/components';
import {
	createDialogQB,
	getChatsQB,
} from '../../quickblox/thunk-apis/quickblox';
import { useNavigate } from 'react-router-dom';

interface ShareModalProps {
	isOpen: boolean;
	toggleModal: () => void;
	postId: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
	isOpen,
	toggleModal,
	postId,
}) => {
	const theme = useTheme();
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const [connections, setConnections] = useState<any[]>([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		if (isOpen && search === '') {
			handleGetConnections();
		}
	}, [isOpen, search]);

	const handleGetConnections = async () => {
		try {
			const advisorResponse = await dispatch(
				getConnections({
					type: 'advisor',
					limit: 100,
				}),
			);

			const seekerResponse = await dispatch(
				getConnections({
					type: 'seeker',
					limit: 100,
				}),
			);

			// combine both connections
			if (advisorResponse.payload?.docs && seekerResponse.payload?.docs) {
				setConnections([
					...advisorResponse.payload.docs,
					...seekerResponse.payload.docs,
				]);
			}
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const handleSearch = () => {
		if (search !== '') {
			const filteredConnections = connections.filter(connection =>
				connection.name.toLowerCase().includes(search.toLowerCase()),
			);
			setConnections(filteredConnections);
		} else {
			handleGetConnections();
		}
	};

	const handleChatClick = async (
		QBUserId: number,
		userId: string,
		photoId: string,
		profession: string,
	) => {
		const response = await dispatch(
			createDialogQB({
				type: 3,
				occupants_ids: [QBUserId],
				data: {
					class_name: 'kwiconCustomData',
					userId,
					photoId,
					profession,
				},
			}),
		);

		dispatch(
			getChatsQB({
				chat_dialog_id: response?.payload._id,
				sort_asc: 'date_sent',
				limit: 100,
			}),
		);

		navigate('/chat', {
			state: {
				postLink: `posts/${postId}`,
				currentDialogueId: response?.payload._id,
			},
		});
	};

	return (
		<Modal
			isOpen={isOpen}
			toggleModal={toggleModal}
			modalContentStyle={{
				width: '30%',
			}}
		>
			{/* HEADER */}
			<Box
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Heading
					lh={0}
					type="h3"
					style={{
						color: theme.palettes.colors.darkBlue[0],
					}}
				>
					Share with
				</Heading>
				<IconButton bg="transparent" onClick={toggleModal}>
					<Icon component={Icons.CrossIcon} height="1rem" width="1rem" />
				</IconButton>
			</Box>
			{/* Search Box */}
			<Box
				mt={'1rem'}
				style={{
					display: 'flex',
					gap: '0.5rem',
					alignItems: 'center',
				}}
			>
				<FormElements.Input
					placeholder="Search Connections"
					width={'100%'}
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
				<IconButton bg="transparent" onClick={handleSearch}>
					<Icon component={Icons.SearchIcon} height="1rem" width="1rem" />
				</IconButton>
			</Box>

			{/* CONTENT */}
			<Box
				mt={'1rem'}
				style={{
					display: 'flex',
					flexDirection: 'column' as const,
					gap: '0.5rem',
					height: '50vh',
					overflowY: 'scroll' as const,
				}}
			>
				{connections?.map((connection: any, index: number) => (
					<Paper
						showTransition
						cursor="pointer"
						withBorder
						p={'0.5rem'}
						key={connection?.id}
						onClick={() =>
							handleChatClick(
								connection?.quickbloxUserId,
								connection?.id,
								connection?.profilePicture,
								connection?.profession,
							)
						}
					>
						<Box
							style={{
								display: 'flex',
								gap: '0.5rem',
								alignItems: 'center',
							}}
						>
							<MediaImage
								mediaId={connection?.profilePicture}
								avatarProps={{
									type: 'image',
									text: connection?.name,
									size: 'small',
								}}
							/>
							<Box>
								<Box
									style={{
										fontSize: '0.875rem',
										fontWeight: 700,
									}}
								>
									{connection?.name}
								</Box>
								<Box
									color="rgba(79, 79, 79, 1)"
									style={{
										fontSize: '0.75rem',
									}}
								>
									{connection?.profession ? `${connection?.profession} | ` : ''}{' '}
									{connection?.role}
								</Box>
							</Box>
						</Box>
					</Paper>
				))}
			</Box>
		</Modal>
	);
};

export default ShareModal;
