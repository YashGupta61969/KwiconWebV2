/* eslint-disable react/jsx-no-useless-fragment */
import { useGetMedia } from '@kwicon/commons';
import { Avatar, AvatarProps, Box } from '@kwicon/kwicon-ui';

export interface MediaImageProps {
	mediaId: string | undefined | null;
	avatarProps?: AvatarProps;
	mediaType?: 'avatar' | 'image';
	imageTypeStyles?: React.CSSProperties;
}

export function MediaImage({
	mediaId,
	mediaType = 'avatar',
	imageTypeStyles,
	avatarProps,
}: MediaImageProps) {
	const { media, mediaLoader } = useGetMedia(mediaId);

	return (
		<>
			{media ? (
				<Avatar
					{...avatarProps}
					type="image"
					src={media && media}
					loading={mediaLoader}
				/>
			) : (
				<Avatar
					{...avatarProps}
					type="text"
					src={media && media}
					loading={mediaLoader}
				/>
			)}
		</>
	);
}

export default MediaImage;
