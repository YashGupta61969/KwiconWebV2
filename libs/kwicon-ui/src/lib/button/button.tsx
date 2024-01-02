import { Oval } from 'react-loader-spinner';
import { CSSObject, CSSProp, useTheme } from 'styled-components';
import Box from '../box/box';
import { IDefaultElementProps } from '../kwicon-theme/theme-interfaces';
import { StyledButton } from './button.styled';

/* eslint-disable-next-line */
export interface ButtonProps
	extends IDefaultElementProps,
		React.HTMLAttributes<HTMLButtonElement> {
	variant?:
		| 'primary'
		| 'secondary'
		| 'tertiary'
		| 'ghost'
		| 'text'
		| 'unstyled';
	size?: 'small' | 'medium' | 'large';

	// -------------
	disabled?: boolean;
	children?: React.ReactNode;
	loading?: boolean;

	form?: string;

	css?: CSSProp | CSSProp[] | CSSObject | CSSObject[];
	type?: 'button' | 'submit' | 'reset';
}

export function Button(props: ButtonProps) {
	const theme = useTheme();

	return !props.loading ? (
		<StyledButton
			{...props}
			borderRadius={props.borderRadius}
			form={props.form}
			size={props.size ?? 'medium'}
			type={props.type ?? 'button'}
		>
			{props.children}
		</StyledButton>
	) : (
		<StyledButton
			{...props}
			borderRadius={props.borderRadius}
			size={props.size ?? 'medium'}
			type={props.type ?? 'button'}
			disabled={true}
		>
			<Box as="section" className="loader-state">
				<Oval
					ariaLabel="loading-indicator"
					height={20}
					width={20}
					strokeWidth={6}
					color={theme.palettes.colors.darkBlue[1]}
					secondaryColor={'transparent'}
				/>
			</Box>
			{props.children}
		</StyledButton>
	);
}

export default Button;
