import styled from 'styled-components';
import { CheckBoxProps } from './check-box';

export const CheckBoxWrapper = styled.div.attrs(props => ({}))<CheckBoxProps>`
	position: relative;

	display: flex;
	align-items: center;
	flex-direction: ${props =>
		props.labelDirection === 'left' ? 'row-reverse' : 'row'};
	gap: 0.5rem;

	transition: background-color 0.2s ease;

	label {
		display: inline-block;
		position: relative;
		padding-left: 1.625rem;
		margin-bottom: 0.75rem;
		cursor: pointer;
		font-size: 1rem;
		user-select: none;
	}

	label input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	.checkmark {
		position: absolute;
		top: 0;
		left: 0;
		height: 1rem;
		width: 1rem;
		background-color: #fff;
		border: 0.0625rem solid #7581ff;
		border-radius: 0.125rem;
	}

	label input:checked ~ .checkmark {
		background-color: #2e3ee5;
		border: 0.0625rem solid #2e3ee5;
		border-radius: 0.125rem;
	}

	.checkmark:after {
		content: '';
		position: absolute;
		display: none;
	}

	label input:checked ~ .checkmark:after {
		display: block;
	}

	label .checkmark:after {
		left: 0.25rem;
		top: 0;
		width: 0.4375rem;
		height: 0.7188rem;
		border: solid #ffffff;
		border-width: 0 0.1875rem 0.1875rem 0;
		border-radius: 0.125rem;
		transform: rotate(45deg);
	}
`;
