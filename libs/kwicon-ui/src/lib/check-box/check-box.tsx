import { CheckBoxWrapper } from './check-box.styled';

export interface CheckBoxProps {
	label: string;
	checked: boolean;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement> &
			React.MouseEvent<HTMLLabelElement, MouseEvent>,
	) => void;
	labelDirection?: 'left' | 'right';
	name?: string;
	onBlur?: () => void;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
	label,
	checked,
	onChange,
	name,
	onBlur,
	...props
}) => {
	return (
		<CheckBoxWrapper>
			<label>
				<input
					{...props}
					onBlur={onBlur}
					name={name}
					type="checkbox"
					checked={checked}
					onChange={onChange}
				/>
				<span className={`checkmark ${checked ? 'checked' : ''}`}></span>
				{label}
			</label>
		</CheckBoxWrapper>
	);
};
export default CheckBox;
