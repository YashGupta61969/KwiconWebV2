import styled from 'styled-components';
import { TabBarProps } from './tab-bar';

export const BarContainer = styled.div<TabBarProps>`
	min-height: ${props => props.minH ?? '40px'};
	min-width: ${props => props.minW ?? '100%'};
	display: flex;
	align-items: center;
	border-bottom: 1px solid rgba(35, 35, 36, 0.1);
`;

export const Tabs = styled.div<TabBarProps>`
	padding-left: ${props => props.p ?? '0.5rem'};
	padding-right: ${props => props.p ?? '0.5rem'};
	min-height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	white-space: nowrap;
	cursor: pointer;
	width: 100%;
	transition: opacity 0.2s ease-in-out;
	font-weight: 400;
	color: #464b80;

	${props => {
		if (props.active) {
			return `
    border-bottom: 4px solid #2E3EE5;
    border-radius: 4px;
    font-weight: 700;
    color: #2E3EE5;
      `;
		}
	}}

	${props => {
		if (props.disabled) {
			return `
      opacity: 0.5;
      cursor: not-allowed;
    `;
		}
	}}
`;
