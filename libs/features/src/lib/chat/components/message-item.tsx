import { Icons, getDateFormat, useGetMedia } from '@kwicon/commons';
import { Box, Button, Heading, Icon, Loaders, Modal, Paper, Paragraph } from '@kwicon/kwicon-ui';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSocialFeedPostById } from '../../app-home/thunk-apis/get-social-feed-post-by-id';
import { thunkString } from '../../app-home/thunk-apis/thunk-string';
import { AppDispatch } from '../../app-store/app-store';
import styles from '../chat.module.css';
import { IChat } from '../interfaces/chat-interfaces';
import { getUserState } from '../../user-profile/slices/user.slice';
import { BiCopyAlt } from 'react-icons/bi';
import { HiReply } from 'react-icons/hi';
import { deleteMessageACS } from '../../azure-commmunication/thunk-apis/azure';
import { azureActions, getAzureSliceState } from '../../azure-commmunication/slices/azure.slice';
import { BsFillTrash3Fill } from 'react-icons/bs';

export interface MessageItemProps {
	message: IChat;
	read: boolean;
	isSearched: boolean;
}

export function MessageItem({ message, read, isSearched }: MessageItemProps) {
	const boxRef = useRef(null);
	const { media } = useGetMedia(message?.multimedia as string);
	const { createdAt, sentBy, sentTo, thread, unread, id } = message;
	const dispatch = useDispatch<AppDispatch>();
	const [singlePost, setSinglePost] = useState<any>({});
	const [showMessageOptions, setShowMessageOptions] = useState(false)
	const [showPDFModal, setShowPDFModal] = useState(false);
	const [showImageModal, setShowImageModal] = useState(false);
	// redux store
	const { user } = useSelector(getUserState);
	const { currentChat } = useSelector(getAzureSliceState);

	useEffect(() => {
		boxRef.current.style.backgroundColor = sentBy != user.id ? '#EDEDED' : '#DBDEFF'
		boxRef.current.style.borderRadius = sentBy != user.id ? '12px 12px 12px 0px' : '12px 12px 0px 12px'
	}, [currentChat.length])

	useEffect(() => {
		// get the link from the message
		const link = messageHasLink(message.message);
		if (link) {
			// get the post id from the last part of the link
			const postId = link[0]?.split('/')?.pop();
			// get the post by id
			handleGetPostById(postId as string);
		}
	}, [message.message]);

	const messageHasLink = (msg: string) => {
		const link = msg?.match(/((https|http)?:\/\/[^\s]+)/g);
		return link;
	};

	const handleGetPostById = async (postId: string) => {
		try {
			const response = await dispatch(getSocialFeedPostById(postId));
			if (response?.type === `${thunkString.getSocialFeedPostById}/fulfilled`) {
				setSinglePost(response.payload);
			} else {
				setSinglePost(null);
			}
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const deleteMessage = async () => dispatch(deleteMessageACS(message));
	const copyToClipboard = async () => window.navigator.clipboard.writeText(message.message);
	const addMessageAsParent = async () => dispatch(azureActions.addParentMessage(message));

	return (
		<Box
			my={'0.5rem'}
			as="div"
			className={styles[sentBy !== user.id ? 'left' : 'right']}
		>
			<div
				ref={boxRef}
				style={{
					display: 'inline-block',
					maxWidth: '60%',
					position: 'relative',
					// zIndex: 20,
					padding: '0.8rem'
				}}
				className={styles['message-content']}
				onMouseEnter={() => setShowMessageOptions(true)}
				onMouseLeave={() => setShowMessageOptions(false)}
			>
				{
					showMessageOptions && <Box
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							gap: 15,
							borderRadius: 8,
							transform: 'translate(0, -100%)',
						}}
						position='absolute'
						left={sentBy !== user.id && ('-' + boxRef.current.offsetWidth + '')}
						right={sentBy === user.id && '0%'}
						px={'0.8rem'}
						py={'1rem'}
						bg='white'
						width={'fit-content'}
						boxShadow={'0 0 8px rgba(0, 0, 0, 0.2)'}
					>
						<HiReply color='blue' onClick={addMessageAsParent} cursor={'pointer'} />
						<BiCopyAlt color='blue' onClick={copyToClipboard} cursor={'pointer'} />
						<BsFillTrash3Fill color='blue' onClick={deleteMessage} cursor={'pointer'} />
					</Box>
				}
				<Box
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Paragraph
						fs={'0.75rem'}
						color="rgba(70, 75, 128, 0.6)"
						style={{ margin: 0 }}
					>
						{getDateFormat(createdAt, 'MMM DD, LT')}
					</Paragraph>
					{sentBy == user.id && (
						<Box style={{ marginTop: '6px', marginLeft: '6px' }}>
							<Icon
								height="13px"
								width="13px"
								color={unread ? 'gray' : '#0000FF'}
								component={Icons.TickCircleIcon}
							/>
						</Box>
					)}
				</Box>

				{
					message.type === 'image' && (media ? <img
						style={{
							borderRadius: '10px',
							cursor: 'pointer'
						}}
						src={media}
						alt={'sent Image'}
						width={'100%'}
						onClick={() => setShowImageModal(true)}
					/> : <div style={{ width: '300px', height: '200px' }}>
						<Loaders.Component />
					</div>)
				}

				{
					media && message.type === 'pdf' && <Box
						bg='white'
						px={'0.2rem'}
						py={'0.1rem'}
						style={{
							borderLeft: '2px solid blue'
						}}
						cursor='pointer'
						onClick={() => setShowPDFModal(true)}
					>
						<Paragraph style={{
							margin: 0,
							paddingTop: '4px',
							paddingBottom: '4px',
						}}>
							PDF file
						</Paragraph>

					</Box>
				}

				{
					message.type === 'video' && (media ? <Box
						bg='white'
						px={'0.2rem'}
						py={'0.1rem'}
						style={{
							borderLeft: '2px solid blue'
						}}
						cursor='pointer'
						onClick={() => setShowPDFModal(true)}
					>
						<video width="100%" controls>
							<source src={media} />
						</video>
					</Box> : <div style={{ width: '300px', height: '200px' }}>
						<Loaders.Component />
					</div>)
				}

				{messageHasLink(message.message) && singlePost?.id ? (
					<Link to={messageHasLink(message.message)?.[0] as string}>
						<Paper mt={'0.5rem'} showTransition>
							<Box mb={'1rem'}>
								<Box
									style={{
										fontWeight: 700,
										fontSize: '1.25rem',
									}}
								>
									{singlePost?.title}
								</Box>
								<Box
									mt={'0.3125rem'}
									style={{
										fontSize: '0.875rem',
										color: 'rgba(0, 0, 0, 0.6)',
									}}
								>
									{singlePost?.userId?.name ?? 'Unknown'},{' '}
									{format(new Date(singlePost?.createdAt), 'MMM dd, yyyy')}
								</Box>
							</Box>
							<Paragraph
								fs={'0.875rem'}
								color="rgba(0, 0, 0, 0.6)"
								style={{
									margin: 0,
									wordWrap: 'break-word',
									whiteSpace: 'pre-wrap',
								}}
							>
								{singlePost?.content?.slice(0, 150)}...
							</Paragraph>
						</Paper>
					</Link>
				) : null}
				{/* {chatMessage?.message && ( */}
				{
					message.parentMessage ? <Box>
						<Box
							bg='white'
							px={'0.2rem'}
							style={{
								borderLeft: '2px solid blue'
							}}
						>
							<Paragraph
								fs={'0.9rem'}
								color="#333333"
								style={{
									margin: 0,
									paddingTop: '4px',
									paddingBottom: '4px',
									wordWrap: 'break-word',
									whiteSpace: 'pre-wrap',
								}}>
								{message.parentMessage.message}
							</Paragraph>

						</Box>
						<Box bg={isSearched && 'yellow'}>
							<Paragraph
								fs={'0.9rem'}
								color="#333333"
								bg='#FFFF00'
								style={{
									margin: 0,
									wordWrap: 'break-word',
									whiteSpace: 'pre-wrap',
								}}>
								{message.message}
							</Paragraph>
						</Box>
					</Box> :
						<Box bg={isSearched && 'yellow'}>
							<Paragraph
								fs={'0.9rem'}
								color="#333333"
								bg='#FFFF00'
								style={{
									margin: 0,
									wordWrap: 'break-word',
									whiteSpace: 'pre-wrap',
								}}
							>
								{messageHasLink(message.message)
									? message.message.replace(messageHasLink(message.message)?.[0] as string, '')
									: message.message}
							</Paragraph>
						</Box>
				}
				{/* )} */}
			</div>
			{/* PDF SHOW MODAL */}
			<Modal
				isOpen={showPDFModal}
				modalContentStyle={{
					width: '60%',
				}}
				toggleModal={() => setShowPDFModal(!showPDFModal)}
			>
				<Box>
					<Heading
						style={{
							textTransform: 'capitalize',
						}}
						type="h3"
					>
						{media && media?.name?.split?.('.')[0]}
					</Heading>

					<Box
						mt={'1rem'}
						style={{
							height: '60vh',
						}}
					>
						<object
							style={{
								borderRadius: '0.5rem',
							}}
							height={'100%'}
							width={'100%'}
							data={media}
						>
							{media && media?.name}
						</object>
					</Box>
					<Box
						mt={'1rem'}
						style={{
							display: 'flex',
							justifyContent: 'flex-end',
						}}
					>
						<Button onClick={() => setShowPDFModal(false)} variant="tertiary">
							Close
						</Button>
					</Box>
				</Box>
			</Modal>

			{/* Image SHOW MODAL */}
			<Modal
				isOpen={showImageModal}
				modalContentStyle={{
					width: '80%',
					// height:'85%',
					display: 'grid',
					placeItems: 'center',
				}}
				toggleModal={() => setShowImageModal(!showImageModal)}
			>
				<img
					style={{
						borderRadius: '10px',
						objectFit: 'contain'
					}}
					src={media}
					alt={'sent Image'}
					height={'550rem'}
				/>
				<Box
					mt={'1rem'}
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
					}}
				>
					<Button onClick={() => setShowImageModal(false)} variant="tertiary">
						Close
					</Button>
				</Box>
			</Modal>
		</Box >
	);
}
