import styled from 'styled-components';
import { IconProps } from './icon';

// custom styled component for icons
export const StyledIcon = styled.svg<IconProps>`
	fill: ${props => props.bg ?? 'none'};

	width: ${props => props.boxWidth ?? '1.25rem'};
	height: ${props => props.boxHeight ?? '1.25rem'};
	display: flex;
	align-items: center;
	justify-content: center;

	transform: ${props => props.transform};

	path {
		fill: ${props => props.color ?? props.theme.palettes.colors.secondary};
		width: ${props => props.width ?? '1.25rem'};
		height: ${props => props.height ?? '1.25rem'};
	}
`;
