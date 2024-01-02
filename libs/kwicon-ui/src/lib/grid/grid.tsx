import { IDefaultElementProps } from '../kwicon-theme/theme-interfaces';
import { StyledGrid, StyledGridItem } from './grid.styled';

/* eslint-disable-next-line */
export interface GridProps
	extends IDefaultElementProps,
		React.HTMLAttributes<HTMLDivElement> {
	children:
		| React.ReactElement<typeof GridItem>
		| React.ReactElement<typeof GridItem>[]
		| null
		| undefined;
	xl?: number;
	lg?: number;
	md?: number;
	sm?: number;
	xs?: number;
	columns?: number;
	rows?: number;
	gap?: number | string;
	autoFlow?: 'row' | 'column' | 'row dense' | 'column dense';
	autoRows?: string;
	autoColumns?: string;
	justifyContent?: 'start' | 'end' | 'center' | 'stretch';
	alignItems?: 'start' | 'end' | 'center' | 'stretch';
	alignContent?: 'start' | 'end' | 'center' | 'stretch';
	justifyItems?: 'start' | 'end' | 'center' | 'stretch';
	justifySelf?: 'start' | 'end' | 'center' | 'stretch';
	alignSelf?: 'start' | 'end' | 'center' | 'stretch';
	gridTemplateAreas?: string;
	gridTemplateRows?: string;
	gridTemplateColumns?: string;
	gridArea?: string;
	gridRow?: string;
	gridColumn?: string;
	gridAutoFlow?: 'row' | 'column' | 'row dense' | 'column dense';
	gridAutoRows?: string;
	gridAutoColumns?: string;
	gridRowStart?: string;
	gridRowEnd?: string;
	gridColumnStart?: string;
	gridColumnEnd?: string;
	gridRowGap?: string;
	gridColumnGap?: string;
	gridGap?: string;
}

export interface GridItemProps
	extends IDefaultElementProps,
		React.HTMLAttributes<HTMLDivElement> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: any;
	colStart?: number;
	colEnd?: number;
	rowStart?: number;
	rowEnd?: number;
}

export function Grid(props: GridProps) {
	return <StyledGrid {...props}>{props.children}</StyledGrid>;
}

export function GridItem(props: GridItemProps) {
	return <StyledGridItem {...props}>{props.children}</StyledGridItem>;
}

export default Grid;
