import styled from 'styled-components';
import { IconButtonProps } from './icon-button';

export const StyledIconButton = styled.button<IconButtonProps>`
	margin: 0;
	position: relative;

	width: ${props =>
		props.width
			? props.width
			: props => {
					switch (props.size) {
						case 'sm':
							return props.theme.iconButton.size.sm;
						case 'md':
							return props.theme.iconButton.size.md;
						case 'lg':
							return props.theme.iconButton.size.lg;
						default:
							return props.theme.iconButton.size.md;
					}
			  }};

	height: ${props =>
		props.height
			? props.height
			: props => {
					switch (props.size) {
						case 'sm':
							return props.theme.iconButton.size.sm;
						case 'md':
							return props.theme.iconButton.size.md;
						case 'lg':
							return props.theme.iconButton.size.lg;
						default:
							return props.theme.iconButton.size.md;
					}
			  }};

	font-size: ${props => {
		switch (props.size) {
			case 'sm':
				return '0.875rem';
			case 'md':
				return '1rem';
			case 'lg':
				return '1.5rem';
			default:
				return '1rem';
		}
	}};

	display: flex;
	align-items: center;
	justify-content: center;

	border: none;
	border-radius: 50%;

	cursor: pointer;

	background-color: ${props =>
		props.bg ?? props.theme.palettes.colors.lightGray};
	color: ${props => props.color ?? props.theme.palettes.colors.darkBlue[0]};

	&:active {
		transform: scale(0.9);
		transition-property: all;
		transition-duration: ${props => props.theme.transition.duration.fast};
		transition-timing-function: ease-in-out;
	}

	&:disabled {
		pointer-events: none;
		color: ${props => props.theme.palettes.colors.lightGray};
	}
`;
