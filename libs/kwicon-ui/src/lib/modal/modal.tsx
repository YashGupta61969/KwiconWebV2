import { ModalContent, ModalOverlay } from './modal.styled';

/* eslint-disable-next-line */
export interface ModalProps {
	height?: string;
	width?: string;
	isOpen?: boolean;
	toggleModal?: () => void;
	children?: React.ReactNode;
	openButton?: React.ReactNode;
	overlayColor?: string;
	padding?: string;
	modalContentStyle?: React.CSSProperties;
}

export function Modal(props: ModalProps) {
	const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};
	return (
		<>
			{props.openButton}
			{props.isOpen && (
				<ModalOverlay
					overlayColor={props.overlayColor}
					onClick={props.toggleModal}
				>
					<ModalContent
						style={props.modalContentStyle}
						padding={props.padding}
						width={props.width}
						height={props.height}
						onClick={handleContentClick}
					>
						{props.children}
					</ModalContent>
				</ModalOverlay>
			)}
		</>
	);
}

export default Modal;
