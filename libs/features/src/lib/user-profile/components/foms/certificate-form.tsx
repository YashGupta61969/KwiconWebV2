import {
	Icons,
	getMonthfromDate,
	getYearfromDate,
	routePaths,
} from '@kwicon/commons';
import { MonthPicker, SelectBox, YearPicker } from '@kwicon/components';
import {
	Box,
	Button,
	Chip,
	FormElements,
	Grid,
	GridItem,
	Heading,
	Modal,
	Paragraph,
} from '@kwicon/kwicon-ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StylesConfig } from 'react-select';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../../app-store/app-store';
import { getOnboardingState } from '../../../onboarding/slices/onboarding.slice';
import {
	ICertificate,
	IPayload,
} from '../../interfaces/user-profile-interfaces';
import { addCertificate } from '../../thunk-apis/add-certificate';
import { deleteCertificate } from '../../thunk-apis/delete-certificate';
import { thunkString } from '../../thunk-apis/thunk-string';
import { updateCertificate } from '../../thunk-apis/update-certificate';
import styles from '../../user.module.css';

interface CertificateFormProps {
	isEditable?: boolean;
	certificate?: ICertificate;
}

export function CertificateForm(props: CertificateFormProps) {
	// hooks
	const theme = useTheme();
	const navigate = useNavigate();

	//* Redux store
	const dispatch = useDispatch<AppDispatch>();
	const { subCategoryList } = useSelector(getOnboardingState);

	const startMonthRef = useRef(null);
	const startYearRef = useRef(null);
	const endMonthRef = useRef(null);
	const endYearRef = useRef(null);

	const skillsRef = useRef(null);

	// local state
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
	const [isCurrentlyPursuing, setIsCurrentlyPursuing] =
		useState<boolean>(false);
	const [options, setOptions] = useState<
		{
			value: string;
			label: string;
			category: string;
		}[]
	>([]);
	const [selectedSkills, setSelectedSkills] = useState<
		{
			value: string;
			label: string;
			category: string;
		}[]
	>([]);
	const [skillError, setSkillError] = useState<string>('');

	const {
		formState: { errors: error },
		handleSubmit,
		control,
		setValue,
	} = useForm({
		defaultValues: {
			title: '',
			conductedBy: '',
			startMonth: '',
			startYear: '',
			endMonth: '',
			endYear: '',
			location: '',
			description: '',
		},
	});

	// custom style
	const customStyles: StylesConfig = {
		control: provided => ({
			...provided,
			'border': `1px solid ${theme.palettes.colors.lightBlue[1]}`,
			'borderRadius': theme.borderRadius.regular,
			'background': theme.palettes.colors.lightGray[0],
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
		menu: provided => ({
			...provided,
			borderRadius: '1.25rem',
			width: '100%',
		}),
		menuList: provided => ({
			...provided,
			padding: 10,
			borderRadius: '1.25rem',
		}),
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

	/* -- Effects --*/
	// sort the categories
	useEffect(() => {
		//? sorting the duplicate subcategories by its category and place the names in the array of respective category
		// TODO: have to work with the any type
		if (
			subCategoryList !== null &&
			subCategoryList !== undefined &&
			subCategoryList.length > 0
		) {
			const optionForSelectBox = subCategoryList.map((item: any) => ({
				value: item.id,
				label: item.name,
				category: item.category,
			}));

			setOptions(optionForSelectBox);
		}
	}, [subCategoryList, setOptions]);

	// If form is edit form then fill the field with existing data
	useEffect(() => {
		if (props.isEditable) {
			if (props.certificate?.id) {
				const {
					conductedBy,
					title,
					isCurrentlyPursuing,
					location,
					startDate,
					endDate,
					skillSet,
					description,
				} = props.certificate;

				const startMonth = getMonthfromDate(startDate as string);
				const startYear = getYearfromDate(startDate as string);
				const endMonth = getMonthfromDate(endDate as string);
				const endYear = getYearfromDate(endDate as string);

				setValue('title', title ? title : '');
				setValue('location', location ? location : '');
				setValue('conductedBy', conductedBy ? conductedBy : '');
				setValue('description', description ? description : '');
				setValue('startMonth', startMonth ? startMonth : '');
				setValue('startYear', startYear ? startYear : '');
				setValue(
					'endMonth',
					isCurrentlyPursuing ? '' : endMonth ? endMonth : '',
				);
				setValue('endYear', isCurrentlyPursuing ? '' : endYear ? endYear : '');
				setIsCurrentlyPursuing(
					isCurrentlyPursuing ? isCurrentlyPursuing : false,
				);

				// set selected Skill
				const skills = skillSet?.map((skill: any) => ({
					value: skill.id,
					label: skill.name,
					category: skill.category,
				}));
				setSelectedSkills(
					skills as { value: string; label: string; category: string }[],
				);
			}
		}
	}, [props.isEditable, props.certificate, setValue, setIsCurrentlyPursuing]);

	/*  --Handlers-- */

	// handling the delete modal
	const toggleDeleteModal = () => {
		setIsDeleteModalOpen(!isDeleteModalOpen);
	};

	// Event handler for the change event of the "currently working" checkbox
	const handleCurrentlyPursuing = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setIsCurrentlyPursuing(event.target.checked);
	};

	// handling the year input
	const handleOnChangeMonthOptions = ({
		name,
		value,
	}: {
		name: any;
		value: string;
	}) => {
		if (name && value) {
			setValue(name, value);
		}
	};

	// handling the year input
	const handleOnChangeYearOptions = ({ option, name }: any) => {
		if (option.value && name) {
			setValue(name, option.value);
		}
	};

	// skill handlers
	const addSkillsHandler = (data: any) => {
		if (!data) {
			data = {
				target: skillsRef,
				value: '',
			};
		}

		setSkillError('');
		setSelectedSkills((prev: any) => {
			if (prev !== undefined) {
				const isAlreadySelected = prev?.find(
					(skill: any) => skill.value === data.value,
				);
				if (isAlreadySelected) {
					const newSkills = prev.filter(
						(item: any) => item?.value !== data.value,
					);
					return newSkills;
				} else {
					return [...prev, data];
				}
			}
			return [];
		});
	};

	// remove skill handler
	const removeSkillsHandler = (id: string) => {
		const filteredSkills = selectedSkills.filter(
			(skill: any) => skill.value !== id,
		);
		setSelectedSkills(filteredSkills);
	};

	// delete handler
	const deleteHandler = useCallback(async () => {
		setIsDeleteLoading(true);
		const response = await dispatch(
			deleteCertificate({
				programId: props.certificate?.id,
			}),
		);

		if (response.type === `${thunkString.deleteCertificate}/fulfilled`) {
			setIsDeleteLoading(false);
			toast.success('Certificate has been deleted');
			navigate(routePaths.user.certificate.root);
		}
	}, [dispatch, navigate, props?.certificate?.id]);

	//* form submit handler
	const addHandleFormSubmit = useCallback(
		async (data: IPayload) => {
			if (data) {
				if (selectedSkills.length >= 1) {
					setIsLoading(true);
					const response = await dispatch(
						addCertificate({
							title: data.title,
							conductedBy: data.conductedBy,
							location: data.location,
							description: data.description,
							isCurrentlyPursuing: isCurrentlyPursuing,
							startDate: `${data.startYear}-${data.startMonth}-01`,
							endDate: isCurrentlyPursuing
								? undefined
								: `${data.endYear}-${data.endMonth}-01`,
							skillSet: selectedSkills.map(item => item.value),
						}),
					);
					if (response.type === `${thunkString.addCertificate}/fulfilled`) {
						setIsLoading(false);
						toast.success('Certificate has been added!');
						navigate(routePaths.user.certificate.root);
					}
				} else {
					setSkillError('Must be added minium 1 skills');
				}
			}
		},
		[dispatch, navigate, isCurrentlyPursuing, selectedSkills],
	);

	// update form submit handler
	const updateHandleFormSubmit = useCallback(
		async (data: IPayload) => {
			if (data) {
				if (selectedSkills.length >= 1) {
					setIsLoading(true);
					const response = await dispatch(
						updateCertificate({
							id: props.certificate?.id,
							title: data.title,
							conductedBy: data.conductedBy,
							location: data.location,
							description: data.description,
							isCurrentlyPursuing: isCurrentlyPursuing,
							startDate: `${data.startYear}-${data.startMonth}-01`,
							endDate: isCurrentlyPursuing
								? undefined
								: `${data.endYear}-${data.endMonth}-01`,
							skillSet: selectedSkills.map(item => item.value),
						}),
					);
					if (response.type === `${thunkString.updateCertificate}/fulfilled`) {
						setIsLoading(false);
						toast.success('Certificate has been updated!');
						navigate(routePaths.user.certificate.root);
					}
				} else {
					setSkillError('Must be added minium 1 skills');
				}
			}
		},
		[
			dispatch,
			isCurrentlyPursuing,
			selectedSkills,
			navigate,
			props.certificate?.id,
		],
	);

	/**
	 * Navigates to the previous page.
	 */
	function goBack() {
		navigate(-1); // Navigate back by one step
	}

	return (
		<Box
			mt={'1rem'}
			as="form"
			onSubmit={handleSubmit(
				props.isEditable ? updateHandleFormSubmit : addHandleFormSubmit,
			)}
		>
			<Box>
				<Grid columns={2} gap={'1.5rem'} alignItems="center">
					{/* -- Degree -- */}
					<GridItem>
						<Box
							style={{
								display: 'flex',
								flexDirection: 'column' as const,
								gap: '0.5rem',
							}}
						>
							<FormElements.Label withAsterisk>
								Certificate name
							</FormElements.Label>
							<Controller
								name="title"
								control={control}
								render={({ field: { name, onChange, value, onBlur } }) => (
									<FormElements.Input
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										name={name}
										placeholder="Name of the certificate (eg: NPTEL)"
										error={error.title?.message}
									/>
								)}
								rules={{
									required: 'Certificate name is required',
								}}
							/>
							{/* Error Box */}
							{error.title?.message && (
								<Box
									style={{
										fontSize: '0.875rem',
									}}
									color={theme.palettes.error[1]}
								>
									{error.title?.message}
								</Box>
							)}
						</Box>
					</GridItem>

					{/* -- Conducted by -- */}
					<GridItem>
						<Box
							style={{
								display: 'flex',
								flexDirection: 'column' as const,
								gap: '0.5rem',
							}}
						>
							<FormElements.Label withAsterisk>Conducted by</FormElements.Label>
							<Controller
								name="conductedBy"
								control={control}
								render={({ field: { name, onChange, value, onBlur } }) => (
									<FormElements.Input
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										name={name}
										placeholder="Name of institute providing the certificate"
										error={error.conductedBy?.message}
										required
									/>
								)}
								rules={{
									required: 'School is required',
								}}
							/>
							{/* Error Box */}
							{error.conductedBy?.message && (
								<Box
									style={{
										fontSize: '0.875rem',
									}}
									color={theme.palettes.error[1]}
								>
									{error.conductedBy?.message}
								</Box>
							)}
						</Box>
					</GridItem>

					{/* Location */}

					<GridItem>
						<Box
							style={{
								display: 'flex',
								flexDirection: 'column' as const,
								gap: '0.5rem',
							}}
						>
							<FormElements.Label withAsterisk>Location</FormElements.Label>
							<Controller
								name="location"
								control={control}
								render={({ field: { name, onChange, value, onBlur } }) => (
									<FormElements.Input
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										name={name}
										placeholder="Name of the city/town you worked in"
										error={error.location?.message}
									/>
								)}
								rules={{
									required: 'Location is required',
								}}
							/>
							{/* Error Box */}
							{error.location?.message && (
								<Box
									style={{
										fontSize: '0.875rem',
									}}
									color={theme.palettes.error[1]}
								>
									{error.location?.message}
								</Box>
							)}
						</Box>
					</GridItem>

					<GridItem>
						<Box
							style={{
								display: 'flex',
								gap: '0.5rem',
								alignItems: 'center',
							}}
							mt={'2rem'}
						>
							<input
								type="checkbox"
								id=""
								// checked={isCurrentlyPursuing}
								// onChange={isCurrentlyPursuing}
								style={{
									outline: 'none',
									border: `2px solid ${theme.palettes.colors.secondary}`,
									width: '1.1em',
									height: '1.1rem',
								}}
							/>
							<label
								htmlFor=""
								style={{
									fontSize: '0.9rem',
								}}
							>
								This is an online certification
							</label>
						</Box>
					</GridItem>

					{/* -- Start Date -- */}
					<GridItem>
						<Box mb={'0.5rem'}>
							<FormElements.Label withAsterisk>Start Date</FormElements.Label>
						</Box>
						<Box
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								gap: '1rem',
							}}
						>
							<Box
								width={'100%'}
								style={{
									display: 'flex',
									flexDirection: 'column' as const,
									gap: '0.5rem',
								}}
							>
								<Controller
									name="startMonth"
									control={control}
									render={({ field: { name, value } }) => {
										return (
											<MonthPicker
												ref={startMonthRef}
												name={name}
												onChange={handleOnChangeMonthOptions}
												value={value ? { label: value, value } : null}
											/>
										);
									}}
									rules={{ required: 'Starting month is required' }}
								/>
								{/* Error Box */}
								{error.startMonth?.message && (
									<Box
										style={{
											fontSize: '0.875rem',
										}}
										color={theme.palettes.error[1]}
									>
										{error.startMonth?.message}
									</Box>
								)}
							</Box>
							<Box
								width={'100%'}
								style={{
									display: 'flex',
									flexDirection: 'column' as const,
									gap: '0.5rem',
								}}
							>
								<Controller
									name="startYear"
									control={control}
									render={({ field: { name, value } }) => {
										return (
											<YearPicker
												ref={startYearRef}
												name={name}
												onChange={handleOnChangeYearOptions}
												value={value ? { label: value, value } : null}
											/>
										);
									}}
									rules={{
										required: 'Starting year is required',
									}}
								/>
								{/* Error Box */}
								{error.startYear?.message && (
									<Box
										style={{
											fontSize: '0.875rem',
										}}
										color={theme.palettes.error[1]}
									>
										{error.startYear?.message}
									</Box>
								)}
							</Box>
						</Box>
					</GridItem>
					{/* -- End Date -- */}
					<GridItem>
						<Box mb={'0.5rem'}>
							<FormElements.Label withAsterisk>End Date</FormElements.Label>
						</Box>
						<Box
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								gap: '1rem',
							}}
						>
							<Box
								width={'100%'}
								style={{
									display: 'flex',
									flexDirection: 'column' as const,
									gap: '0.5rem',
								}}
							>
								<Controller
									name="endMonth"
									control={control}
									render={({ field: { name, value } }) => {
										return (
											<MonthPicker
												ref={endMonthRef}
												name={name}
												onChange={handleOnChangeMonthOptions}
												value={value ? { label: value, value } : null}
												disabled={isCurrentlyPursuing}
											/>
										);
									}}
									rules={{
										required: isCurrentlyPursuing
											? false
											: 'Ending month is required',
									}}
								/>
								{/* Error Box */}
								{error.endMonth?.message && (
									<Box
										style={{
											fontSize: '0.875rem',
										}}
										color={theme.palettes.error[1]}
									>
										{error.endMonth?.message}
									</Box>
								)}
							</Box>
							<Box
								width={'100%'}
								style={{
									display: 'flex',
									flexDirection: 'column' as const,
									gap: '0.5rem',
								}}
							>
								<Controller
									name="endYear"
									control={control}
									render={({ field: { name, value } }) => {
										return (
											<YearPicker
												ref={endYearRef}
												name={name}
												onChange={handleOnChangeYearOptions}
												value={value ? { label: value, value } : null}
												disabled={isCurrentlyPursuing}
											/>
										);
									}}
									rules={{
										required: isCurrentlyPursuing
											? false
											: 'Ending year is required',
									}}
								/>
								{/* Error Box */}
								{error.endYear?.message && (
									<Box
										style={{
											fontSize: '0.875rem',
										}}
										color={theme.palettes.error[1]}
									>
										{error.endYear?.message}
									</Box>
								)}
							</Box>
						</Box>
					</GridItem>

					<GridItem>
						<Box
							style={{
								display: 'flex',
								gap: '0.5rem',
								alignItems: 'center',
							}}
						>
							<input
								type="checkbox"
								id="studyCurrently"
								checked={isCurrentlyPursuing}
								onChange={handleCurrentlyPursuing}
								style={{
									outline: 'none',
									border: `2px solid ${theme.palettes.colors.secondary}`,
									width: '1.1em',
									height: '1.1rem',
								}}
							/>
							<label
								htmlFor="studyCurrently"
								style={{
									fontSize: '0.9rem',
								}}
							>
								I am still pursuing this certification
							</label>
						</Box>
					</GridItem>
					<Box></Box>
				</Grid>

				{/* Description */}
				<Box
					mt={'1rem'}
					style={{
						display: 'flex',
						flexDirection: 'column' as const,
						gap: '0.5rem',
					}}
				>
					<FormElements.Label>Description</FormElements.Label>
					<Controller
						name="description"
						control={control}
						render={({ field: { name, onChange, value, onBlur } }) => (
							<Box
								bg={theme.palettes.colors.lightGray[0]}
								borderRadius={theme.borderRadius.regular}
								p={'0.75rem'}
								border={`1px solid ${theme.palettes.colors.lightBlue[1]}`}
							>
								<textarea
									className={styles.textarea}
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									name={name}
									placeholder="What did you learn during this time"
									rows={4}
								/>
							</Box>
						)}
					/>
				</Box>

				{/* Skills Acquired */}
				<Box
					style={{
						display: 'flex',
						flexDirection: 'column' as const,
						gap: '0.5rem',
					}}
					mt={'1rem'}
				>
					<FormElements.Label withAsterisk>Skills Acquired</FormElements.Label>
					<SelectBox
						options={options}
						onChange={addSkillsHandler}
						placeholder="Type in skills (eg: Project Management)"
						selectStyles={customStyles}
						ref={skillsRef}
					/>

					{skillError && (
						<Paragraph fs={'0.8rem'} color={theme.palettes.error[1]}>
							{skillError}
						</Paragraph>
					)}
					<Box
						style={{
							display: 'flex',
							flexWrap: 'wrap' as const,
							gap: '0.75rem',
							marginTop: '1rem',
						}}
					>
						{selectedSkills?.length > 0 ? (
							selectedSkills
								?.filter(skill => skill?.value !== '')
								?.map((item: any, index: number) => (
									<Chip
										key={index}
										onClick={() => removeSkillsHandler(item?.value)}
										showTransition
										style={{
											cursor: 'pointer',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											gap: '0.5rem',
											fontWeight: 400,
										}}
										color={theme.palettes.colors.darkBlue[0]}
										borderColor={theme.palettes.colors.lightBlue[2]}
									>
										{item.label}
										<Icons.CrossIcon />
									</Chip>
								))
						) : (
							<Paragraph
								fs={'0.85rem'}
								color={theme.palettes.colors.darkBlue[0]}
							>
								We recommend to add your top 5 skills
							</Paragraph>
						)}
					</Box>
				</Box>
			</Box>
			<Box
				mt={'1rem'}
				style={{
					display: 'flex',
					justifyContent: props.isEditable ? 'space-between' : 'end',
				}}
			>
				{props.isEditable && (
					<Box>
						<Modal
							isOpen={isDeleteModalOpen}
							toggleModal={toggleDeleteModal}
							overlayColor="rgba(0, 0, 0, 0.25)"
							openButton={
								<Button
									onClick={toggleDeleteModal}
									variant="tertiary"
									style={{
										padding: '0.6875em 2rem',
										borderRadius: theme.borderRadius.pill,
										color: theme.palettes.error[1],
									}}
								>
									Delete Certification
								</Button>
							}
						>
							<Heading fs={'1.125rem'} fw={'700'}>
								Delete Certification?
							</Heading>
							<Paragraph fs={'0.875rem'} color="#101010">
								Are you sure you want to delete the certification{' '}
								<b> {props.certificate?.title}</b>?
							</Paragraph>
							<Box style={{ display: 'flex', gap: '0.5rem' }}>
								<Button
									onClick={toggleDeleteModal}
									variant="tertiary"
									style={{
										padding: '0.5rem 1rem',
										color: theme.palettes.colors.primary as string,
									}}
								>
									No, keep it
								</Button>
								<Button
									onClick={deleteHandler}
									variant="tertiary"
									style={{
										padding: '0.5rem 1rem',
										color: theme.palettes.colors.primary as string,
									}}
									loading={isDeleteLoading}
								>
									Yes, delete
								</Button>
							</Box>
						</Modal>
					</Box>
				)}

				<Box style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
					<Button
						onClick={goBack}
						style={{
							background: theme.palettes.colors.lightGray[0],
							padding: '0.6875em 2rem',
							borderRadius: theme.borderRadius.pill,
							fontSize: '1rem',
							color: theme.palettes.colors.primary as string,
						}}
					>
						Go back
					</Button>
					<Button
						type="submit"
						variant="primary"
						style={{ padding: '0.6875em 2rem' }}
						loading={isLoading}
					>
						Save Changes
					</Button>
				</Box>
			</Box>
		</Box>
	);
}
