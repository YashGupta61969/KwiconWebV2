import styled from 'styled-components';
import { BoxProps } from './box';

export const StyledBox = styled.div<BoxProps>`
	position: ${props => props.position ?? 'relative'};
	top: ${props => props.top ?? ''};
	left: ${props => props.left ?? ''};
	right: ${props => props.right ?? ''};
	bottom: ${props => props.bottom ?? ''};

	margin: ${props => props.m ?? ''};
	margin-top: ${props => props.mt ?? props.my ?? ''};
	margin-bottom: ${props => props.mb ?? props.my ?? ''};
	margin-left: ${props => props.ml ?? props.mx ?? ''};
	margin-right: ${props => props.mr ?? props.mx ?? ''};

	padding: ${props => props.p ?? ''};
	padding-top: ${props => props.pt ?? props.py ?? ''};
	padding-bottom: ${props => props.pb ?? props.py ?? ''};
	padding-left: ${props => props.pl ?? props.px ?? ''};
	padding-right: ${props => props.pr ?? props.px ?? ''};

	width: ${props => props.width ?? ''};
	height: ${props => props.height ?? ''};

	background-color: ${props => props.bg ?? ''};
	color: ${props => props.color ?? ''};

	border: ${props => props.border ?? ''};
	border-color: ${props => props.borderColor ?? ''};
	border-radius: ${props => props.borderRadius ?? ''};
	box-shadow: ${props => props.boxShadow ?? ''};
	opacity: ${props => props.opacity ?? ''};
	overflow: ${props => props.overflow ?? ''};
	cursor: ${props => props.cursor ?? ''};

	outline: ${props => props.outline ?? ''};
`;
