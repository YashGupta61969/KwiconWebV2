import { Icons, useGetMedia } from '@kwicon/commons';
import { Box, Button, Icon } from '@kwicon/kwicon-ui';

interface ImageWrapperProps {
	src?: string;
	alt: string;
	mediaId?: string;
	id: string | number;
	handleRemoveImage?: (image: any) => void;
	handleRemoveCloudImage?: (image: any) => void;
}

export const ImageWrapper: React.FC<ImageWrapperProps> = ({
	src,
	alt,
	mediaId,
	handleRemoveImage,
	handleRemoveCloudImage,
	id,
}) => {
	const { media } = useGetMedia(mediaId);

	return (
		<Box position="relative">
			<img
				style={{
					borderRadius: '10px',
				}}
				src={src ?? media}
				alt={alt}
				height={'200px'}
				width={'250px'}
			/>
			<Button
				style={{
					position: 'absolute' as const,
					top: 0,
					right: 0,
				}}
				variant="tertiary"
				onClick={() => {
					if (handleRemoveImage) {
						handleRemoveImage(src);
					} else if (handleRemoveCloudImage) {
						handleRemoveCloudImage(mediaId);
					} else {
						return;
					}
				}}
			>
				<Icon component={Icons.CrossIcon} color="#000" />
			</Button>
		</Box>
	);
};
