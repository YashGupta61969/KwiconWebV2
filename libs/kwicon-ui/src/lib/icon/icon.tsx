import { StyledIcon } from './icon.styled';

export interface IconProps {
	bg?: string;
	color?: string;
	boxWidth?: string;
	boxHeight?: string;
	width?: string;
	height?: string;
	transform?: string;
	component?: React.FC<React.SVGProps<SVGSVGElement>> | undefined;
	children?: React.ReactElement;
}

/**Component
 * @description
 * This icon wrapper should be used to wrap all the icons in order to access the customized styles for icons
 * color, background color, height and width can be passed as props.
 * Note that, height and width should be in form of 'px | rem | em', etc. For example: '1.25rem' or '1.25rem'. Besides, we can also pass the whole svg as children.
 *
 * @important It's recommended to use the `component` props instead of `children` props.
 *
 * @example
 * ```jsx
 * import { ReactComponent as MailIcon } from './icons/mail_fill.svg';
 *
 * <Icon component={MailIcon} color="#BADA55" height="1.25rem" width="1.25rem" />
 * ```
 */

export function Icon({
	bg,
	color,
	width = '1.25rem',
	height = '1.25rem',
	component: Component,
	transform,
	children,
}: IconProps) {
	return (
		<StyledIcon bg={bg} color={color}>
			{Component ? (
				<Component transform={transform} width={width} height={height} />
			) : (
				children
			)}
		</StyledIcon>
	);
}

export default Icon;
