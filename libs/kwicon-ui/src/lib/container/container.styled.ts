import styled from 'styled-components';
import { ContainerProps } from './container';

export const StyledContainer = styled.div<ContainerProps>`
	position: ${props => props.position ?? 'relative'};
	top: ${props => props.top ?? ''};
	left: ${props => props.left ?? ''};
	right: ${props => props.right ?? ''};
	bottom: ${props => props.bottom ?? ''};

	margin: ${props => props.m ?? '0 auto'};
	margin-top: ${props => props.mt ?? props.my ?? ''};
	margin-bottom: ${props => props.mb ?? props.my ?? ''};
	margin-left: ${props => props.ml ?? props.mx ?? ''};
	margin-right: ${props => props.mr ?? props.mx ?? ''};

	padding: ${props => props.p ?? '1rem'};
	padding-top: ${props => props.pt ?? props.py ?? ''};
	padding-bottom: ${props => props.pb ?? props.py ?? ''};
	padding-left: ${props => props.pl ?? props.px ?? ''};
	padding-right: ${props => props.pr ?? props.px ?? ''};

	width: ${props => (props.fluid ? '100%' : props.width)};
	height: ${props => props.height ?? '100%'};

	@media (min-width: 1200px) {
		width: 90%;
	}

	@media (min-width: 1600px) {
		width: 80%;
	}

	background-color: ${props => props.bg ?? ''};
	color: ${props => props.color ?? ''};
`;
