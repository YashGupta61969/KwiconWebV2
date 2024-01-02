import { StyledUploadWrapper } from './upload-wrapper.styled';

/* eslint-disable-next-line */
export interface UploadWrapperProps {
	children: React.ReactNode | React.ReactNode[] | string;
	accept?: React.InputHTMLAttributes<HTMLInputElement>['accept'];
	style?: React.StyleHTMLAttributes<HTMLDivElement>;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const UploadWrapper = (props: UploadWrapperProps) => {
	return (
		<StyledUploadWrapper {...props}>
			{props.children}
			<input
				{...props.inputProps}
				onChange={props.onChange}
				type="file"
				name="uploadFile"
				accept={props.accept}
			/>
		</StyledUploadWrapper>
	);
};

export default UploadWrapper;
