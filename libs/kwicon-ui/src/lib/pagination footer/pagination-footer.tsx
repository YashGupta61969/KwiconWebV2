import { Icons } from '@kwicon/commons';
import { useTheme } from 'styled-components';
import Box from '../box/box';
import IconButton from '../icon-button/icon-button';
import styles from './pagination-footer.module.css';
import Select from 'react-select';

/* eslint-disable-next-line */
export interface paginationFooterProps {
	currentPage: number;
	limit: number;
	setLimit: (limit: number) => void;
	totalRecords: number;
	dataLength: number;
	onPrevPageClick: () => void;
	onNextPageClick: () => void;
	onPrevStateClick: () => void;
	onNextStateClick: () => void;
}

export function PaginationFooter(props: paginationFooterProps) {
	const theme = useTheme();
	const {
		currentPage,
		limit,
		setLimit,
		totalRecords,
		dataLength,
		onPrevPageClick,
		onNextPageClick,
		onPrevStateClick,
		onNextStateClick,
	} = props;

	const pageLimitOptions = [
		{ value: 10, label: '10 per page' },
		{ value: 25, label: '25 per page' },
		{ value: 50, label: '50 per page' },
		{ value: 100, label: '100 per page' },
	];

	return (
		<Box
			bg={theme.palettes.colors.white as string}
			className={styles['main-container']}
		>
			<Box>
				<Select
					options={pageLimitOptions}
					defaultValue={pageLimitOptions.filter(op => op.value === limit)}
					onChange={e => setLimit(e.value)}
					menuPosition="fixed"
				/>
			</Box>
			<Box className={styles['sub-container-2']}>
				<IconButton
					bg={theme.palettes.colors.white as string}
					onClick={onPrevStateClick}
				>
					<Icons.PrevStateIcon />
				</IconButton>
				<IconButton
					bg={theme.palettes.colors.white as string}
					onClick={onPrevPageClick}
				>
					<Icons.PrevPageIcon />
				</IconButton>
				<IconButton
					bg={theme.palettes.colors.white as string}
					onClick={onNextPageClick}
				>
					<Icons.NextPageIcon />
				</IconButton>
				<IconButton
					bg={theme.palettes.colors.white as string}
					onClick={onNextStateClick}
				>
					<Icons.NextStateIcon />
				</IconButton>
			</Box>
			<Box className={styles['sub-container-3']}>
				Showing {(currentPage - 1) * limit + 1}-
				{(currentPage - 1) * limit + dataLength} of {totalRecords}
			</Box>
		</Box>
	);
}

export default PaginationFooter;
