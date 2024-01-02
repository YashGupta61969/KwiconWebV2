import { IDefaultElementProps } from '../kwicon-theme/theme-interfaces';
import { StyledPaper } from './paper.styled';

export interface PaperProps
	extends IDefaultElementProps,
		React.HTMLAttributes<HTMLDivElement> {
	withBorder?: boolean;
	withShadow?: boolean;
	showTransition?: boolean;
}

export function Paper(props: PaperProps) {
	return <StyledPaper {...props}>{props.children}</StyledPaper>;
}

export default Paper;
