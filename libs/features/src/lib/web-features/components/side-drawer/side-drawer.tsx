import React from 'react';
import { Box, Button } from '@kwicon/kwicon-ui';

interface DrawerProps {
	isOpen: boolean;
	onClose?: () => void;
	withButton?: boolean;
	direction: 'left' | 'right';
	width?: string;
	children: React.ReactNode;
	bg?: string;
}

const Drawer: React.FC<DrawerProps> = ({
	isOpen,
	onClose,
	direction = 'left',
	width = '300px',
	withButton = true,
	bg,
	children,
}) => {
	const isLeft = direction === 'left';
	const transformStyle = isLeft ? 'translateX(-100%)' : 'translateX(100%)';
	const styles: React.CSSProperties = {
		position: 'fixed',
		top: 0,
		[isLeft ? 'left' : 'right']: 0,
		zIndex: 50,
		width: width,
		height: '100%',
		backgroundColor: bg ?? '#fafafa',
		boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.06)',
		overflowY: 'auto',
		transition: 'transform 0.3s ease-out',
		transform: isOpen ? 'translateX(0)' : transformStyle,
		padding: '1rem',
	};

	const closeButtonStyles: React.CSSProperties = {
		color: '#555',
		cursor: 'pointer',
		fontSize: '1.2rem',
		marginBottom: '1rem',
		display: 'block',
		textAlign: isLeft ? 'right' : 'left',
		padding: 0,
	};

	return (
		<Box as="aside" style={styles}>
			<Box>
				{withButton && (
					<Button
						variant="unstyled"
						onClick={onClose}
						style={closeButtonStyles}
					>
						Close
					</Button>
				)}
			</Box>
			<Box>{children}</Box>
		</Box>
	);
};

export default Drawer;
