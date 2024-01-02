import { StyledIconButton } from './icon-button.styled';

/* eslint-disable-next-line */
export interface IconButtonProps {
	icon?: React.ReactNode;
	onClick?: () => void;
	children: React.ReactNode;
	size?: 'sm' | 'md' | 'lg';
	width?: string;
	height?: string;
	bg?: string;
	color?: string;
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
}

export function IconButton({
	children,
	icon,
	onClick,
	size,
	type,
	disabled = false,
	...props
}: IconButtonProps) {
	return (
		<StyledIconButton
			disabled={disabled}
			type={type}
			{...props}
			size={size}
			onClick={onClick}
		>
			{icon ?? children}
		</StyledIconButton>
	);
}

export default IconButton;
