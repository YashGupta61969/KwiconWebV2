import { forwardRef, ForwardedRef } from 'react';
import { useTheme } from 'styled-components';
import Box from '../box/box';
import { StyledInput } from './input.styled';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: boolean | string | undefined;
	type?: string;
	width?: string | number;
	ref?: ForwardedRef<HTMLInputElement>;
	wrapper?: React.AllHTMLAttributes<HTMLDivElement>;
	startAdornment?: React.ReactNode;
	endAdornment?: React.ReactNode;
	withAdornmentStyles?: React.CSSProperties;
	p?: string | number;
}

export const Input = forwardRef(function Input(
	props: InputProps,
	ref: ForwardedRef<HTMLInputElement>,
) {
	const theme = useTheme();

	return (
		<Box
			{...props.wrapper}
			as={'div'}
			bg={
				props.error
					? theme.palettes.error[2]
					: theme.palettes.colors.lightGray[0]
					? props.disabled
						? theme.palettes.colors.lightGray[1]
						: theme.palettes.colors.lightGray[0]
					: theme.palettes.colors.lightGray[0]
			}
			style={{
				border: `1px solid ${theme.palettes.colors.lightBlue[1]}`,
			}}
			borderRadius={theme.borderRadius.regular}
			p={props.p ?? '0.75rem'}
			width={props.width}
		>
			{/* TODO: Have to add adornments */}
			<Box
				style={{
					...props.withAdornmentStyles,
					display: 'flex',
					alignItems: 'center',
					gap: '0.5rem',
				}}
			>
				{props.startAdornment && props.startAdornment}
				<StyledInput
					{...props}
					ref={ref}
					color={props.error ? '#EC6E6E' : '#000000'}
					type={props.type}
				/>
				{props.endAdornment && props.endAdornment}
			</Box>
		</Box>
	);
});
