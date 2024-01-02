import Select, { StylesConfig } from 'react-select';
import { useTheme } from 'styled-components';
import styles from './month-picker.module.css';

/* eslint-disable-next-line */
export interface MonthPickerProps {
	placeholder?: string;
	onChange: (value: any) => void;
	selectedValue?: any;
	value: { label: string; value: string } | null | undefined;
	name?: string;
	ref?: any;
	disabled?: boolean;
	isOptionDisabled?: (option: any) => boolean;

}

export function MonthPicker(props: MonthPickerProps) {
	const theme = useTheme();

	// Array of options for month select
	const options = [
		{ value: 1, label: 'Jan' },
		{ value: 2, label: 'Feb' },
		{ value: 3, label: 'Mar' },
		{ value: 4, label: 'Apr' },
		{ value: 5, label: 'May' },
		{ value: 6, label: 'Jun' },
		{ value: 7, label: 'Jul' },
		{ value: 8, label: 'Aug' },
		{ value: 9, label: 'Sep' },
		{ value: 10, label: 'Oct' },
		{ value: 11, label: 'Nov' },
		{ value: 12, label: 'Dec' },
	];

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
			height: 'auto',
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
			width: '5rem',
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

	const handleChange = (selectedOption: { label: string; value: string }) => {
		props.onChange({ name: props.name, value: selectedOption.value });
	};

	return (
		<div className={styles['container']}>
			<Select
				ref={props.ref}
				options={options}
				value={
					props.value
						? options.find(
								month => month.value.toLocaleString() === props?.value?.value,
						  )
						: null
				}
				styles={customStyle}
				placeholder="Month"
				name={props.name}
				isSearchable={true}
				onChange={handleChange}
				isOptionDisabled={props.isOptionDisabled}
				isDisabled={props.disabled}
			/>
		</div>
	);
}

export default MonthPicker;
