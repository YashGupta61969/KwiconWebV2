import styled from 'styled-components';
import { SearchBoxProps } from './search-box';

export const StyledSearchBox = styled.div<SearchBoxProps>`
	width: ${props => props.width};
  width: ${props => props.width}
	height: ${props => props.height};
	display: flex;
	background: ${props => props.theme.palettes.colors.primaryBg};
	padding: 0 1rem;
	border-radius: ${props => props.theme.borderRadius.pill};
`;
