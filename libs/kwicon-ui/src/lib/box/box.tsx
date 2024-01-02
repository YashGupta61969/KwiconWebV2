import { CSSObject, CSSProp } from 'styled-components';
import { IDefaultElementProps } from '../kwicon-theme/theme-interfaces';
import { StyledBox } from './box.styled';

export interface BoxProps
	extends IDefaultElementProps,
		React.HTMLAttributes<HTMLDivElement> {
	color?: string;
	css?: CSSProp | CSSProp[] | CSSObject | CSSObject[];
	as?: keyof JSX.IntrinsicElements | React.ComponentType<HTMLDivElement>;
}

/**
 * @description
 * The Box component is a simple wrapper component that can be used to apply styles to a div element. It's the most basic component in the library.
 */
export function Box(props: BoxProps) {
	return <StyledBox {...props}>{props.children}</StyledBox>;
}

export default Box;
