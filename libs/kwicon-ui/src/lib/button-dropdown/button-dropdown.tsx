import { useRef, useState } from 'react';
import { IDefaultElementProps } from '../kwicon-theme/theme-interfaces';
import {
	DropDownButtonWrapper,
	DropDownElement,
	DropDownElementItem,
} from './button-dropdown.styled';
import { useOutsideClick } from '@kwicon/commons';

/* eslint-disable-next-line */
export interface ButtonDropdownProps
	extends IDefaultElementProps,
		React.HTMLAttributes<HTMLDivElement> {
	variant?: 'primary' | 'secondary';
	withElementOnClose?: boolean;
	content: string | React.ReactNode;
	children: React.ReactNode;
	dropdownWrapperStyle?: React.CSSProperties;
}

export function ButtonDropdown(props: ButtonDropdownProps) {
	const [show, setShow] = useState<boolean>(false);

	const outsideRef = useRef(null);

	useOutsideClick(outsideRef, () => {
		setShow(false);
	});

	return (
		<div ref={outsideRef}>
			<DropDownButtonWrapper {...props}>
				<div onClick={() => setShow(!show)}>{props.content}</div>
				{show && (
					<DropDownElement
						{...props}
						style={props.dropdownWrapperStyle}
						onClick={() => {
							if (props.withElementOnClose) {
								setShow(false);
							} else {
								return;
							}
						}}
					>
						{props.children}
					</DropDownElement>
				)}
			</DropDownButtonWrapper>
		</div>
	);
}

/**
 * @name DropdownItem component
 * @important Should be used as a child of the DropdownButton component
 * @param {ReactNode} children
 *
 * @returns JSX.Element
 */

export interface DropDownItemProps
	extends React.HTMLAttributes<HTMLDivElement> {
	width?: string;
	height?: string;
	withHoverEffect?: boolean;
	children: React.ReactNode;
}

export const DropdownItem: React.FC<DropDownItemProps> = ({
	children,
	height,
	width,
	withHoverEffect = true,
	...props
}) => {
	return (
		<DropDownElementItem
			{...props}
			height={height}
			width={width}
			withHoverEffect={withHoverEffect}
		>
			{children}
		</DropDownElementItem>
	);
};

export default {
	ButtonDropdown,
	DropdownItem,
};
