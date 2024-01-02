import { CSSObject, CSSProp, useTheme } from 'styled-components';
import { IDefaultElementProps } from '../kwicon-theme/theme-interfaces';
import { StyledLabel } from './label.styled';

export interface LabelProps
	extends IDefaultElementProps,
		React.HTMLAttributes<HTMLLabelElement> {
	children: React.ReactNode;
	fw?: string | number;
	fs?: string | number;
	fst?: string;
	css?: CSSProp | CSSProp[] | CSSObject | CSSObject[];
	withAsterisk?: boolean;
}

export function Label(props: LabelProps) {
	const theme = useTheme();

	return (
		<StyledLabel
			{...props}
			fs={props.fs ?? theme.formElements.label.fontSize}
			fw={props.fw ?? theme.formElements.label.fontWeight}
			fst={props.fst ?? theme.formElements.label.fontStyle}
			as="label"
		>
			{props.children}{' '}
			{props.withAsterisk && (
				<span style={{ color: theme.palettes.error[1] }}>*</span>
			)}
		</StyledLabel>
	);
}

export default Label;
