import { Icons } from '@kwicon/commons';
import { Oval } from 'react-loader-spinner';
import { useTheme } from 'styled-components';
import Box from '../box/box';
import { StyledAvatar } from './avatar.styled';

export interface AvatarProps {
	size?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large';
	bg?: string;
	type: 'image' | 'text' | 'icon';
	src?: string | undefined;
	alt?: string;
	width?: string;
	height?: string;
	loading?: boolean;
	text?: string;
	children?: React.ReactNode | React.ReactNode[] | string;
	imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
	textAvatarStyle?: React.CSSProperties;
	status?: string;
}

export function Avatar({
	size,
	type,
	src,
	alt,
	width,
	height,
	loading,
	text,
	children,
	imageProps,
	textAvatarStyle,
	status,
	...props
}: AvatarProps): JSX.Element {
	const theme = useTheme();

	switch (type) {
		case 'image':
			return (
				<StyledAvatar
					{...props}
					width={width}
					height={height}
					size={size}
					type={'image'}
				>
					<Box className="avatar-wrapper" position="relative">
						{loading ? (
							<Box className="avatar-loading-state">
								<Oval
									ariaLabel="loading-indicator"
									height={20}
									width={20}
									strokeWidth={3}
									color={theme.palettes.colors.lightBlue[2]}
									secondaryColor={'transparent'}
								/>
							</Box>
						) : (
							<img
								{...imageProps}
								height={'100%'}
								width={'100%'}
								src={src}
								alt={alt}
								className="avatar-image"
							/>
						)}
						{UserStatus(status as string)}
					</Box>
				</StyledAvatar>
			);
		case 'text':
			return (
				<StyledAvatar
					{...props}
					style={{
						...textAvatarStyle,
						backgroundColor: 'rgba(240, 241, 255, 0.5)',
					}}
					size={size}
					type={'text'}
				>
					{loading ? (
						<Box className="avatar-loading-state">
							<Oval
								ariaLabel="loading-indicator"
								height={20}
								width={20}
								strokeWidth={3}
								color={theme.palettes.colors.lightBlue[2]}
								secondaryColor={'transparent'}
							/>
						</Box>
					) : (
						<>
							{/* splitting the text like JD for John Doe */}
							{text?.split(' ')?.map((word, index) => {
								return <span key={index}>{word?.charAt(0)}</span>;
							})}

							{UserStatus(status as string)}
						</>
					)}
				</StyledAvatar>
			);
		case 'icon':
			return (
				<StyledAvatar
					{...props}
					style={{
						...textAvatarStyle,
						backgroundColor: 'rgba(240, 241, 255, 0.5)',
					}}
					size={size}
					type={'icon'}
				>
					{loading ? (
						<Box className="avatar-loading-state">
							<Oval
								ariaLabel="loading-indicator"
								height={20}
								width={20}
								strokeWidth={3}
								color={theme.palettes.colors.lightBlue[2]}
								secondaryColor={'transparent'}
							/>
						</Box>
					) : (
						<Box
							{...props}
							width={width}
							height={height}
							bg="rgba(240, 241, 255, 0.5)"
							borderRadius="50%"
							border="1px solid rgba(40, 53, 187, 0.15)"
						>
							{children}
						</Box>
					)}
				</StyledAvatar>
			);
		default:
			return (
				<StyledAvatar {...props} type={type}>
					{children}
				</StyledAvatar>
			);
	}
}

export default Avatar;

function UserStatus(status: string) {
	switch (status) {
		case 'online':
			return (
				<Box className="avatar-icon">
					<Icons.OnlineIcon />
				</Box>
			);
		case 'offline':
			return (
				<Box className="avatar-icon">
					<Icons.OfflineIcon />
				</Box>
			);
		case 'blocked':
			return (
				<Box className="avatar-icon">
					<Icons.BlockedStatusIcon />
				</Box>
			);
		case 'private':
			return null;
		default:
			return null;
	}
}
