import { useTheme } from 'styled-components';
import { IDefaultElementProps } from '../kwicon-theme/theme-interfaces';
import { StyledHeading } from './heading.styled';

/* eslint-disable-next-line */
export interface HeadingProps
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
	type?: 'h1' | 'h2' | 'h3' | 'h4';
}

export const Heading = (props: HeadingProps) => {
	const theme = useTheme();

	switch (props.type) {
		case 'h1':
			return (
				<StyledHeading
					{...props}
					as={props.type}
					fs={props.fs ?? theme.typography.heading1.fontSize}
					fw={props.fw ?? theme.typography.heading1.fontWeight}
					ls={props.ls ?? theme.typography.heading1.letterSpacing}
					lh={props.lh}
				>
					{props.children}
				</StyledHeading>
			);

		case 'h2':
			return (
				<StyledHeading
					{...props}
					as={props.type}
					fs={props.fs ?? theme.typography.heading2.fontSize}
					fw={props.fw ?? theme.typography.heading2.fontWeight}
					ls={props.ls ?? theme.typography.heading2.letterSpacing}
					lh={props.lh}
				>
					{props.children}
				</StyledHeading>
			);

		case 'h3':
			return (
				<StyledHeading
					{...props}
					as={props.type}
					fs={props.fs ?? theme.typography.heading3.fontSize}
					fw={props.fw ?? theme.typography.heading3.fontWeight}
					ls={props.ls ?? theme.typography.heading3.letterSpacing}
					lh={props.lh}
				>
					{props.children}
				</StyledHeading>
			);

		case 'h4':
			return (
				<StyledHeading
					{...props}
					as={props.type}
					fs={props.fs ?? theme.typography.heading4.fontSize}
					fw={props.fw ?? theme.typography.heading4.fontWeight}
					ls={props.ls ?? theme.typography.heading4.letterSpacing}
					lh={props.lh}
				>
					{props.children}
				</StyledHeading>
			);

		default:
			return (
				<StyledHeading
					{...props}
					as={'h1'}
					fs={props.fs ?? theme.typography.fontSize}
					fw={props.fw ?? theme.typography.fontWeight}
					ls={props.ls ?? theme.typography.letterSpacing}
					lh={props.lh}
				>
					{props.children}
				</StyledHeading>
			);
	}
};

export default Heading;
