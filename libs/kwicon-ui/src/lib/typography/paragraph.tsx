import { useTheme } from 'styled-components';
import { IDefaultElementProps } from '../kwicon-theme/theme-interfaces';
import { StyledParagraph } from './paragraph.styled';

export interface ParagraphProps
	extends IDefaultElementProps,
		React.HTMLAttributes<HTMLHeadingElement> {
	ff?: string;
	fs?: string | number;
	fw?: string | number;
	ls?: string | number;
	lh?: string | number;
	ta?: string;
	tt?: string;
	children: React.ReactNode;
	type?: 'p1' | 'p2' | 'p3';
}

export function Paragraph(props: ParagraphProps) {
	const theme = useTheme();

	switch (props.type) {
		case 'p1':
			return (
				<StyledParagraph
					{...props}
					fs={props.fs ?? theme.typography.paragraph1.fontSize}
					fw={props.fw ?? theme.typography.paragraph1.fontWeight}
					ls={props.ls ?? theme.typography.paragraph1.letterSpacing}
					lh={props.lh}
					as={'p'}
					color={props.color ?? (theme.typography.paragraph1.color as string)}
				>
					{props.children}
				</StyledParagraph>
			);

		case 'p2':
			return (
				<StyledParagraph
					{...props}
					fs={props.fs ?? theme.typography.paragraph2.fontSize}
					fw={props.fw ?? theme.typography.paragraph2.fontWeight}
					ls={props.ls ?? theme.typography.paragraph2.letterSpacing}
					lh={props.lh}
					as={'p'}
					color={props.color ?? (theme.typography.paragraph2.color as string)}
				>
					{props.children}
				</StyledParagraph>
			);

		case 'p3':
			return (
				<StyledParagraph
					{...props}
					fs={props.fs ?? theme.typography.paragraph3.fontSize}
					fw={props.fw ?? theme.typography.paragraph3.fontWeight}
					ls={props.ls ?? theme.typography.paragraph3.letterSpacing}
					color={props.color ?? (theme.typography.paragraph3.color as string)}
					lh={props.lh}
					as={'p'}
				>
					{props.children}
				</StyledParagraph>
			);

		default:
			return (
				<StyledParagraph
					{...props}
					fs={props.fs ?? theme.typography.fontSize}
					fw={props.fw ?? theme.typography.fontWeight}
					ls={props.ls ?? theme.typography.letterSpacing}
					lh={props.lh}
					as={'p'}
					color={props.color ?? '#000'}
				>
					{props.children}
				</StyledParagraph>
			);
	}
}

export default Paragraph;
