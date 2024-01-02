import { Box, IconButton } from '@kwicon/kwicon-ui';
import { Icons } from '@kwicon/commons';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';

interface DeactivateBoxProps {
	openModal: () => void;
}

export const DeactivateBox: React.FC<DeactivateBoxProps> = ({ openModal }) => {
	const theme = useTheme();
	return (
		<Box
			style={{
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<Box
				style={{
					fontSize: '1rem',
					fontWeight: 600,
					textTransform: 'capitalize' as const,
					color: theme.palettes.error[1],
				}}
			>
				Deactivate Account
			</Box>
			<Box
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '0.5rem',
				}}
			>
				<IconButton
					bg={theme.palettes.colors.white as string}
					onClick={openModal}
				>
					<Icons.NextPageIcon />
				</IconButton>
			</Box>
		</Box>
	);
};
