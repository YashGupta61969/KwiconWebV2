import styled from 'styled-components';
import { ChipProps } from './chip';

export const StyledChip = styled.div<ChipProps>`
	padding: ${props => props.p ?? '0.5rem 1rem'};
	border-radius: ${props => props.borderRadius ?? '2.5rem'};
	border: 1px solid
		${props => props.borderColor ?? props.theme.palettes.colors.lightBlue[2]};
	background-color: ${props =>
		props.bg ?? props.theme.palettes.colors.primaryBg};
	color: ${props => props.color ?? props.theme.palettes.colors.darkBlue[0]};
	font-size: ${props => props.fs ?? '0.75rem'};

	&:active {
		transform: ${props => props.showTransition && 'scale(0.98)'};
	}

	transition: ${props =>
		props.showTransition &&
		`transform ${props.theme.transition.duration.fast} ease-in-out`};
`;
