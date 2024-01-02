import styled from 'styled-components';
import { InputProps } from './input';

export const StyledInput = styled.input<InputProps>`
	width: 100%;
	border: none;
	background-color: transparent;
	color: ${props => props.color ?? 'inherit'};
	font-weight: 400;
	font-size: 1rem;

	&:focus {
		outline: none;
	}

	&::placeholder {
		color: ${props =>
			props.error
				? props.theme.palettes.error[1]
				: props.theme.palettes.colors.darkBlue[1]};
	}

	&:focus {
		outline: none;
	}

	/* disabling increment icon */
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	-moz-appearance: textfield;
`;

export const StyledTextArea = styled.textarea<InputProps>`
	width: 100%;
	border: none;
	background-color: transparent;
	color: ${props => props.color ?? 'inherit'};
	font-weight: 400;
	font-size: 1rem;

	&:focus {
		outline: none;
	}

	&::placeholder {
		color: ${props =>
			props.error
				? props.theme.palettes.error[1]
				: props.theme.palettes.colors.darkBlue[1]};
	}

	&:focus {
		outline: none;
	}

	/* disabling increment icon */
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	-moz-appearance: textfield;
`;
