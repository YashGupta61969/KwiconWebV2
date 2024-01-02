import { forwardRef } from 'react';
import { useTheme } from 'styled-components';

/* eslint-disable-next-line */
export interface OtpRenderedInputProps {
	otpError: string | null | undefined;
}

export const OtpRenderedInput: React.FC<OtpRenderedInputProps> = forwardRef(
	({ otpError, ...props }) => {
		const theme = useTheme();

		return (
			<input
				{...props}
				style={{
					width: '5%',
					backgroundColor: !otpError
						? (theme.palettes.colors.lightGray[0] as string)
						: (theme.palettes.error[2] as string),
					color: !otpError
						? (theme.palettes.colors.black as string)
						: (theme.palettes.error[1] as string),
					outline: 'none',
					marginRight: '1rem',
					border: 'none',
					padding: '1rem',
					borderRadius: theme.borderRadius.regular,
					fontSize: theme.typography.fontSize,
					fontWeight: 500,
					textAlign: 'center' as const,
				}}
			/>
		);
	},
);

export default OtpRenderedInput;
