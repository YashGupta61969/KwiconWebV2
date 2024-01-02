import styled from 'styled-components';
import { AvatarProps } from './avatar';

export const StyledAvatar = styled.div<AvatarProps>`
	width: ${props => {
		switch (props.size) {
			case 'xxsmall':
				return '1rem';
			case 'xsmall':
				return '1.5rem';
			case 'small':
				return '2.5rem';
			case 'medium':
				return '5rem';
			case 'large':
				return '8rem';
			default:
				return null;
		}
	}};

	height: ${props => {
		switch (props.size) {
			case 'xxsmall':
				return '1rem';
			case 'xsmall':
				return '1.5rem';
			case 'small':
				return '2.5rem';
			case 'medium':
				return '5rem';
			case 'large':
				return '8rem';
			default:
				return props.height ?? null;
		}
	}};
	position: relative;

	display: flex;
	align-items: center;
	justify-content: center;

	color: ${props => props.color ?? '#000'};
	font-size: ${props => {
		switch (props.size) {
			case 'xxsmall':
				return '0.5rem';
			case 'xsmall':
				return '0.75rem';
			case 'small':
				return '1rem';
			case 'medium':
				return '2rem';
			case 'large':
				return '3rem';
			default:
				return '1rem';
		}
	}};

	border: ${props => {
		switch (props.type) {
			case 'image':
				return 'none';
			case 'text':
				return '1px solid rgba(35, 35, 36, 0.3)';
			default:
				return '1px solid rgba(35, 35, 36, 0.3)';
		}
	}};
	border-radius: 50%;

	.avatar-image {
		border-radius: 50%;
	}

	.avatar-wrapper {
		border: 1px solid ${props => props.theme.palettes.colors.primary};
		background-color: #ffffff;
		/* padding: 2px; */
		border-radius: 50%;
		width: 100%;
		height: 100%;
		display: inline-block;
		position: relative;
	}

	.avatar-icon {
		position: absolute;
		top: 28px;
		bottom: 0px;
		right: 0px;
	}

	.avatar-icon svg {
		background: white;
		border-radius: 100%;
	}

	.avatar-loading-state {
		display: flex;
		align-items: center;
		justify-content: center;

		padding: 2px;

		border-radius: 50%;
		width: 100%;
		height: 100%;
	}
`;
