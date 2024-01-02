import { Box, IconButton } from '@kwicon/kwicon-ui';
import { Icons, envKeys, useExternalNavigate } from '@kwicon/commons';
import { useTheme } from 'styled-components';

interface PolicyBoxProps {
	title: string;
	url?: string | undefined;
	modal?: React.ReactNode | undefined;
	handleOpenPolicyModal?: () => void;
}

export const PolicyBox: React.FC<PolicyBoxProps> = ({
	title,
	handleOpenPolicyModal,
	modal,
}) => {
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
				}}
			>
				{title}
			</Box>
			<Box
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '0.5rem',
				}}
			>
				<IconButton
					onClick={handleOpenPolicyModal}
					bg={theme.palettes.colors.white as string}
				>
					<Icons.NextPageIcon />
				</IconButton>
			</Box>
			{modal && modal}
		</Box>
	);
};
