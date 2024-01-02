import { Box } from '../box/box';
import styled from 'styled-components';
import { PaperProps } from './paper';

export const StyledPaper = styled(Box)<PaperProps>`
	background-color: ${props => props.bg ?? props.theme.palettes.colors.white};
	border-radius: ${props =>
		props.borderRadius ?? props.theme.borderRadius.regular};
	box-shadow: ${props => props.withShadow && props.theme.shadows.regular};
	border: ${props =>
		props.withBorder ? '1px solid rgba(40, 53, 187, 0.15)' : 'none'};
	padding: ${props => props.p ?? '1rem'};

	&:active {
		transform: ${props => props.showTransition && 'scale(0.98)'};
	}

	transition: ${props =>
		props.showTransition &&
		`transform ${props.theme.transition.duration.fast} ease-in-out`};
`;
