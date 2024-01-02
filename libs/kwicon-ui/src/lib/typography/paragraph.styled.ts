import styled from 'styled-components';
import Box from '../box/box';
import { ParagraphProps } from './paragraph';

export const StyledParagraph = styled(Box)<ParagraphProps>`
	font-family: ${props => props.ff ?? 'inherit'};
	font-size: ${props => props.fs ?? ''};
	font-weight: ${props => props.fw ?? ''};
	line-height: ${props => props.lh ?? 1.5};
	letter-spacing: ${props => props.ls ?? ''};

	text-align: ${props => props.ta ?? ''};
	text-transform: ${props => props.tt ?? ''};

	color: ${props => props.color ?? 'rgba(0,0,0,0)'};
`;
