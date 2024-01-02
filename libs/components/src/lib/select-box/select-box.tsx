/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@kwicon/kwicon-ui';
import Select, { StylesConfig } from 'react-select';
import Creatable from 'react-select/creatable';
import { useTheme } from 'styled-components';

/* eslint-disable-next-line */
export interface SelectBoxProps {
	options: any;
	placeholder?: string;
	onChange: (value: any) => void;
	onInputChange?: (value: any) => void | null;
	ref?: any;
	noOptionMessage?: string;
	selectStyles?: StylesConfig;
	defaultValue?: any;
	name?: string;
	variant?: 'select' | 'creatable';
	handleCreate?: (value: any) => void;
	isLoading?: boolean;
	components?: any;
	menuPosition?: 'absolute' | 'fixed';
	isClearable?: boolean;
	isSearchable?: boolean;
	value?: any;
	required?: boolean;
	menuIsOpen?: boolean;
}

export function SelectBox(props: SelectBoxProps) {
	const theme = useTheme();

	const customStyles: StylesConfig = {
		control: (provided, state) => ({
			...provided,
			'border': `1px solid ${theme.palettes.colors.secondary}`,
			'borderRadius': '2.75rem',
			'background': theme.palettes.colors.lightBlue[0],
			'color': theme.palettes.colors.darkBlue[0],
			'padding': '0.5rem',
			'boxShadow': 'none',
			'::placeholder': {
				color: theme.palettes.colors.darkBlue[0],
			},
			'&:hover': {
				border: `1px solid ${theme.palettes.colors.secondary}`,
				boxShadow: 'none',
			},
		}),
		menu: (provided, state) => ({
			...provided,
			borderRadius: '1.25rem',
			width: '100%',
		}),
		menuList: (provided, state) => ({
			...provided,
			padding: 10,
			borderRadius: '1.25rem',
		}),
		menuPortal(base, props) {
			return { ...base, zIndex: 9999 };
		},
		option: (provided, state) => ({
			...provided,
			'background': state.isSelected
				? theme.palettes.colors.lightBlue[2]
				: theme.palettes.colors.white,
			'color': state.isSelected
				? theme.palettes.colors.darkBlue[0]
				: theme.palettes.colors.black,
			'width': '100%',
			// don't render border on the last option
			'borderBottom':
				state.options.indexOf(state.data) === state.options.length - 1
					? 'none'
					: `1px solid ${theme.palettes.colors.lightBlue[0]}`,
			'&:hover': {
				backgroundColor: theme.palettes.colors.lightBlue[2],
				cursor: 'pointer',
			},
		}),
	};

	return (
		<Box mr={'1rem'}>
			{props.variant === 'select' ? (
				<Select
					{...props}
					ref={props.ref}
					options={props.options}
					isClearable={props.isClearable ?? true}
					styles={props.selectStyles ?? customStyles}
					isSearchable={props.isSearchable ?? true}
					components={props.components ?? null}
					onChange={option => {
						props.onChange(option);
					}}
					noOptionsMessage={() => props.noOptionMessage}
					menuShouldScrollIntoView={true}
					placeholder={props.placeholder}
					defaultValue={props.defaultValue}
					name={props.name}
					menuPosition={props.menuPosition ?? 'fixed'}
					value={props.value}
					required={props.required ? props.required : false}
					menuIsOpen={props.menuIsOpen}
				/>
			) : (
				<Creatable
					{...props}
					ref={props.ref}
					options={props.options}
					isClearable
					styles={props.selectStyles ?? customStyles}
					isSearchable
					components={{
						IndicatorSeparator: () => null,
						DropdownIndicator: () => null,
					}}
					onChange={option => {
						props.onChange(option);
					}}
					noOptionsMessage={() => props.noOptionMessage}
					menuShouldScrollIntoView={true}
					placeholder={props.placeholder}
					defaultValue={props.defaultValue}
					name={props.name}
					onCreateOption={props.handleCreate}
					isLoading={props.isLoading}
					menuPosition={props.menuPosition ?? 'fixed'}
				/>
			)}
		</Box>
	);
}

export default SelectBox;
