import { getMonthfromDate, getYearfromDate, routePaths } from '@kwicon/commons';
import { MonthPicker, YearPicker } from '@kwicon/components';
import {
	Box,
	Button,
	FormElements,
	Grid,
	GridItem,
	Heading,
	Modal,
	Paragraph,
} from '@kwicon/kwicon-ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../../app-store/app-store';
import {
	IAchievement,
	IPayload,
} from '../../interfaces/user-profile-interfaces';
import { addAchievement } from '../../thunk-apis/add-achievement';
import { deleteAchievement } from '../../thunk-apis/delete-achievement';
import { thunkString } from '../../thunk-apis/thunk-string';
import { updateAchievement } from '../../thunk-apis/update-achievement';
import styles from '../../user.module.css';

interface AchievementFormProps {
	isEditable?: boolean;
	achievement?: IAchievement;
}

export function AchievementForm(props: AchievementFormProps) {
	// hooks
	const theme = useTheme();
	const navigate = useNavigate();

	//* Redux store
	const dispatch = useDispatch<AppDispatch>();

	const monthRef = useRef(null);
	const yearRef = useRef(null);

	// local state
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

	const {
		formState: { errors: error },
		handleSubmit,
		control,
		setValue,
	} = useForm({
		defaultValues: {
			awardName: '',
			givenBy: '',
			month: '',
			year: '',
			description: '',
		},
	});

	/* -- Effects --*/

	//If form is edit form then fill the field with existing data
	useEffect(() => {
		if (props.isEditable) {
			if (props.achievement) {
				const { awardName, givenBy, description, date } = props.achievement;

				const month = getMonthfromDate(date as string);
				const year = getYearfromDate(date as string);

				setValue('awardName', awardName ? awardName : '');
				setValue('givenBy', givenBy ? givenBy : '');
				setValue('description', description ? description : '');
				setValue('month', month ? month : '');
				setValue('year', year ? year : '');
			}
		}
	}, [props.isEditable, props.achievement, setValue]);

	/*  --Handlers-- */

	// handling the delete modal
	const toggleDeleteModal = () => {
		setIsDeleteModalOpen(!isDeleteModalOpen);
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

	// delete handler
	const deleteHandler = useCallback(async () => {
		setIsDeleteLoading(true);
		const response = await dispatch(
			deleteAchievement({
				recognitionId: props.achievement?.id,
			}),
		);

		if (response.type === `${thunkString.deleteAchievement}/fulfilled`) {
			setIsDeleteLoading(false);
			toast.success('Achievement has been deleted');
			navigate(routePaths.user.achievement.root);
		}
	}, [dispatch, navigate, props?.achievement?.id]);

	//* form submit handler
	const addHandleFormSubmit = useCallback(
		async (data: IPayload) => {
			if (data) {
				setIsLoading(true);
				const response = await dispatch(
					addAchievement({
						awardName: data.awardName,
						givenBy: data.givenBy,
						description: data.description,
						date: `${data.year}-${data.month}-01`,
					}),
				);
				if (response.type === `${thunkString.addAchievement}/fulfilled`) {
					setIsLoading(false);
					toast.success('Achievement has been added!');
					navigate(routePaths.user.achievement.root);
				}
			}
		},
		[dispatch, navigate],
	);

	// update form submit handler
	const updateHandleFormSubmit = useCallback(
		async (data: IPayload) => {
			if (data) {
				setIsLoading(true);
				const response = await dispatch(
					updateAchievement({
						id: props.achievement?.id,
						awardName: data.awardName,
						givenBy: data.givenBy,
						description: data.description,
						date: `${data.year}-${data.month}-01`,
					}),
				);
				if (response.type === `${thunkString.updateAchievement}/fulfilled`) {
					setIsLoading(false);
					toast.success('Achievement has been updated!');
					navigate(routePaths.user.achievement.root);
				}
			}
		},
		[dispatch, navigate, props.achievement?.id],
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
				<Grid columns={2} gap={'1.5rem'}>
					{/* -- awardName -- */}
					<GridItem>
						<Box
							style={{
								display: 'flex',
								flexDirection: 'column' as const,
								gap: '0.5rem',
							}}
						>
							<FormElements.Label withAsterisk>
								Achievement name
							</FormElements.Label>
							<Controller
								name="awardName"
								control={control}
								render={({ field: { name, onChange, value, onBlur } }) => (
									<FormElements.Input
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										name={name}
										placeholder="Any award you received (eg: KVPY scholarship)"
										error={error.awardName?.message}
									/>
								)}
								rules={{
									required: 'Award Name is required',
								}}
							/>
							{/* Error Box */}
							{error.awardName?.message && (
								<Box
									style={{
										fontSize: '0.875rem',
									}}
									color={theme.palettes.error[1]}
								>
									{error.awardName?.message}
								</Box>
							)}
						</Box>
					</GridItem>

					{/* -- Awarded by -- */}
					<GridItem>
						<Box
							style={{
								display: 'flex',
								flexDirection: 'column' as const,
								gap: '0.5rem',
							}}
						>
							<FormElements.Label withAsterisk>Awarded by</FormElements.Label>
							<Controller
								name="givenBy"
								control={control}
								render={({ field: { name, onChange, value, onBlur } }) => (
									<FormElements.Input
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										name={name}
										placeholder="Name of organization giving the award"
										error={error.givenBy?.message}
										required
									/>
								)}
								rules={{
									required: 'School is required',
								}}
							/>
							{/* Error Box */}
							{error.givenBy?.message && (
								<Box
									style={{
										fontSize: '0.875rem',
									}}
									color={theme.palettes.error[1]}
								>
									{error.givenBy?.message}
								</Box>
							)}
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
									name="month"
									control={control}
									render={({ field: { name, value } }) => {
										return (
											<MonthPicker
												ref={monthRef}
												name={name}
												onChange={handleOnChangeMonthOptions}
												value={value ? { label: value, value } : null}
											/>
										);
									}}
									rules={{ required: 'Month is required' }}
								/>
								{/* Error Box */}
								{error.month?.message && (
									<Box
										style={{
											fontSize: '0.875rem',
										}}
										color={theme.palettes.error[1]}
									>
										{error.month?.message}
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
									name="year"
									control={control}
									render={({ field: { name, value } }) => {
										return (
											<YearPicker
												ref={yearRef}
												name={name}
												onChange={handleOnChangeYearOptions}
												value={value ? { label: value, value } : null}
											/>
										);
									}}
									rules={{ required: 'Year is required' }}
								/>
								{/* Error Box */}
								{error.year?.message && (
									<Box
										style={{
											fontSize: '0.875rem',
										}}
										color={theme.palettes.error[1]}
									>
										{error.year?.message}
									</Box>
								)}
							</Box>
						</Box>
					</GridItem>
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
									placeholder="Write about how you reached this achievement"
									rows={4}
								/>
							</Box>
						)}
					/>
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
									Delete Experience
								</Button>
							}
						>
							<Heading fs={'1.125rem'} fw={'700'}>
								Delete Achievement?
							</Heading>
							<Paragraph fs={'0.875rem'} color="#101010">
								Are you sure you want to delete the achievement{' '}
								<b> {props.achievement?.awardName}</b>?
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
