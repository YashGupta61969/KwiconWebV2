import styled, { keyframes } from 'styled-components';
import { ModalProps } from './modal';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ModalOverlay = styled.div<ModalProps>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: ${props =>
		props.overlayColor ? props.overlayColor : 'rgba(0, 0, 0, 0.5)'};
	display: flex;
	justify-content: center;
	align-items: center;
	animation: ${fadeIn} 0.1s ease-in-out;
	z-index: 100;
`;

export const ModalContent = styled.div<ModalProps>`
	background-color: #fff;
	width: ${props => (props.width ? props.width : '20.438rem')};
	height: ${props => (props.height ? props.height : 'auto')};
	padding: ${props => (props.padding ? props.padding : '1rem')};
	border-radius: 0.5rem;
	animation: ${fadeSlideIn} 0.1s ease-in-out;
`;
