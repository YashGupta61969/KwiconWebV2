import { useTheme } from 'styled-components';
import { Box, Button, Icon } from '@kwicon/kwicon-ui';
import { Icons } from '@kwicon/commons';

export interface AddPostButtonProps {
	onClick?: () => void;
}

export const AddPostButton: React.FC<AddPostButtonProps> = ({ onClick }) => {
	const theme = useTheme();

	return (
		<Button
			variant="unstyled"
			onClick={onClick}
			style={{
				background: theme.palettes.colors.secondary,
				color: theme.palettes.colors.white,
				borderRadius: '0.5rem',
				gap: '0.5rem',
				fontWeight: 400,
			}}
			width={'100%'}
			color={theme.palettes.colors.primary as string}
		>
			<Box>
				<Icon
					component={Icons.AddCircleIcon}
					color={theme.palettes.colors.white as string}
				/>
			</Box>
			<Box>Add Post</Box>
		</Button>
	);
};
