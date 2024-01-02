import {
	Box,
	Button,
	FormElements,
	Icon,
	IconButton,
	Modal,
	Paragraph,
} from '@kwicon/kwicon-ui';
import { Icons, cookies, routePaths, useLogout } from '@kwicon/commons';
import { useTheme } from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import styles from '../settings.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserState } from '../../user-profile/slices/user.slice';
import { deactivateAccount } from '../../user-profile/thunk-apis/deactivate-account';
import { AppDispatch } from '../../app-store/app-store';
import { thunkString } from '../../user-profile/thunk-apis/thunk-string';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface DeactivateModalProps {
	show: boolean;
	toggleModal: () => void;
}

export const DeactivateModal: React.FC<DeactivateModalProps> = ({
	show,
	toggleModal,
}) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { logOut } = useLogout();
	const { loadingStatus } = useSelector(getUserState);

	const {
		control,
		formState: { errors: error },
		handleSubmit,
	} = useForm({
		defaultValues: {
			deactivateReason: '',
		},
	});

	const handleSubmitForm = async (data: { deactivateReason: string }) => {
		try {
			const response = await dispatch(deactivateAccount(data));

			if (response.type === `${thunkString.deactivateAccount}/fulfilled`) {
				logOut();
				navigate(routePaths.auth.login, {
					state: {
						isDeactivated: 'deactivated',
					},
				});
			} else {
				toast.error('Something went wrong while deactivating your account');
			}
		} catch (error) {
			throw new Error(error as string);
		}
	};

	return (
		<Modal
			isOpen={show}
			toggleModal={toggleModal}
			modalContentStyle={{
				width: '50%',
			}}
		>
			{/* HEADER */}
			<Box
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Box
					style={{
						fontSize: '1.5rem',
						fontWeight: 600,
						color: theme.palettes.colors.darkBlue[0],
					}}
				>
					Deactivate Account
				</Box>
				<IconButton bg="transparent" onClick={toggleModal}>
					<Icon
						component={Icons.CrossIcon}
						height="1rem"
						width="1rem"
						color={theme.palettes.colors.darkBlue[0]}
					/>
				</IconButton>
			</Box>

			{/* BODY */}
			<Box mt={'1rem'}>
				<Paragraph type="p2">
					Sorry to see you go{' '}
					<span role="img" aria-label="sad-emoji">
						😞
					</span>
				</Paragraph>

				{/* FORM */}
				<Box as={'form'} onSubmit={handleSubmit(handleSubmitForm)}>
					<FormElements.Label withAsterisk>
						Reason to deactivate
					</FormElements.Label>
					<Controller
						name="deactivateReason"
						control={control}
						render={({ field: { name, onChange, value, onBlur } }) => (
							<Box
								mt={'0.5rem'}
								bg={
									error.deactivateReason?.message
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
									placeholder="Enter your reason here..."
									rows={3}
								/>
							</Box>
						)}
						rules={{
							required: 'Please enter a reason to deactivate your account',
						}}
					/>
					{error.deactivateReason?.message && (
						<Box
							style={{
								fontSize: '0.875rem',
							}}
							color={theme.palettes.error[1]}
						>
							{error.deactivateReason?.message}
						</Box>
					)}
					<Paragraph type="p3">
						Your account will be deactivated in two weeks. You will be notified
						via an email from Kwicon to your registered email ID. You can always
						revert back, simply login and activate your account.
					</Paragraph>
					<Box
						mt={'1rem'}
						style={{
							display: 'flex',
							justifyContent: 'flex-end',
							gap: '1rem',
						}}
					>
						<Button
							onClick={toggleModal}
							type="button"
							variant="unstyled"
							style={{
								padding: '0.75rem 2rem',
								background: 'rgba(249, 249, 249, 1)',
								color: 'rgba(70, 75, 128, 1)',
								borderRadius: theme.borderRadius.pill,
							}}
						>
							Cancel
						</Button>
						<Button
							loading={loadingStatus === 'loading'}
							type="submit"
							variant="unstyled"
							style={{
								padding: '0.75rem 2rem',
								borderRadius: theme.borderRadius.pill,
								background: theme.palettes.error[1] as string,
								color: theme.palettes.colors.white as string,
							}}
						>
							Deactivate
						</Button>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};

export default DeactivateModal;
