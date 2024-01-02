import { Box, Icon, IconButton } from '@kwicon/kwicon-ui';
import { Icons } from '@kwicon/commons';
import { useTheme } from 'styled-components';

interface FileWrapperProps {
	src?: string;
	name?: string;
	mediaId?: string;
	removeFile?: () => void;
	removeCloudFile?: (mediaId: string) => void;
	handleOpenPDFModal: () => void;
}

export const FileWrapper: React.FC<FileWrapperProps> = ({
	name,
	removeFile,
	handleOpenPDFModal,
}) => {
	const theme = useTheme();
	return (
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
					textTransform: 'capitalize' as const,
				}}
			>
				{name}
			</Box>
			<Box style={{ display: 'flex', gap: '5px' }}>
				<IconButton type="button" onClick={handleOpenPDFModal}>
					<Icons.OpenEyeIcon />
				</IconButton>
				<IconButton type="button" onClick={removeFile}>
					<Icon component={Icons.DeleteIcon} color={theme.palettes.error[1]} />
				</IconButton>
			</Box>
		</Box>
	);
};
