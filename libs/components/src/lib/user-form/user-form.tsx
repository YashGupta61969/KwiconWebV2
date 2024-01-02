/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Box,
	FormElements,
	Grid,
	GridItem,
	UploadWrapper,
} from '@kwicon/kwicon-ui';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
	Control,
	Controller,
	FieldError,
	SubmitHandler,
} from 'react-hook-form';
import { useTheme } from 'styled-components';
import CvUploadBox from '../cv-upload-box/cv-upload-box';
import SelectBox from '../select-box/select-box';
import styles from './user-form.module.css';
import { StylesConfig } from 'react-select';

export interface UserFormProps {
	//! using any for now
	//TODO: Have to add types from react-hook-form
	handleSubmit: (callback: SubmitHandler<any>) => (e?: any) => Promise<void>;
	onSubmit: SubmitHandler<any>;
	control: Control<any>;
	error: {
		firstName?: FieldError;
		lastName?: FieldError;
		schoolName?: FieldError;
		grade?: FieldError;
		profession?: FieldError;
		alumniOf?: FieldError;
		linkedInUrl?: FieldError;
		phoneNumber?: FieldError;
		cvFile?: FieldError;
		about?: FieldError;
	};
	formId?: string;
	user: any;
	previewCV:
		| File
		| {
				name: string;
		  }
		| undefined;
	handleCVUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleRemoveCV: (e: any) => void;
	onClickUploadCV: () => void;
	allGrades: any | [] | undefined | null;
	userGrade: string;
	setUserGrade: (value: string) => void;
	setValue: (name: any, value: any) => void;
}

export function UserForm({
	handleSubmit,
	onSubmit,
	control,
	error,
	formId,
	user,
	previewCV,
	handleCVUpload,
	handleRemoveCV,
	onClickUploadCV,
	allGrades,
	userGrade,
	setUserGrade,
	setValue,
}: UserFormProps) {
	const theme = useTheme();
	const selectRef = useRef(null);

	const [options, setOptions] = useState<
		{
			value: string;
			label: string;
		}[]
	>([]);

	useEffect(() => {
		if (allGrades !== undefined && allGrades !== null) {
			if (allGrades?.length > 0) {
				const gradeOptions = allGrades
					?.map((grade: any) => grade?.values)?.[0]
					?.map((value: any) => {
						return {
							value: value,
							label: value,
						};
					});
				setOptions(gradeOptions);
			}
		}
	}, [allGrades]);

	const handleOnChangeOptions = (option: any) => {
		if (!option) {
			option = {
				target: selectRef,
				value: '',
			};
		}
		setUserGrade(option.value);
		setValue('grade', option.value);
	};

	// select box custom styles
	const selectStyles: StylesConfig = useMemo(() => {
		return {
			control: (provided, state) => ({
				...provided,
				'border': `1px solid ${theme.palettes.colors.lightBlue[1]}`,
				'borderRadius': theme.borderRadius.regular,
				'background':
					error?.grade?.message && userGrade === ''
						? theme.palettes.error[2]
						: theme.palettes.colors.lightGray[0],
				'color':
					error?.grade?.message && userGrade === '' ? '#EC6E6E' : 'inherit',
				'padding': '0.375rem',
				'boxShadow': 'none',
				'::placeholder': {
					color:
						error?.grade?.message && userGrade === ''
							? '#EC6E6E'
							: theme.palettes.colors.darkBlue[1],
				},
				'$:active': {
					border: `1px solid ${theme.palettes.colors.secondary}`,
				},
			}),
			menu: (provided, state) => ({
				...provided,
				borderRadius: theme.borderRadius.regular,
				width: '100%',
			}),
			menuList: (provided, state) => ({
				...provided,
				padding: 10,
				borderRadius: theme.borderRadius.regular,
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
				'&:hover': {
					backgroundColor: theme.palettes.colors.lightBlue[2],
					cursor: 'pointer',
				},
			}),
		};
	}, [
		error.grade,
		theme.borderRadius.regular,
		theme.palettes.colors,
		theme.palettes.error,
		userGrade,
	]);

	return (
		<Box id={formId} width={'100%'} as="form" onSubmit={handleSubmit(onSubmit)}>
			<Grid columns={2} gap={'1.5rem'}>
				{/* -- First Name -- */}
				<GridItem>
					<Box
						style={{
							display: 'flex',
							flexDirection: 'column' as const,
							gap: '0.5rem',
						}}
					>
						<FormElements.Label withAsterisk>First Name</FormElements.Label>
						<Controller
							name="firstName"
							control={control}
							render={({ field: { name, onChange, value, onBlur } }) => (
								<FormElements.Input
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									name={name}
									placeholder="What's your name?"
									error={error.firstName?.message}
								/>
							)}
							rules={{
								required: 'First name is required',
							}}
						/>
						{/* Error Box */}
						{error.firstName?.message && (
							<Box
								style={{
									fontSize: '0.875rem',
								}}
								color={theme.palettes.error[1]}
							>
								{error.firstName?.message}
							</Box>
						)}
					</Box>
				</GridItem>
				{/* -- Last Name -- */}
				<GridItem>
					<Box
						style={{
							display: 'flex',
							flexDirection: 'column' as const,
							gap: '0.5rem',
						}}
					>
						<FormElements.Label withAsterisk>Last Name</FormElements.Label>
						<Controller
							name="lastName"
							control={control}
							render={({ field: { name, onChange, value, onBlur } }) => (
								<FormElements.Input
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									name={name}
									placeholder="What's your last name name?"
									error={error.lastName?.message}
								/>
							)}
							rules={{
								required: 'Last name is required',
							}}
						/>
						{/* Error Box */}
						{error.lastName?.message && (
							<Box
								style={{
									fontSize: '0.875rem',
								}}
								color={theme.palettes.error[1]}
							>
								{error.lastName?.message}
							</Box>
						)}
					</Box>
				</GridItem>
				{/* -- School Name OR Profession  -- */}
				<GridItem>
					{user?.role === 'student' || user?.role === 'senior student' ? (
						<Box
							style={{
								display: 'flex',
								flexDirection: 'column' as const,
								gap: '0.5rem',
							}}
						>
							<FormElements.Label withAsterisk>School Name</FormElements.Label>
							<Controller
								name="schoolName"
								control={control}
								render={({ field: { name, onChange, value, onBlur } }) => (
									<FormElements.Input
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										name={name}
										placeholder="What's your school name?"
										error={error.schoolName?.message}
									/>
								)}
								rules={{
									required: 'School name is required',
								}}
							/>
							{/* Error Box */}
							{error.schoolName?.message && (
								<Box
									style={{
										fontSize: '0.875rem',
									}}
									color={theme.palettes.error[1]}
								>
									{error.schoolName?.message}
								</Box>
							)}
						</Box>
					) : (
						//* If user is an advisor
						<Box
							style={{
								display: 'flex',
								flexDirection: 'column' as const,
								gap: '0.5rem',
							}}
						>
							<FormElements.Label withAsterisk>
								Current Profession
							</FormElements.Label>
							<Controller
								name="profession"
								control={control}
								render={({ field: { name, onChange, value, onBlur } }) => (
									<FormElements.Input
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										name={name}
										placeholder="What's your field of work?"
										error={error.profession?.message}
									/>
								)}
								rules={{
									required: 'Profession is required',
								}}
							/>
							{/* Error Box */}
							{error.profession?.message && (
								<Box
									style={{
										fontSize: '0.875rem',
									}}
									color={theme.palettes.error[1]}
								>
									{error.profession?.message}
								</Box>
							)}
						</Box>
					)}
				</GridItem>
				{/* -- Grade -- */}
				<GridItem>
					{user?.role === 'student' || user?.role === 'senior student' ? (
						<Box
							style={{
								display: 'flex',
								flexDirection: 'column' as const,
								gap: '0.5rem',
							}}
						>
							<FormElements.Label withAsterisk>Grade</FormElements.Label>
							<Controller
								name="grade"
								control={control}
								render={({ field: { name } }) => (
									<SelectBox
										variant="select"
										name={name}
										ref={selectRef}
										options={options}
										onChange={handleOnChangeOptions}
										placeholder="Select your grade"
										noOptionMessage="Cannot find any grades"
										selectStyles={selectStyles}
										defaultValue={
											user?.grade
												? { value: user.grade, label: user.grade }
												: undefined
										}
										menuPosition="fixed"
									/>
								)}
								rules={{
									required: 'Grade is required',
								}}
							/>
							{/* Error Box */}
							{error.grade?.message && userGrade === '' ? (
								<Box
									style={{
										fontSize: '0.875rem',
									}}
									color={theme.palettes.error[1]}
								>
									{error.grade?.message}
								</Box>
							) : null}
						</Box>
					) : (
						<Box
							style={{
								display: 'flex',
								flexDirection: 'column' as const,
								gap: '0.5rem',
							}}
						>
							<FormElements.Label>LinkedIn URL</FormElements.Label>
							<Controller
								name="linkedInUrl"
								control={control}
								render={({ field: { name, onChange, value, onBlur } }) => (
									<FormElements.Input
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										name={name}
										placeholder="Enter LinkedIn URL"
									/>
								)}
								rules={{
									validate: value => {
										if (value?.length > 0) {
											return (
												/https:\/\/www.linkedin.com\/in\/[a-zA-Z0-9]+/.test(
													value,
												) || 'Invalid LinkedIn URL'
											);
										} else {
											return true;
										}
									},
								}}
								//? we don't need this right now
								// rules={{
								// 	required: 'Email is required',
								// 	validate: value =>
								// 		/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
								// 			value,
								// 		) || 'Invalid email address',
								// }}
							/>
							{/* Error Box */}
							{error.linkedInUrl?.message && (
								<Box
									style={{
										fontSize: '0.875rem',
									}}
									color={theme.palettes.error[1]}
								>
									{error.linkedInUrl?.message}
								</Box>
							)}
						</Box>
					)}
				</GridItem>
				{/* -- LinkedIn URL -- */}
				<GridItem>
					{user?.role === 'student' || user?.role === 'senior student' ? (
						<Box
							style={{
								display: 'flex',
								flexDirection: 'column' as const,
								gap: '0.5rem',
							}}
						>
							<FormElements.Label>LinkedIn URL</FormElements.Label>
							<Controller
								name="linkedInUrl"
								control={control}
								render={({ field: { name, onChange, value, onBlur } }) => (
									<FormElements.Input
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										name={name}
										placeholder="Enter LinkedIn URL"
									/>
								)}
								rules={{
									validate: value => {
										if (value?.length > 0) {
											return (
												/https:\/\/www.linkedin.com\/in\/[a-zA-Z0-9]+/.test(
													value,
												) || 'Invalid LinkedIn URL'
											);
										} else {
											return true;
										}
									},
								}}
							/>
							{error.linkedInUrl?.message && (
								<Box
									style={{
										fontSize: '0.875rem',
									}}
									color={theme.palettes.error[1]}
								>
									{error.linkedInUrl?.message}
								</Box>
							)}
						</Box>
					) : null}
				</GridItem>
				{/* -- CV -- */}
				{/* <GridItem>
					{user?.role === 'student' || user?.role === 'senior student' ? (
						<Box
							style={{
								display: 'flex',
								flexDirection: 'column' as const,
								gap: '0.5rem',
							}}
						>
							<FormElements.Label>CV</FormElements.Label>
							<UploadWrapper
								onChange={handleCVUpload}
								inputProps={{
									id: 'upload-cv',
								}}
								accept=".pdf, .doc, .docx"
							>
								<CvUploadBox
									onClickUploadCV={onClickUploadCV}
									previewCV={previewCV?.name}
									handleRemoveCV={handleRemoveCV}
								/>
							</UploadWrapper>
						</Box>
					) : null}
				</GridItem> */}
			</Grid>
			{/* About Me */}
			<Box
				mt={'1rem'}
				style={{
					display: 'flex',
					flexDirection: 'column' as const,
					gap: '0.5rem',
				}}
			>
				<FormElements.Label>About Me</FormElements.Label>
				<Controller
					name="about"
					control={control}
					render={({ field: { name, onChange, value, onBlur } }) => (
						<Box
							bg={theme.palettes.colors.lightGray[0]}
							borderRadius={theme.borderRadius.regular}
							p={'0.75rem'}
						>
							<textarea
								className={styles.textarea}
								value={value}
								onChange={onChange}
								onBlur={onBlur}
								name={name}
								placeholder="Write something about yourself"
								rows={5}
							/>
						</Box>
					)}
				/>
			</Box>
		</Box>
	);
}

export default UserForm;
