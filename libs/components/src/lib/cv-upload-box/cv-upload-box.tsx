import { Box } from '@kwicon/kwicon-ui';
import styles from './cv-upload-box.module.css';
import { useTheme } from 'styled-components';
import { Icons } from '@kwicon/commons';

/* eslint-disable-next-line */
export interface CvUploadBoxProps {
	previewCV: string | null | undefined;
	handleRemoveCV: (e: any) => void;
	onClickUploadCV: () => void;
}

export function CvUploadBox(props: CvUploadBoxProps) {
	const theme = useTheme();

	return (
		<Box
			p={'0.75rem'}
			width={'95%'}
			border={`1px solid ${theme.palettes.colors.lightBlue[1]}`}
			borderRadius={theme.borderRadius.regular}
			className={styles['container']}
			bg={theme.palettes.colors.lightGray[0]}
		>
			{props.previewCV ? (
				<Box>
					<Box
						style={{
							display: 'flex',
							gap: '1rem',
							alignItems: 'center',
						}}
					>
						<Box as="span">{props.previewCV}</Box>
						<Icons.CrossIcon
							onClick={e => props.handleRemoveCV(e)}
							style={{
								cursor: 'pointer',
							}}
						/>
					</Box>
				</Box>
			) : (
				<Box
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						cursor: 'pointer',
						gap: '0.5rem',
					}}
					width={'100%'}
					onClick={props.onClickUploadCV}
				>
					<Icons.DocumentIcon />
					<Box
						style={{
							fontWeight: 700,
						}}
						color={theme.palettes.colors.primary as string}
						as={'span'}
					>
						Upload CV
					</Box>
				</Box>
			)}{' '}
		</Box>
	);
}

export default CvUploadBox;
