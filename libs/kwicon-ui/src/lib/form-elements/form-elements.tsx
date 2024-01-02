import { Input, InputProps } from './input';
import Label, { LabelProps } from './label';

export const FormElements = {
	Label: (props: LabelProps) => <Label {...props} />,
	Input: (props: InputProps) => <Input {...props} />,
};

export default FormElements;
