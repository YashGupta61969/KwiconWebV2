import { Icons, convertJSONToFormData, useGetMedia } from '@kwicon/commons';
import { CommunityGuidelineModal, SelectBox } from '@kwicon/components';
import {
	Box,
	Button,
	CheckBox,
	FormElements,
	Heading,
	Icon,
	IconButton,
	Modal,
	Paragraph,
	UploadWrapper,
} from '@kwicon/kwicon-ui';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { StylesConfig } from 'react-select';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import { getAppHomeState } from '../slices/app-home.slice';
import { addMedia } from '../thunk-apis/add-media';
import { addSocialFeedPost } from '../thunk-apis/add-social-feed-post';
import { getAllSocialFeedPostsByLoggedInUser } from '../thunk-apis/get-all-posts-by-logged-user';
import { thunkString } from '../thunk-apis/thunk-string';
import { updateSocialFeedPost } from '../thunk-apis/update-social-feed-post';
import { ImageWrapper } from './image-wrapper';
import ContentEditable from 'react-contenteditable';

export interface AddPostModalProps {
	isOpen: boolean;
	toggleModal?: () => void;
	isEdit?: boolean;
	userId: string;
	handleGetAllPosts: () => void;
	handleGetPostById: (userId: string) => void;
	post?: any;
}

const AddPostModal: React.FC<AddPostModalProps> = ({
	isOpen,
	isEdit,
	toggleModal,
	userId,
	handleGetAllPosts,
	handleGetPostById,
	post,
}) => {
	const theme = useTheme();
	const dispatch = useDispatch<AppDispatch>();
	const selectRef = useRef(null);
	const { loadingStatus } = useSelector(getAppHomeState);
	const {
		formState: { errors: error },
		handleSubmit,
		control,
		setValue,
		getValues,
		setError,
	} = useForm({
		defaultValues: {
			acceptedGuideLines: false,
			title: '',
			content: '',
			visibility: 'public',
		},
	});

	const [showGuideModal, setShowGuideModal] = useState(false);
	const [uploadedImageFile, setUploadedImageFile] = useState([]);
	const [previewImage, setPreviewImage] = useState<string[]>([]);
	const [cloudImage, setCloudImage] = useState<string[]>([]);
	const [cloudFile, setCloudFile] = useState();

	const contentRef = useRef<HTMLDivElement>(null);

	const [uploadedFile, setUploadedFile] = useState();
	const [previewFile, setPreviewFile] = useState();
	const [showPDFModal, setShowPDFModal] = useState(false);

	const [showPlaceholder, setShowPlaceholder] = useState(true);

	const options = [
		{ label: 'Post Publicly', value: 'public' },
		{ label: 'Post in my network', value: 'network' },
	];

	useEffect(() => {
		if (post && isOpen) {
			setValue('title', post?.title);
			setValue('content', post?.content);
			setValue('visibility', post?.visibility);
			setValue('acceptedGuideLines', post?.acceptedGuidelines);
		}
	}, [post, setValue, isOpen]);

	useEffect(() => {
		if (post?.multimedia?.length > 0) {
			const mappedMultiMedia = post?.multimedia
				?.filter((media: any) => media?.fileType?.startsWith('image'))
				?.map((media: any) => media?.id);

			const mappedMultimediaFile = post?.multimedia?.filter((media: any) =>
				media?.fileType?.startsWith('application'),
			);
			setPreviewFile(mappedMultimediaFile?.[0]?.id);
			setCloudFile(mappedMultimediaFile?.[0]);
			setCloudImage(mappedMultiMedia);
		}
	}, [post?.multimedia]);

	const { media } = useGetMedia(previewFile);

	const onClickUpload = () => {
		const input = document.getElementById('post-image') as HTMLInputElement;
		input.click();
	};

	const handleImageUpload = useCallback((e: any) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewImage(prev => {
				// check if the image is already uploaded
				const isImageAlreadyUploaded = prev.find(
					(image: any) => image === reader.result,
				);
				if (isImageAlreadyUploaded) {
					return prev;
				}
				return [...prev, reader.result];
			});
		};

		setUploadedImageFile(prev => {
			// check if the image is already uploaded
			const isImageAlreadyUploaded = prev.find(
				(image: any) => image.name === file.name,
			);
			if (isImageAlreadyUploaded) {
				return prev;
			} else {
				return [...prev, file];
			}
		});
	}, []);

	const handleRemoveImage = (image: string, mediaId?: string) => {
		setPreviewImage(prev => prev.filter((img: string) => img !== image));

		setUploadedImageFile(prev =>
			prev.filter((file: any) => file.name !== image),
		);

		// remove the file from the element
		const input = document.getElementById('post-image') as HTMLInputElement;
		input.value = '';
	};

	const handleRemoveCloudImage = (mediaId: string) => {
		setCloudImage(prev => prev.filter((media: any) => media !== mediaId));
	};

	const onClickFileUpload = () => {
		const input = document.getElementById('upload-file') as HTMLInputElement;
		input.click();
	};
	const handleFileUpload = useCallback((e: any) => {
		const file = e.target.files[0];
		// create a preview
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewFile(reader?.result);
		};

		setUploadedFile(file);
	}, []);

	const handleRemoveFile = () => {
		setPreviewFile(undefined);
		setUploadedFile(undefined);

		setCloudFile(undefined);

		// remove the file from the element
		const input = document.getElementById('upload-file') as HTMLInputElement;
		input.value = '';
	};

	const handleOnChangeOptions = (option: any) => {
		if (!option) {
			option = {
				target: selectRef,
				value: '',
			};
		}
		setValue('visibility', option.value);
	};

	const handleResetPostData = useCallback(() => {
		setValue('title', '');
		setValue('content', '');
		setValue('visibility', '');
		setValue('acceptedGuideLines', false);
		setUploadedImageFile([]);
		setPreviewImage([]);
		setCloudImage([]);
		setCloudFile(undefined);
		setUploadedFile(undefined);
		setPreviewFile(undefined);
	}, [setValue]);

	const handleGetLoggedInUserPosts = useCallback(async () => {
		try {
			await dispatch(getAllSocialFeedPostsByLoggedInUser());
		} catch (error) {
			throw new Error(error as string);
		}
	}, [dispatch]);

	const handleOnSubmit = useMemo(
		() => async (data: any) => {
			const postPayload = {
				title: data?.title,
				content: data?.content?.replace(/<[^>]+>/g, ''),
				visibility: data?.visibility,
				acceptedGuidelines: data?.acceptedGuideLines,
				status: 'published',
			};
			const updatePostPayload = {
				id: post?.id,
				title: data?.title,
				content: data?.content?.replace(/<[^>]+>/g, ''),
				visibility: data?.visibility,
				acceptedGuidelines: data?.acceptedGuideLines,
				status: 'published',
				multimedia: cloudImage,
			};

			try {
				if (!isEdit) {
					const response = await dispatch(addSocialFeedPost(postPayload));

					if (response.type === `${thunkString.addSocialFeedPost}/fulfilled`) {
						if (uploadedImageFile?.length > 0) {
							const uploadedImageMap = uploadedImageFile.map(
								async (file: any) => {
									const formData = convertJSONToFormData({
										file,
										socialFeedPostId: response.payload?.id,
									});

									await dispatch(addMedia(formData));
								},
							);

							await Promise.all(uploadedImageMap);
						}

						if (uploadedFile) {
							const fileData = convertJSONToFormData({
								file: uploadedFile,
								socialFeedPostId: response.payload?.id,
							});

							await dispatch(addMedia(fileData));
						}
						handleGetLoggedInUserPosts();
						toast.success('Post added successfully');
						toggleModal && toggleModal();
					}
				} else {
					// while updating the post
					const response = await dispatch(
						updateSocialFeedPost(updatePostPayload),
					);
					if (
						response.type === `${thunkString.updateSocialFeedPost}/fulfilled`
					) {
						if (uploadedImageFile?.length > 0) {
							const uploadedImageMap = uploadedImageFile.map(
								async (file: any) => {
									const formData = convertJSONToFormData({
										file,
										socialFeedPostId: response.payload?.id,
									});

									await dispatch(addMedia(formData));
								},
							);

							await Promise.all(uploadedImageMap);
						}
						if (uploadedFile) {
							const fileData = convertJSONToFormData({
								file: uploadedFile,
								socialFeedPostId: response.payload?.id,
							});

							await dispatch(addMedia(fileData));
						}

						handleGetLoggedInUserPosts();
						toast.success('Post updated successfully');
						toggleModal && toggleModal();
					}
				}
			} catch (error) {
				throw new Error(error as string);
			} finally {
				handleResetPostData();
				handleGetAllPosts();
				handleGetPostById(userId);
			}
		},
		[
			dispatch,
			handleGetAllPosts,
			handleGetPostById,
			isEdit,
			post?.id,
			toggleModal,
			uploadedImageFile,
			userId,
			cloudImage,
			uploadedFile,
			handleResetPostData,
			handleGetLoggedInUserPosts,
		],
	);

	const handleSaveDraft = async () => {
		const postData = {
			title: getValues('title') || '',
			content: getValues('content')?.replace(/<[^>]+>/g, '') || '',
			visibility: getValues('visibility') || '',
			acceptedGuidelines: true,
			status: 'draft',
			multimedia: cloudImage,
		};

		try {
			if (!isEdit) {
				const response = await dispatch(addSocialFeedPost(postData));

				if (response.type === `${thunkString.addSocialFeedPost}/fulfilled`) {
					if (uploadedImageFile?.length > 0) {
						const uploadedImageMap = uploadedImageFile.map(
							async (file: any) => {
								const formData = convertJSONToFormData({
									file,
									socialFeedPostId: response.payload?.id,
								});

								await dispatch(addMedia(formData));
							},
						);

						await Promise.all(uploadedImageMap);
					}
					if (uploadedFile) {
						const fileData = convertJSONToFormData({
							file: uploadedFile,
							socialFeedPostId: response.payload?.id,
						});

						await dispatch(addMedia(fileData));
					}

					handleGetLoggedInUserPosts();
					toast.success('Post saved to draft successfully');
					toggleModal && toggleModal();
				}
			} else {
				postData.id = post?.id;
				const response = await dispatch(updateSocialFeedPost(postData));
				if (response.type === `${thunkString.updateSocialFeedPost}/fulfilled`) {
					if (uploadedImageFile?.length > 0) {
						const uploadedImageMap = uploadedImageFile.map(
							async (file: any) => {
								const formData = convertJSONToFormData({
									file,
									socialFeedPostId: response.payload?.id,
								});

								await dispatch(addMedia(formData));
							},
						);

						await Promise.all(uploadedImageMap);
					}
					if (uploadedFile) {
						const fileData = convertJSONToFormData({
							file: uploadedFile,
							socialFeedPostId: response.payload?.id,
						});

						await dispatch(addMedia(fileData));
					}
					handleGetLoggedInUserPosts();
					toast.success('Post saved to draft successfully');
					toggleModal && toggleModal();
				}
			}
		} catch (error) {
			throw new Error(error as string);
		} finally {
			handleResetPostData();
			handleGetAllPosts();
			handleGetPostById(userId);
		}
	};

	// select box custom styles
	const selectStyles: StylesConfig = {
		control: (provided, state) => ({
			...provided,
			'width': '40%',
			'border': `1px solid ${theme.palettes.colors.lightBlue[1]}`,
			'borderRadius': theme.borderRadius.regular,
			'background': theme.palettes.colors.lightGray[0],

			'padding': '0.375rem',
			'boxShadow': 'none',
			'::placeholder': {
				color: theme.palettes.colors.darkBlue[1],
			},
			'$:active': {
				border: `1px solid ${theme.palettes.colors.secondary}`,
			},
		}),
		menu: (provided, state) => ({
			...provided,
			borderRadius: theme.borderRadius.regular,
			width: '100%%',
		}),
		menuList: (provided, state) => ({
			...provided,
			width: '100%',
			padding: 10,
			borderRadius: theme.borderRadius.regular,
		}),
		menuPortal(base, props) {
			return { ...base, zIndex: 9999 };
		},
		option: (provided, state) => ({
			...provided,
			'background': state.isSelected
				? theme.palettes.colors.lightBlue[2]
				: theme.palettes.colors.white,
			'color': state.isSelected
				? theme.palettes.colors.darkBlue[0]
				: theme.palettes.colors.black,
			'width': '100%',
			'&:hover': {
				backgroundColor: theme.palettes.colors.lightBlue[2],
				cursor: 'pointer',
			},
		}),
	};

	const handleContentChange = () => {
		setError('content', {
			type: 'manual',
			message: '',
		});

		const updatedValue = contentRef.current?.innerText;
		const highlightedContent = updatedValue?.replace(
			/#(\w+)(?!_)/g,
			`<span style="color: blue; cursor: pointer">#$1</span>`,
		);
		setValue('content', highlightedContent as string);
	};

	useEffect(() => {
		if (getValues('content') === '') {
			setShowPlaceholder(true);
		}
	}, [getValues('content')]);

	return (
		<>
			<Modal
				toggleModal={() => {
					toggleModal && toggleModal();
					if (!isEdit) {
						handleResetPostData();
					}
				}}
				isOpen={isOpen}
				modalContentStyle={{
					width: '50%',
					borderRadius: '0.5rem',
					padding: '1.5rem 2rem',
				}}
			>
				{/* HEAD PART */}
				<Box
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Heading
						type="h3"
						lh={0}
						style={{
							color: theme.palettes.colors.darkBlue[0],
						}}
					>
						{isEdit ? 'Update' : 'New'} Post
					</Heading>
					<IconButton
						bg="transparent"
						onClick={() => {
							toggleModal && toggleModal();
							if (!isEdit) {
								handleResetPostData();
							}
						}}
						style={{
							marginTop: '5px',
						}}
					>
						<Icon component={Icons.CrossIcon} height="16px" width="16px" />
					</IconButton>
				</Box>

				{/* Main CONTENT */}
				<Box mt="1.5rem">
					<Paragraph type="p2">
						Please ensure you are aware of the{' '}
						<Box
							cursor="pointer"
							as={'span'}
							style={{
								color: theme.palettes.colors.primary as string,
							}}
							onClick={() => setShowGuideModal(true)}
						>
							community guidelines
						</Box>{' '}
						before publishing any content
					</Paragraph>
				</Box>
				{/* FORM */}
				<Box mt={'1rem'} as="form" onSubmit={handleSubmit(handleOnSubmit)}>
					<Box
						style={{
							height: '50vh',
							overflowY: 'scroll',
						}}
					>
						<Box
							style={{
								display: 'flex',
								flexDirection: 'column' as const,
								gap: '0.5rem',
							}}
						>
							{/* <FormElements.Label withAsterisk>Post Title</FormElements.Label> */}
							<Controller
								name="acceptedGuideLines"
								control={control}
								render={({ field: { name, onChange, value, onBlur } }) => (
									<CheckBox
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											setValue('acceptedGuideLines', e.target.checked);
											onChange(e);
										}}
										onBlur={onBlur}
										label="I have read the community guidelines. "
										checked={getValues('acceptedGuideLines')}
										labelDirection="right"
										name={name}
									/>
								)}
								rules={{
									required: 'Accepting community guidelines is required',
								}}
							/>
							{/* Error Box */}
							{error.acceptedGuideLines?.message && (
								<Box
									mt={'-1rem'}
									style={{
										fontSize: '0.875rem',
									}}
									color={theme.palettes.error[1]}
								>
									{error.acceptedGuideLines?.message}
								</Box>
							)}
						</Box>
						<Box
							mt={'2rem'}
							style={{
								display: 'flex',
								flexDirection: 'column' as const,
								gap: '0.5rem',
							}}
						>
							<FormElements.Label withAsterisk>Post Title</FormElements.Label>
							<Controller
								name="title"
								control={control}
								render={({ field: { name, onChange, value, onBlur } }) => (
									<FormElements.Input
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										name={name}
										placeholder="Give a title to your post"
										error={error.title?.message}
									/>
								)}
								rules={{
									required: 'Title is required',
								}}
							/>
							{/* Error Box */}
							{error.title?.message && (
								<Box
									style={{
										fontSize: '0.875rem',
									}}
									color={theme.palettes.error[1]}
								>
									{error.title?.message}
								</Box>
							)}
						</Box>
						<Box
							mt={'1rem'}
							style={{
								display: 'flex',
								flexDirection: 'column' as const,
								gap: '0.5rem',
							}}
						>
							<FormElements.Label withAsterisk>Content</FormElements.Label>
							<Box
								style={{
									color: 'rgba(70, 75, 128, 0.4)',
									fontSize: '0.75rem',
								}}
							>
								Add # tags to your posts to reach more people.
							</Box>
							<Controller
								name="content"
								control={control}
								render={({ field: { value } }) => (
									<Box
										bg={
											error.content?.message
												? theme.palettes.error[2]
												: theme.palettes.colors.lightGray[0]
										}
										borderRadius={theme.borderRadius.regular}
										p={'0.75rem'}
									>
										<ContentEditable
											style={{
												height: '10vh',
												outline: 'none',
											}}
											innerRef={contentRef}
											html={
												value
													? value
													: showPlaceholder
													? '<span style="color: rgba(70, 75, 128, 0.4)">Start writing your post</span>'
													: ''
											}
											onBlur={
												!value
													? () => setShowPlaceholder(true)
													: () => {
															setShowPlaceholder(false);
															handleContentChange();
													  }
											}
											onFocus={() => setShowPlaceholder(false)}
											onChange={handleContentChange}
										/>
									</Box>
								)}
								rules={{
									required: 'Content is required',
								}}
							/>
							{/* Error Box */}
							{error.content?.message && (
								<Box
									style={{
										fontSize: '0.875rem',
									}}
									color={theme.palettes.error[1]}
								>
									{error.content?.message}
								</Box>
							)}
						</Box>
						<Box
							mt={'1rem'}
							style={{
								display: 'flex',
								flexDirection: 'column' as const,
								gap: '0.5rem',
							}}
						>
							<Controller
								name="visibility"
								control={control}
								render={({ field: { name } }) => (
									<SelectBox
										variant="select"
										name={name}
										ref={selectRef}
										options={options}
										onChange={handleOnChangeOptions}
										placeholder="Select visibility"
										selectStyles={selectStyles}
										menuPosition="fixed"
										isClearable={false}
										isSearchable={false}
										defaultValue={options[0]}
									/>
								)}
							/>
						</Box>
						{/* IMAGES */}
						<Box
							mt={'2rem'}
							style={{
								display: 'flex',
								flexWrap: 'wrap' as const,
								gap: '0.75rem',
							}}
						>
							{cloudImage?.map((image: any, index: number) => (
								<ImageWrapper
									key={index}
									id={index}
									mediaId={image}
									alt={String(index)}
									handleRemoveCloudImage={handleRemoveCloudImage}
								/>
							))}
							{previewImage?.map((image, index) => (
								<ImageWrapper
									key={index}
									id={index}
									src={image}
									alt={String(index)}
									handleRemoveImage={handleRemoveImage}
								/>
							))}
						</Box>
						{/* FILES */}
						{previewFile && (
							<Box
								mt={'1rem'}
								style={{
									display: 'flex',
									flexWrap: 'wrap' as const,
									gap: '0.75rem',
								}}
							>
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
							</Box>
						)}
					</Box>
					<Box
						mt="2rem"
						style={{
							display: 'flex',
							gap: '0.75rem',
							justifyContent: 'space-between',
						}}
					>
						<Box
							style={{
								display: 'flex',
								gap: '0.75rem',
							}}
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
									onClick={onClickUpload}
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
									onClick={onClickFileUpload}
									style={{
										border: '1px solid #E0E0E0',
									}}
									variant="tertiary"
									type="button"
								>
									<Icons.DocumentIcon />
								</Button>
							</UploadWrapper>
						</Box>
						<Box
							style={{
								display: 'flex',
								gap: '0.75rem',
							}}
						>
							<Button
								variant="ghost"
								style={{
									padding: '0.5rem 2rem',
								}}
								onClick={handleSaveDraft}
							>
								Save Draft
							</Button>
							<Button
								loading={loadingStatus === 'loading'}
								style={{
									padding: '0.5rem 2rem',
								}}
								type="submit"
							>
								{isEdit ? 'Update' : 'Submit'}
							</Button>
						</Box>
					</Box>
				</Box>
			</Modal>
			<CommunityGuidelineModal
				isOpen={showGuideModal}
				toggleModal={() => setShowGuideModal(!showGuideModal)}
			/>
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
						{uploadedFile
							? uploadedFile?.name?.split?.('.')[0]
							: cloudFile?.fileName?.split('-')?.[1]}
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
							{uploadedFile ? uploadedFile?.name : cloudFile?.fileName}
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
	);
};

export default AddPostModal;
