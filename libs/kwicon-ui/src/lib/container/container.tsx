import { IDefaultElementProps } from '../kwicon-theme/theme-interfaces';
import { StyledContainer } from './container.styled';

export interface ContainerProps
	extends IDefaultElementProps,
		React.HTMLAttributes<HTMLDivElement> {
	fluid?: boolean;
}

export function Container(props: ContainerProps) {
	return <StyledContainer {...props}>{props.children}</StyledContainer>;
}

export default Container;
