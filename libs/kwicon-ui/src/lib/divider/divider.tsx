import styled from 'styled-components';
import Box, { BoxProps } from '../box/box';

interface DividerProps extends BoxProps {
	color?: string;
	orientation: 'horizontal' | 'vertical';
	height?: string;
	width?: string;
}

const HorizontalDivider = styled(Box)<DividerProps>`
	height: ${props => props.height ?? '100%'};
	width: ${props => props.width ?? '1px'};
	background-color: ${props => props.color ?? '#e0e0e0'};
`;

const VerticalDivider = styled(Box)<DividerProps>`
	height: ${props => props.height ?? '100%'};
	width: ${props => props.width ?? '1px'};
	background-color: ${props => props.color ?? '#e0e0e0'};
`;

export const Divider: React.FC<DividerProps> = ({
	orientation,
	color,
	...props
}) => {
	return orientation === 'horizontal' ? (
		<HorizontalDivider {...props} color={color} orientation={orientation} />
	) : (
		<VerticalDivider {...props} color={color} orientation={orientation} />
	);
};

export default Divider;
