import Select, { StylesConfig } from 'react-select';
import { useTheme } from 'styled-components';
import styles from './year-picker.module.css';

/* eslint-disable-next-line */
export interface YearPickerProps {
	placeholder?: string;
	onChange: (value: any) => void;
	selectedValue?: any;
	value: { label: string; value: string } | null | undefined;
	name?: string;
	ref?: any;
	disabled?: boolean;
	isOptionDisabled?: (option: any) => boolean;
}

export function YearPicker(props: YearPickerProps) {
	const theme = useTheme();

	// Generate an array of years from 1950 to the current years
	const years = [];
	const currentYear = new Date().getFullYear();
	for (let year = 1950; year <= currentYear; year++) {
		years.push({ value: year, label: year.toString() });
	}

	// custom style for year picker
	const customStyle: StylesConfig = {
		control: (provided, state) => ({
			...provided,
			border: state.isFocused
				? (theme.palettes.colors.secondary as string)
				: state.isDisabled ? '1px solid transparent' : `1px solid ${theme.palettes.colors.lightBlue[1]}`,
			background: state.isDisabled ? '#F2F2F2' : theme.palettes.colors.lightGray[0],
			padding: '0.3rem',
			borderRadius: theme.borderRadius.regular,
		}),
		menu: provided => ({
			...provided,
			width: '100%',
			overflow: 'hidden',
			height: '19.375rem',
		}),
		menuList: provided => ({
			...provided,
			'padding': 0,
			'maxHeight': '19.375rem',
			'overflowY': 'auto',

			// Styling the scrollbar
			'scrollbarWidth': 'thin',
			'scrollbarColor': theme.palettes.colors.lightBlue[1],
			'&::-webkit-scrollbar': {
				width: '8px', // Width of the scrollbar
			},
			'&::-webkit-scrollbar-track': {
				background: theme.palettes.colors.lightBlue[1],
			},
			'&::-webkit-scrollbar-thumb': {
				background: theme.palettes.colors.lightBlue[1],
				borderRadius: '4px',
			},
		}),
		option: (provided, state) => ({
			...provided,
			width: '8rem',
			display: 'inline-block',
			textAlign: 'center',
			padding: '0.5rem 0.75rem',
			margin: '0.5rem',
			border: `1px solid ${theme.palettes.colors.lightBlue[1]}`,
			borderRadius: '0.5rem',
			color: theme.palettes.colors.darkBlue[0],
			background: state.isSelected
				? theme.palettes.colors.lightBlue[2]
				: state.isDisabled
				? theme.palettes.colors.lightGray[1]
				: theme.palettes.colors.white,
		}),
	};

	return (
		<div className={styles['container']}>
			<Select
				ref={props.ref}
				options={years.reverse()}
				value={props?.value ? props.value : null}
				styles={customStyle}
				placeholder="Year"
				name={props.name}
				isSearchable={true}
				onChange={option => {
					props.onChange({ option, name: props.name });
				}}
				isOptionDisabled={props.isOptionDisabled}
				isDisabled={props.disabled}
			/>
		</div>
	);
}

export default YearPicker;
