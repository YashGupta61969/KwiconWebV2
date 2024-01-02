import { useAuth0 } from '@auth0/auth0-react';
import { formatTimer, routePaths } from '@kwicon/commons';
import {
	Box,
	Button,
	FormElements,
	Heading,
	Paragraph,
} from '@kwicon/kwicon-ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Otp from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import { authActions, getAuthState } from '../slices/auth.slice';
import { getLoginOTP } from '../thunk-apis/get-login-otp';
import { socialLogin } from '../thunk-apis/social-login';
import { thunkString } from '../thunk-apis/thunk-string';
import { verifyLoginOTP } from '../thunk-apis/verify-login-otp';
import { Controller, useForm } from 'react-hook-form';
import { QBInit } from '../../quickblox/thunk-apis/quickblox';

export interface AuthBoxProps {
	setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthBox = ({ setLoader }: AuthBoxProps) => {
	//* Redux state
	const getState = useSelector(getAuthState);
	const error = getState.error && getState.error;
	const message = getState.data?.message && getState.data?.message;
	const otpError = getState.otpError && getState.otpError;
	const user = getState.data?.user && getState.data?.user;

	//* hooks
	const dispatch = useDispatch<AppDispatch>();
	const {
		loginWithPopup,
		user: auth0User,
		isLoading,
		isAuthenticated,
	} = useAuth0();

	const theme = useTheme();
	const navigate = useNavigate();
	const location = useLocation();

	//* Local state
	const [otp, setOtp] = useState<string>('');
	const [googleLoader, setGoogleLoader] = useState<boolean>(false);
	// const [errors, setErrors] = useState<{ email: string; otp: string }>({
	// 	email: '',
	// 	otp: '',
	// });
	const [isOtpReceived, setIsOtpReceived] = useState<boolean>(false);
	const [otpTimer, setOtpTimer] = useState<number>(300); // 5 minutes
	const [loginError, setLoginError] = useState<string | null>(null);

	const {
		formState: { errors },
		handleSubmit,
		control,
		getValues,
		watch,
	} = useForm({
		defaultValues: {
			email: '',
			otp: '',
		},
	});

	useEffect(() => {
		if (loginError != null) setLoginError(null);
	}, [watch('email')]);

	//* monitor if otp is received
	useEffect(() => {
		if (error === null && message) {
			setIsOtpReceived(true);

			//* start the otp count timer
			otpTimerHandler();
		}
	}, [error, message]);

	useEffect(() => {
		if (isAuthenticated && location.state?.isDeactivated !== 'deactivated') {
			setLoader(true);
			handleAuthGoogle();
		}
	}, [isAuthenticated, location.state?.isDeactivated, setLoader]);

	const handleAuthGoogle = async () => {
		const response = await dispatch(
			socialLogin({
				userId: auth0User?.sub as string,
				type: 'google',
			}),
		);

		if (response.type === `${thunkString.socialLogin}/fulfilled`) {
			setGoogleLoader(false);
			//* navigating
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (response?.payload?.user?.isAccountCompleted) {
				location.state?.from
					? navigate(location.state.from)
					: navigate(routePaths.root.home);
			} else {
				navigate(routePaths.onboarding.selectRole);
			}
		}
	};

	// OTP count down timer
	const otpTimerHandler = () => {
		setOtpTimer(300);
		const interval = setInterval(() => {
			setOtpTimer(prevTimer => {
				if (prevTimer === 0) {
					clearInterval(interval);
					return 0;
				}
				return prevTimer - 1;
			});
		}, 1000);
		return () => clearInterval(interval);
	};

	// resend otp handler
	const resendOTP = async () => {
		// emty the otp code
		setOtp('');

		// reset the otp error message
		dispatch(authActions.setOtpError(null));
		try {
			const response = await dispatch(
				getLoginOTP({ email: getValues('email') }),
			);
			if (response.type === `${thunkString.getLoginOTP}/fulfilled`) {
				setIsOtpReceived(true);

				// reset the otp timer
				otpTimerHandler();
			}

			if (response.type === `${thunkString.getLoginOTP}/rejected`) {
				setLoginError(response?.payload?.response?.data?.message || '');
			}
		} catch (error) {
			throw new Error(error as string);
		}
	};

	//* form submit handler
	const onSubmit = useCallback(
		async (data: { email: string; otp: string }) => {
			//* if otp is received
			if (isOtpReceived) {
				if (data.otp.length > 0) {
					try {
						const response = await dispatch(
							verifyLoginOTP({
								email: data.email,
								otp: data.otp,
							}),
						);
						if (response.type === `${thunkString.verifyLoginOTP}/fulfilled`) {
							//* navigating
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment

							dispatch(QBInit());

							// @ts-ignore
							if (response.payload?.user?.isAccountCompleted) {
								location.state?.from
									? navigate(location.state.from)
									: navigate(routePaths.root.home);
							} else {
								navigate(routePaths.onboarding.selectRole);
							}
						}
					} catch (error) {
						throw new Error(error as string);
					}
				}
			} else {
				//* Before otp is received
				try {
					const response = await dispatch(
						getLoginOTP({
							email: data.email,
						}),
					);

					if (response.type === `${thunkString.getLoginOTP}/rejected`) {
						setLoginError(response?.payload?.response?.data?.message || '');
					}
				} catch (error) {
					throw new Error(error as string);
				}
			}
		},
		[dispatch, isOtpReceived, navigate],
	);

	//* email on change handler
	// const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	setValue(event.target.value);
	// };

	//* Google login handler
	const handleLoginWithGoogle = (): void => {
		loginWithPopup();
	};

	// console.log(location.state?.isDeactivated);

	return (
		<Box as="form" onSubmit={handleSubmit(onSubmit)} width={'30%'} pt={'1rem'}>
			<Heading
				style={{
					display: 'block',
				}}
				border="1px solid red"
				fs={'2.5rem'}
				type="h2"
			>
				Login
			</Heading>

			{/* Form Elements */}
			<Box mt="3.5rem">
				<FormElements.Label
					style={{
						marginBottom: '0.75rem',
						display: 'block',
					}}
				>
					Email
				</FormElements.Label>
				<Controller
					name="email"
					control={control}
					render={({ field: { name, onChange, value, onBlur } }) => (
						<FormElements.Input
							name={name}
							type="text"
							value={value}
							placeholder="Enter your email"
							onChange={onChange}
							onBlur={onBlur}
							disabled={isOtpReceived}
							error={errors.email?.message}
						/>
					)}
					rules={{
						required: 'Email is required',
						validate: value => {
							if (value.length > 0) {
								return (
									/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
										value,
									) || 'Please enter a valid email address'
								);
							} else {
								return true;
							}
						},
					}}
				/>

				{errors.email?.message && (
					<Box
						style={{
							fontSize: '0.875rem',
						}}
						color={theme.palettes.error[1]}
						mt={'0.5rem'}
						mb={'1rem'}
					>
						{errors.email.message}
					</Box>
				)}
			</Box>
			{/* -- Verification Box -- */}
			{isOtpReceived ? (
				<Box my={'1rem'}>
					<FormElements.Label>Verification Code</FormElements.Label>
					<Controller
						name="otp"
						control={control}
						render={({ field: { name, onChange, value, onBlur } }) => (
							<Otp
								value={value}
								onChange={onChange}
								numInputs={4}
								renderInput={props => (
									<input
										{...props}
										name={name}
										onBlur={onBlur}
										style={{
											width: '5%',
											backgroundColor: !otpError
												? (theme.palettes.colors.lightGray[0] as string)
												: (theme.palettes.error[2] as string),
											color: !otpError
												? (theme.palettes.colors.black as string)
												: (theme.palettes.error[1] as string),
											outline: 'none',
											marginRight: '1rem',
											border: `1px solid ${theme.palettes.colors.lightBlue[1]}`,
											padding: '1rem',
											borderRadius: theme.borderRadius.regular,
											fontSize: theme.typography.fontSize,
											fontWeight: 500,
											textAlign: 'center' as const,
										}}
									/>
								)}
								renderSeparator={null}
								containerStyle={{
									width: '100%',
									marginTop: '1rem',
								}}
							/>
						)}
						rules={{
							required: 'OTP is required',
						}}
					/>

					{errors.otp?.message && (
						<Box
							style={{
								fontSize: '0.875rem',
							}}
							color={theme.palettes.error[1]}
							mt={'0.5rem'}
							mb={'1rem'}
						>
							{errors.otp.message}
						</Box>
					)}
				</Box>
			) : null}
			{otpError && (
				<Box
					style={{
						fontSize: '0.875rem',
					}}
					color={theme.palettes.error[1]}
					mt={'0.5rem'}
					mb={'1rem'}
				>
					Invalid code. Please check your spam or tap on resend.
				</Box>
			)}

			{/* -- OTP Count Down Timer -- */}
			{isOtpReceived && (
				<Box>
					{otpTimer > 0 ? (
						<Box
							as="p"
							style={{
								fontSize: '0.875rem',
							}}
							color={theme.palettes.colors.black[1]}
						>
							Code expires in
							<Box
								as="span"
								style={{
									color: theme.palettes.error[1],
									fontWeight: 500,
									marginLeft: '0.5rem',
								}}
							>
								{formatTimer(otpTimer)}
							</Box>
						</Box>
					) : (
						<Box
							as={'p'}
							style={{
								fontSize: '0.875rem',
							}}
							color={theme.palettes.error[1]}
						>
							Code expired!
						</Box>
					)}
				</Box>
			)}
			{loginError && (
				<Paragraph
					style={{
						color: theme.palettes.error[1],
					}}
				>
					{loginError}
				</Paragraph>
			)}

			{/* Buttons */}
			<Box mt={'1.5rem'}>
				{/* -- Show if before received OTP */}
				{!isOtpReceived ? (
					<Box>
						<Button
							loading={getState.loadingStatus === 'loading'}
							type="submit"
							width={'full'}
							variant="primary"
						>
							Get OTP
						</Button>
						<Box
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '1rem',
							}}
							my={'2.5rem'}
						>
							<Box bg={'rgba(40, 53, 187, 0.08)'} height={'1px'} width="100%">
								&nbsp;
							</Box>
							<Box>or</Box>
							<Box bg={'rgba(40, 53, 187, 0.08)'} height={'1px'} width="100%">
								&nbsp;
							</Box>
						</Box>
						<Button
							onClick={handleLoginWithGoogle}
							style={{
								gap: '0.5rem',
							}}
							width={'full'}
							variant="tertiary"
							loading={isLoading}
						>
							<Box>
								<FcGoogle />
							</Box>
							<Box>Continue with Google</Box>
						</Button>
					</Box>
				) : (
					<>
						<Button
							loading={getState.loadingStatus === 'loading'}
							mb={'1.5rem'}
							width={'full'}
							variant="tertiary"
							disabled={otpTimer > 0 ? true : false}
							onClick={resendOTP}
						>
							Resend Code
						</Button>

						<Button
							loading={getState.otpLoadingStatus === 'loading'}
							type="submit"
							width={'full'}
							variant="primary"
							disabled={otpTimer > 0 ? false : true}
						>
							Verify Code
						</Button>
					</>
				)}
			</Box>
		</Box>
	);
};
