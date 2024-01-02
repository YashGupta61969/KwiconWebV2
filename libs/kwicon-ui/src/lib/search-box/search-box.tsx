import Button from '../button/button';
import { Input } from '../form-elements/input';
import { StyledSearchBox } from './search-box.styled';

/* eslint-disable-next-line */
export interface SearchBoxProps {
	placeholder?: string;
	icon?: React.ReactNode;
	width?: string;
	height?: string;
}

export function SearchBox(props: SearchBoxProps) {
	return (
		<StyledSearchBox as="div">
			<Input
				placeholder={props.placeholder}
				style={{ flex: '1' }}
				width={'100%'}
			/>
			<Button variant="text">{props.icon}</Button>
		</StyledSearchBox>
	);
}

export default SearchBox;
