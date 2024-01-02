import { useRef, useState } from 'react';
import { dataURLtoFile, useDebounceEffect } from '@kwicon/commons';
import ReactCrop, { type Crop, PixelCrop } from 'react-image-crop';
import { Box, Button, Modal } from '@kwicon/kwicon-ui';
import { canvasPreview } from './canvas-preview';

import 'react-image-crop/dist/ReactCrop.css';
import { useTheme } from 'styled-components';

interface ImageCropperProps {
	isOpen: boolean;
	toggleModal?: () => void;
	imgSrc: string;
	setImgSrc: (imgSrc: string) => void;
	setCroppedImage: (croppedImage: File) => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({
	isOpen,
	toggleModal,
	imgSrc,
	setImgSrc,
	setCroppedImage,
}) => {
	const theme = useTheme();

	const previewCanvasRef = useRef<HTMLCanvasElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const [crop, setCrop] = useState<Crop>();
	const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

	async function onSaveCrop() {
		const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

		setLoading(true);

		delay(1000)
			.then(() => {
				if (previewCanvasRef.current !== null) {
					const croppedDataURL: string = previewCanvasRef.current.toDataURL();
					const croppedImage: File = dataURLtoFile(
						croppedDataURL,
						'croppedImage',
					);

					setCroppedImage(croppedImage);
					setImgSrc(croppedDataURL);
				}
			})
			.then(() => toggleModal && toggleModal())
			.catch(err => {
				throw new Error(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	useDebounceEffect(
		async () => {
			if (
				completedCrop?.width &&
				completedCrop?.height &&
				imgRef.current &&
				previewCanvasRef.current
			) {
				canvasPreview(
					imgRef.current,
					previewCanvasRef.current,
					completedCrop,
					// scale,
					// rotate,
				);
			}
		},
		100,
		[completedCrop],
	);

	return (
		<Modal
			isOpen={isOpen}
			modalContentStyle={{
				width: '25%',
			}}
		>
			<Box
				style={{
					color: theme.palettes.colors.secondary as string,
					fontSize: '1.5rem',
					fontWeight: 600,
				}}
				mb={'1rem'}
			>
				Crop Image
			</Box>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					background: theme.palettes.colors.whiteShade as string,
					borderRadius: theme.borderRadius.regular,
				}}
			>
				{!!imgSrc && (
					<ReactCrop
						crop={crop}
						onChange={(_, percentCrop) => setCrop(percentCrop)}
						onComplete={c => setCompletedCrop(c)}
						aspect={1}
					>
						<img
							ref={imgRef}
							alt="Crop me"
							src={imgSrc}
							style={{
								width: '100%',
								height: '400px',
								objectFit: 'contain' as const,
							}}
						/>
					</ReactCrop>
				)}
			</div>
			<Box
				mt={'1.25rem'}
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
				}}
			>
				<Button
					variant="ghost"
					width={'30%'}
					loading={loading}
					onClick={onSaveCrop}
				>
					Save
				</Button>
			</Box>
			{!!completedCrop && (
				<div
					style={{
						display: 'none',
					}}
				>
					<canvas
						ref={previewCanvasRef}
						style={{
							border: '1px solid black',
							objectFit: 'contain' as const,
							width: completedCrop.width,
							height: completedCrop.height,
						}}
					/>
				</div>
			)}
		</Modal>
	);
};

export default ImageCropper;
