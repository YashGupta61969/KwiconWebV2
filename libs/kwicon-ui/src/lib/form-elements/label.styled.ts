import { LabelProps } from './label';
import styled from 'styled-components';
import Box from '../box/box';

export const StyledLabel = styled(Box)<LabelProps>`
	font-size: ${props => props.fs ?? ''};
	font-weight: ${props => props.fw ?? ''};
	font-style: ${props => props.fst ?? ''};
`;
