import { Icons, useGetMedia } from '@kwicon/commons';
import { Box, Button, Heading, Icon, IconButton, Modal, UploadWrapper } from '@kwicon/kwicon-ui';
import {
	KeyboardEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import styles from '../chat.module.css';
import { getUserState } from '../../user-profile/slices/user.slice';
import { ChatBlockedIndicator } from './chat-availability-indicator';
import Skeleton from 'react-loading-skeleton';
import { sendMessageACS } from '../../azure-commmunication/thunk-apis/azure';
import { azureActions, getAzureSliceState } from '../../azure-commmunication/slices/azure.slice';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { ImageWrapper } from '../../app-home/components/image-wrapper';
import { BiVideo } from 'react-icons/bi';
import { HiOutlinePaperClip } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { Oval } from 'react-loader-spinner';
import { toast } from 'react-toastify';

export function ChatInput() {
	const textareaRef = useRef(null);

	const theme = useTheme();
	const dispatch = useDispatch<AppDispatch>();
	const { currentThread, otherUser, parentMessage, loadingStatus } = useSelector(getAzureSliceState);

	const { user } = useSelector(getUserState);

	const [message, setMessage] = useState('');
	const [isUserActive, setIsUserActive] = useState(true);
	const [showMediaOptions, setShowMediaOptions] = useState(false);
	const [showPDFModal, setShowPDFModal] = useState(false);

	const [previewImage, setPreviewImage] = useState<string>('');
	const [uploadedImageFile, setUploadedImageFile] = useState({});

	const [uploadedFile, setUploadedFile] = useState();
	const [previewFile, setPreviewFile] = useState();

	const [uploadedVideo, setUploadedVideo] = useState();
	const [previewVideo, setPreviewVideo] = useState();

	const { media } = useGetMedia(previewFile);

	// Events for Text editor
	const handleInputChange = (e: any) => {
		setMessage(e.target.value);
		adjustTextareaHeight();
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault(); // Prevent the default behavior of the Enter key
			handleFinalSubmit();
		}
	};

	const handleFocus = () => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.overflowY = 'scroll';
		}
	};

	const handleBlur = () => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.overflowY = 'auto';
		}
	};


	useEffect(() => {
		adjustTextareaHeight();
	}, [message]);

	const adjustTextareaHeight = useMemo(
		() => () => {
			const textarea = textareaRef.current;
			if (textarea) {
				textarea.style.height = '10px';
				textarea.style.height = `${textarea.scrollHeight}px`;
			}
		},
		[],
	);

	// Submit Handler
	const handleFinalSubmit = async () => {
		setMessage('');
		setShowMediaOptions(false);
		setUploadedFile(undefined)
		setUploadedImageFile({})
		setUploadedVideo(undefined)
		setPreviewImage('');
		setPreviewFile(undefined);
		setPreviewVideo(undefined);
		if (message.trim() === '' && !uploadedImageFile?.type && !uploadedFile?.type) {
			return;
		}

		const media = (uploadedImageFile?.type && uploadedImageFile) || (uploadedFile?.type && uploadedFile) || (uploadedVideo?.type && uploadedVideo)

		try {
			dispatch(azureActions.setTempMessage({
				message,
				sentBy: user?.id,
				thread: currentThread,
				sentTo: otherUser.id,
				unread: true,
				parentMessage: parentMessage,
				createdAt: new Date(),
				multimedia: undefined,
				status: 'sending',
				type : media ? 'image' : 'text'
			}))
			await dispatch(sendMessageACS({
				message,
				from: user?.id,
				thread: currentThread,
				to: otherUser.id,
				unread: true,
				parentMessage: parentMessage,
				multimedia: media
			}));
		} catch (error) {
			console.log('error sending message', error)
		} finally {
		}
	};

	const clearParentMessage = () => dispatch(azureActions.removeParentMessage());

	const handleRemoveImage = () => {
		setPreviewImage('');
		setUploadedImageFile('');
	};

	const handleRemoveFile = () => {
		setPreviewFile(undefined);
		setUploadedFile(undefined);
	};

	const handleRemoveVideo = () => {
		setPreviewVideo(undefined);
		setUploadedVideo(undefined);
	};

	const handleFileUpload = useCallback((e: any) => {
		const file = e.target.files[0];
		// create a preview
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewFile(reader?.result);
		};

		setShowMediaOptions(false)
		setUploadedFile(file);
	}, []);

	const handleImageUpload = useCallback((e: any) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewImage(reader?.result);
		};

		setUploadedImageFile(file);
		setShowMediaOptions(false)
	}, []);

	const handleVideoUpload = useCallback((e: any) => {
		const file = e.target.files[0];
		if (file.size > 6000000) {
			return toast.error('Media file too long');
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewVideo(reader?.result);
		};

		setUploadedVideo(file);
		setShowMediaOptions(false)
	}, []);

	return isUserActive ? (
		<>
			{
				parentMessage && <Box
					width={'100%'}
					p={'0.2rem'}
					px={'2rem'}
					bg='#DBDEFF'
					boxShadow=" 0px -1px 15px rgba(28, 28, 35, 0.08)"
					style={{
						// flex:1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						boxSizing: 'border-box',
						borderTopLeftRadius: 10,
						borderTopRightRadius: 10
					}}
				>
					<p>{parentMessage.message}</p>
					<BsFillTrash3Fill cursor={'pointer'} onClick={clearParentMessage} />
				</Box>
			}

			{
				previewImage && <Box
					mt={'2rem'}
					style={{
						display: 'flex',
						flexWrap: 'wrap' as const,
						gap: '0.75rem',
					}}
					bg={theme.palettes.colors.lightBlue[0]}
					pl={'2rem'}
					py={'3px'}
				>
					<ImageWrapper
						key={2}
						id={2}
						src={previewImage}
						alt={'Preview setPreviewImage'}
						handleRemoveImage={handleRemoveImage}
					/>
				</Box>
			}

			{previewFile && (
				<Box
					style={{
						padding: '0.5rem',
						borderRadius: '0.5rem',
						backgroundColor: '#F9F9F9',
						display: 'flex',
						alignItems: 'center',
						gap: '1rem',
					}}
				>
					<Box
						style={{
							textTransform: 'capitalize',
						}}
					>
						{uploadedFile
							? uploadedFile?.name?.split('.')[0]
							: cloudFile?.fileName?.split('-')?.[1]}
					</Box>
					<Box style={{ display: 'flex', gap: '5px' }}>
						<IconButton
							type="button"
							onClick={() => setShowPDFModal(true)}
						>
							<Icons.OpenEyeIcon />
						</IconButton>
						<IconButton type="button" onClick={handleRemoveFile}>
							<Icon
								component={Icons.DeleteIcon}
								color={theme.palettes.error[1]}
							/>
						</IconButton>
					</Box>
				</Box>
			)}

			{previewVideo && (
				<Box
					style={{
						padding: '0.5rem',
						borderRadius: '0.5rem',
						display: 'flex',
						alignItems: 'center',
						gap: '1rem',
					}}
					bg={theme.palettes.colors.lightBlue[0]}
				>
					<video width="400">
						<source src={previewVideo} />
					</video>
					<IoClose size={20} onClick={handleRemoveVideo} cursor={'pointer'} />
				</Box>
			)}

			{
				showMediaOptions &&
				<Box
					width={'100%'}
					style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box' }}
					bg={theme.palettes.colors.lightBlue[0]}
					px={'1rem'}>
					<Box
						style={{
							display: 'flex',
							gap: '0.75rem',
						}}
						p={'5px'}
					>
						<UploadWrapper
							onChange={handleImageUpload}
							inputProps={{
								id: 'post-image',
							}}
							accept="image/*"
						>
							<Button
								style={{
									border: '1px solid #E0E0E0',
								}}
								variant="tertiary"
								type="button"
								onClick={() => { }}
							>
								<Icons.ImageIcon />
							</Button>
						</UploadWrapper>
						<UploadWrapper
							onChange={handleFileUpload}
							inputProps={{
								id: 'upload-file',
							}}
							accept="application/pdf"
						>
							<Button
								style={{
									border: '1px solid #E0E0E0',
								}}
								variant="tertiary"
								type="button"
							>
								<Icons.DocumentIcon />
							</Button>
						</UploadWrapper>
						<UploadWrapper
							onChange={handleVideoUpload}
							inputProps={{
								id: 'upload-video',
							}}
							accept="video/*"
						>
							<Button
								style={{
									border: '1px solid #E0E0E0',
								}}
								variant="tertiary"
								type="button"
							>
								<BiVideo color='blue' />
							</Button>
						</UploadWrapper>
					</Box>
					<IoClose size={20} onClick={() => {
						setShowMediaOptions(false)
					}} />
				</Box>
			}

			<Box
				pb={'1rem'}
				pt={'0.5rem'}
				px={'2rem'}
				// mb={'1.5rem'}
				boxShadow=" 0px -1px 15px rgba(28, 28, 35, 0.08)"
				style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
			>
				{/* Input */}
				<Box
					px={'1rem'}
					bg={theme.palettes.colors.lightBlue[0]}
					borderRadius={theme.borderRadius.pill}
					width={'100%'}
					style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}
				>
					<textarea
						ref={textareaRef}
						value={message}
						placeholder="Share your thoughts..."
						className={styles['chat_input']}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						onFocus={handleFocus}
						onBlur={handleBlur}
						style={{
							height: '300px',
							// minHeight: 'auto',
							maxHeight: '150px',
							overflowY: 'hidden',
							paddingLeft: '10px',
							paddingRight: '10px',
						}}
					/>
					{!showMediaOptions && !previewVideo && <HiOutlinePaperClip cursor={'pointer'} onClick={() => setShowMediaOptions(true)} />}
				</Box>
				<Button
					style={{ background: theme.palettes.colors.secondary as string }}
					onClick={handleFinalSubmit}
				>
					{loadingStatus === 'sending message' ? <Oval
						ariaLabel="loading-indicator"
						height={15}
						width={15}
						strokeWidth={5}
						color={'#FFF'}
						secondaryColor={'#7581FF'}
					/> : <Icons.SendIcon />}
				</Button>
			</Box >

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
						{uploadedFile && uploadedFile?.name?.split?.('.')[0]}
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
							data={media ?? previewFile}
						>
							{uploadedFile && uploadedFile?.name}
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
		</>
	) : (
		<ChatBlockedIndicator
			content={`This user is no longer on Kwicon. No further messages can be sent or received from them on Kwicon.`}
		/>
	);
}