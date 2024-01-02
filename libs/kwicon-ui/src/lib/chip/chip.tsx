import { IDefaultElementProps } from '../kwicon-theme/theme-interfaces';
import { StyledChip } from './chip.styled';

/* eslint-disable-next-line */
export interface ChipProps extends IDefaultElementProps {
	fs?: string | number;
	showTransition?: boolean;
	children: React.ReactNode | string;
	onClick?: () => void;
}

export function Chip(props: ChipProps) {
	return (
		<StyledChip {...props} onClick={props.onClick}>
			{props.children}
		</StyledChip>
	);
}

export default Chip;
