import {
	Box,
	Button,
	Chip,
	FormElements,
	Icon,
	IconButton,
	Modal,
} from '@kwicon/kwicon-ui';
import { useTheme } from 'styled-components';
import { Icons } from '@kwicon/commons';
import { ProfileCard } from './profile-card';
import { SelectBox } from '@kwicon/components';
import { Controller, useForm } from 'react-hook-form';
import { useMemo, useRef, useState } from 'react';
import { StylesConfig } from 'react-select';
import styles from '../other-user-profile.module.css';
import { useDispatch } from 'react-redux';
import { sendOrWithdrawConnectionRequest } from '../thunk-apis/send-withdraw-connection-request';
import { thunkString } from '../thunk-apis/thunk-string';
import { AppDispatch } from '../../app-store/app-store';
import { toast } from 'react-toastify';

export interface ConnectionModalProps {
	advisor: any;
	isOpen: boolean;
	handleClose: () => void;
	handleGetAllConnectionRequests: (type: string) => void;
	handleGetUser: () => void;
}

export const ConnectionModal: React.FC<ConnectionModalProps> = ({
	advisor,
	isOpen,
	handleClose,
	handleGetAllConnectionRequests,
}) => {
	const theme = useTheme();
	const {
		formState: { errors: error },
		handleSubmit,
		control,
		setValue,
	} = useForm({
		defaultValues: {
			fieldOfInterest: [],
			query: '',
		},
	});
	const dispatch = useDispatch<AppDispatch>();

	const selectRef = useRef(null);

	const [selectedInterests, setSelectedInterests] = useState<any[]>([]);

	const options = useMemo(() => {
		return advisor?.specialization?.map((item: any) => ({
			label: item.name,
			value: item.id,
		}));
	}, [advisor?.specialization]);

	const handleOnChangeOptions = (option: any) => {
		if (!option) {
			option = {
				target: selectRef,
				value: '',
			};

			return;
		}

		// check if the option is already selected, if yes, then unselect it
		const isOptionSelected = selectedInterests.find(
			(item: any) => item.value === option.value,
		);
		if (isOptionSelected) {
			const filteredOptions = selectedInterests.filter(
				(item: any) => item.value !== option.value,
			);
			setSelectedInterests(filteredOptions);
			setValue('fieldOfInterest', filteredOptions as any);
		} else {
			setSelectedInterests([...selectedInterests, option]);
			setValue('fieldOfInterest', [...selectedInterests, option] as any);
		}
	};

	const handleOnSubmit = async (data: any) => {
		const interests = data.fieldOfInterest.map((item: any) => item.value);
		try {
			const response = await dispatch(
				sendOrWithdrawConnectionRequest({
					isSent: true,
					toUserId: advisor.id,
					query: data.query,
					interests,
				}),
			);

			if (
				response.type ===
				`${thunkString.sendOrWithdrawConnectionRequest}/fulfilled`
			) {
				handleGetAllConnectionRequests('sent');
				toast.success('Connection request sent successfully');
				handleClose();
			}
		} catch (error) {
			throw new Error(error as string);
		}
	};

	// select box custom styles
	const selectStyles: StylesConfig = useMemo(() => {
		return {
			control: (provided, state) => ({
				...provided,
				'border': `1px solid ${theme.palettes.colors.lightBlue[1]}`,
				'borderRadius': theme.borderRadius.regular,
				'background':
					error?.fieldOfInterest?.message && selectedInterests?.length === 0
						? theme.palettes.error[2]
						: theme.palettes.colors.lightGray[0],
				'color':
					error?.fieldOfInterest?.message && selectedInterests?.length === 0
						? '#EC6E6E'
						: 'inherit',
				'padding': '0.375rem',
				'boxShadow': 'none',
				'::placeholder': {
					color:
						error?.fieldOfInterest?.message && selectedInterests?.length === 0
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
		error.fieldOfInterest,
		theme.borderRadius.regular,
		theme.palettes.colors,
		theme.palettes.error,
		selectedInterests.length,
	]);

	return (
		<Modal
			isOpen={isOpen}
			modalContentStyle={{
				width: '50%',
				borderRadius: '0.5rem',
				padding: '1.5rem 2rem',
			}}
		>
			<Box>
				{/* TOP */}
				<Box
					style={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<Box
						style={{
							fontSize: '1.5rem',
							fontWeight: 'bold',
							color: theme.palettes.colors.darkBlue[0],
						}}
					>
						Send Invitation
					</Box>
					<Box mt={'0.2rem'}>
						<IconButton
							onClick={handleClose}
							style={{
								backgroundColor: 'transparent',
							}}
						>
							<Icon
								component={Icons.CrossIcon}
								height="0.875rem"
								width="0.875rem"
							/>
						</IconButton>
					</Box>
				</Box>

				{/* MAIN */}
				<Box mt={'1rem'}>
					<ProfileCard
						advisor={advisor}
						mediaId={advisor?.profilePicture}
						showConnections={false}
						showExpertise={true}
						showLinkedin={false}
					/>
				</Box>

				{/* INQUIRIES */}
				<Box
					id="invitation-form"
					as="form"
					onSubmit={handleSubmit(handleOnSubmit)}
					style={{
						height: '30vh',
						overflowY: 'scroll' as const,
					}}
				>
					<Box
						style={{
							display: 'flex',
							flexDirection: 'column' as const,
							gap: '0.5rem',
						}}
					>
						<Box
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<FormElements.Label withAsterisk>
								Field of Interests
							</FormElements.Label>
							{/* Error Box */}
							{error.fieldOfInterest?.message &&
							selectedInterests?.length === 0 ? (
								<Box
									style={{
										fontSize: '0.875rem',
									}}
									color={theme.palettes.error[1]}
								>
									{error.fieldOfInterest?.message}
								</Box>
							) : null}
						</Box>
						<Controller
							name="fieldOfInterest"
							control={control}
							render={({ field: { name } }) => (
								<SelectBox
									variant="select"
									name={name}
									ref={selectRef}
									options={options}
									onChange={handleOnChangeOptions}
									placeholder="What do you want to learn about?"
									noOptionMessage="Cannot find the field of interest you are looking for"
									selectStyles={selectStyles}
									menuPosition="fixed"
								/>
							)}
							rules={{
								required: 'Field of interest is required',
							}}
						/>
					</Box>
					<Box
						mt={'1rem'}
						style={{
							display: 'flex',
							flexWrap: 'wrap' as const,
							gap: '0.5rem',
						}}
					>
						{selectedInterests
							?.filter((item: any) => item.label !== '' && item.value !== '')
							.map((item: any, index: number) => (
								<Chip
									key={index}
									fs={'0.75rem'}
									style={{
										padding: '0.25rem 0.5rem',
									}}
								>
									{item.label}
								</Chip>
							))}
					</Box>
					<Box
						mt={'1rem'}
						style={{
							display: 'flex',
							flexDirection: 'column' as const,
							gap: '0.5rem',
						}}
					>
						<Box
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<FormElements.Label withAsterisk>Query</FormElements.Label>{' '}
							{/* Error Box */}
							{error.query?.message ? (
								<Box
									style={{
										fontSize: '0.875rem',
									}}
									color={theme.palettes.error[1]}
								>
									{error.query?.message}
								</Box>
							) : null}
						</Box>
						<Controller
							name="query"
							control={control}
							render={({ field: { name, onChange, value, onBlur } }) => (
								<Box
									bg={
										error.query?.message
											? theme.palettes.error[2]
											: theme.palettes.colors.lightGray[0]
									}
									borderRadius={theme.borderRadius.regular}
									p={'0.75rem'}
								>
									<textarea
										className={styles.textarea}
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										name={name}
										placeholder="What question is on your mind?"
										rows={10}
									/>
								</Box>
							)}
							rules={{
								required: 'Query is required',
							}}
						/>
					</Box>
				</Box>
				<Box
					mt={'2rem'}
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						gap: '1rem',
					}}
				>
					<Button
						variant="secondary"
						style={{
							color: theme.palettes.colors.darkBlue[0],
							padding: '0.5rem 1rem',
						}}
						size="medium"
						onClick={handleClose}
					>
						Cancel
					</Button>
					<Button
						form="invitation-form"
						type={'submit'}
						variant="primary"
						size="medium"
						style={{
							padding: '0.5rem 1rem',
						}}
					>
						Send Request
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};
