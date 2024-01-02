import styled from 'styled-components';
import { ButtonDropdownProps, DropDownItemProps } from './button-dropdown';
import Box, { BoxProps } from '../box/box';

export const DropDownButtonWrapper = styled(Box)<ButtonDropdownProps>`
	display: inline-block;

	position: relative;

	width: ${props => props.width || 'max-content'};
	height: ${props => props.height || 'max-content'};

	background-color: transparent;
`;

export const DropDownElement = styled(Box)<BoxProps>`
	max-height: ${props => props.height || 'max-content'};

	overflow-y: scroll;

	position: absolute;

	margin-top: 0.3rem;
	top: 100%;
	right: 0;
	z-index: 10;

	display: flex;
	flex-direction: column;
	gap: 0.625rem;

	padding: 0.5rem;

	border-radius: 0.5rem;

	background-color: #ffffff;

	box-shadow: 0rem 0.125rem 1.25rem rgba(35, 35, 36, 0.1);

	.no-item {
		padding: 0.5rem;
		color: '#7b7b7c';
	}
`;

export const DropDownElementItem = styled.div<DropDownItemProps>`
	width: ${props => props.width || '100%'};
	height: ${props => props.height || 'max-content'};

	padding: 0.5rem;
	border-radius: 0.25rem;

	display: flex;
	align-items: center;
	gap: 0.5rem;

	cursor: pointer;

	/* if withHoverEffect props passes true then we'll show the hover and active effects */
	${props =>
		props.withHoverEffect &&
		`&:hover {
		background-color: rgba(27, 144, 241, 0.05);
	}

	&:active {
		background-color: rgba(27, 144, 241, 0.1);
	}`}
`;
