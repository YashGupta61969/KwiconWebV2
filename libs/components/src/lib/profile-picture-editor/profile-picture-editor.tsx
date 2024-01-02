import { Avatar, Box, Icon, IconButton } from '@kwicon/kwicon-ui';
import { Icons, useGetMedia, useOutsideClick } from '@kwicon/commons';
import { useTheme } from 'styled-components';
import { HiOutlinePencil } from 'react-icons/hi';
import React, { useRef, useState } from 'react';
import ImageCropper from '../image-cropper/image-cropper';

/* eslint-disable-next-line */
export interface ProfilePictureEditorProps {
	children?: React.ReactNode | React.ReactNode[] | string;
	accept?: React.InputHTMLAttributes<HTMLInputElement>['accept'];
	style?: React.StyleHTMLAttributes<HTMLDivElement>;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleRemoveImage?: (e: any) => void;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	previewImage?: string;
	setPreviewImage?: (previewImage: string) => void;
	setUploadedImageFile?: (uploadedFile: File) => void;
	profilePicture?: string;
	userProfilePicture?: string;
	avatarSize?: 'large' | 'medium' | 'small';
	uploadIconSize?: string;
	uploadIcon?: React.ReactNode;
}

export function ProfilePictureEditor(props: ProfilePictureEditorProps) {
	const theme = useTheme();

	// Local State
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [openCropWindow, setOpenCropWindow] = useState<boolean>(false);

	const outsideRef = useRef(null);

	// get media hook
	const { mediaLoader } = useGetMedia(props.userProfilePicture as string);

	useOutsideClick(outsideRef, () => {
		setIsOpen(false);
	});

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	// handle trigger upload image function on click on the icon button
	const onClickUpload = () => {
		const input = document.getElementById('upload-image') as HTMLInputElement;
		input.click();
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsOpen(false);
		setOpenCropWindow(true);
		props.onChange?.(e);
	};

	return (
		<>
			<div ref={outsideRef}>
				<input
					id="upload-image"
					// {...props.inputProps}
					onChange={handleOnChange}
					type="file"
					name="uploadFile"
					accept={props.accept}
					style={{ display: 'none' }}
				/>
				<Box>
					{!props.previewImage && !props.userProfilePicture ? (
						<Box>
							<IconButton
								bg={theme.palettes.colors.lightBlue[2]}
								onClick={onClickUpload}
								width={props.uploadIconSize}
								height={props.uploadIconSize}
							>
								{props.uploadIcon ? (
									props.uploadIcon
								) : (
									<Icon component={Icons.CameraAdd} />
								)}
							</IconButton>
						</Box>
					) : (
						<Box
							style={{
								position: 'relative' as const,
							}}
						>
							<Box
								style={{
									position: 'relative' as const,
								}}
							>
								<Avatar
									size={props.avatarSize}
									type="image"
									src={props.previewImage as string}
									// alt="user avatar"
									loading={mediaLoader}
								/>
								{/* edit icon button */}

								<Box
									style={{
										position: 'absolute' as const,
										right: '0',
										bottom: '0',
										marginRight: '-0.5rem',
										marginTop: '1rem',
									}}
								>
									<IconButton
										onClick={handleToggle}
										bg={theme.palettes.colors.secondary as string}
									>
										<HiOutlinePencil
											color={theme.palettes.colors.white as string}
										/>
									</IconButton>
								</Box>
							</Box>
							{isOpen && (
								<Box
									style={{
										position: 'absolute' as const,
										zIndex: 100,
										right: '0px',
									}}
									bg={theme.palettes.colors.white as string}
									p={'1rem'}
									borderRadius={theme.borderRadius.regular}
								>
									<Box
										onClick={onClickUpload}
										style={{
											display: 'flex',
											gap: '0.5rem',
											alignItems: 'center',
											cursor: 'pointer',
										}}
										bg={theme.palettes.colors.white as string}
										// py={'0.5rem'}
										mb={'0.7rem'}
									>
										<IconButton>
											<Icons.MultipleImageIcon />
										</IconButton>
										<Box color={theme.palettes.colors.darkBlue[0]}>Changes</Box>
									</Box>
									<Box
										onClick={props.handleRemoveImage}
										style={{
											display: 'flex',
											gap: '0.5rem',
											alignItems: 'center',
											cursor: 'pointer',
										}}
										bg={theme.palettes.colors.white as string}
										py={'0.5rem'}
									>
										<IconButton>
											<Icons.CrossIcon />
										</IconButton>
										<Box color={theme.palettes.colors.darkBlue[0]}>Remove</Box>
									</Box>
								</Box>
							)}
						</Box>
					)}
				</Box>
			</div>
			<ImageCropper
				isOpen={openCropWindow}
				imgSrc={props.previewImage as string}
				setImgSrc={props.setPreviewImage as any}
				setCroppedImage={props.setUploadedImageFile as any}
				toggleModal={() => setOpenCropWindow(false)}
			/>
		</>
	);
}

export default ProfilePictureEditor;
