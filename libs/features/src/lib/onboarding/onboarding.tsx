import { routePaths } from '@kwicon/commons';
import { Box } from '@kwicon/kwicon-ui';
import { lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppDispatch } from '../app-store/app-store';
import { createUserQB } from '../quickblox/thunk-apis/quickblox';
import { OnboardingFooter } from './components/onboarding-footer';
import { OnboardingLayout } from './components/onboarding-layout';
import { OnboardingSelectExpertise } from './components/onboarding-select-expertise';
import { getOnboardingState } from './slices/onboarding.slice';
import { getUser } from './thunk-apis/get-user';
import { setUserProfileForm } from './thunk-apis/set-user-profile-form';
import { thunkString } from './thunk-apis/thunk-string';

// lazy importing the components
const OnBoardingForm = lazy(() => import('./components/onboarding-form'));
const OnBoardingSelectInterest = lazy(
	() => import('./components/onboarding-select-interest'),
);

export function Onboarding() {
	//* redux store
	const dispatch = useDispatch<AppDispatch>();
	const { onboardingUserData, loadingStatus, user } =
		useSelector(getOnboardingState);

	const location = useLocation();
	const stateStep = location.state?.stateStep;
	const currentStateStep = location.state?.currentStateStep;
	const navigate = useNavigate();

	const [isChangeRole, setIsChangeRole] = useState(
		location?.pathname?.includes('change-role') ?? false,
	);

	//* step related states
	const [totalSteps, setTotalSteps] = useState<number>(0);
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [stepValue, setStepValue] = useState<number>(0);
	const [stepComponentsForRole, setStepComponentsForRole] = useState<
		| {
				showFor: string[];
				component: JSX.Element;
				order?: number;
		  }[]
		| null
	>(null);

	//* Getting the user
	useEffect(() => {
		handleGetUser();
	}, []);

	// previous step functionality from onboarding profile summary
	useEffect(() => {
		if (stateStep) {
			setCurrentStep(stateStep);
			setStepValue((100 / totalSteps) * stateStep);
		}

		if (currentStateStep) {
			setCurrentStep(currentStateStep);
			setStepValue((100 / totalSteps) * currentStateStep);
		}
	}, [stateStep, totalSteps, currentStateStep]);

	// get user function
	const handleGetUser = async () => {
		try {
			await dispatch(getUser());
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const handleSetStepper = useCallback((): void => {
		setCurrentStep(prevState => prevState + 1);
		// dynamically update the step value. If total step is two, then the step value will be 50, 100. If total step is 3 then the step value will be 33.33, 66.66, 100
		setStepValue(prevState => prevState + 100 / totalSteps);
	}, [totalSteps]);

	//* Handle the next step
	const handleNextStep = useCallback(async () => {
		if (currentStep === 2) {
			if (user?.role !== 'advisor') {
				if (onboardingUserData?.interests !== undefined) {
					// if onboardingUserData.interests is mimimum 1 then it will go to the next step otherwise it show a toast message
					if (onboardingUserData?.interests?.length >= 1) {
						try {
							const response = await dispatch(
								setUserProfileForm({
									interests: onboardingUserData.interests,
								}),
							);
							if (
								response.type === `${thunkString.setUserProfileForm}/fulfilled`
							) {
								if (currentStep === totalSteps) {
									// console.log('QB student');
									// we are sending userId, profile picture and profession, we can access customData in the same order by dividing the string

									if (isChangeRole) {
										navigate(routePaths.settings.root);
										toast.success('Role changed');
									} else {
										const responseQB = user?.quickbloxUserId
											? null
											: await dispatch(
													createUserQB({
														email: user?.email,
														login: user?.email,
														full_name:
															onboardingUserData?.firstName +
															' ' +
															onboardingUserData?.lastName,
														password: user?.id,
														custom_data: `${user?.id},${user?.profilePicture},${user?.profession}`,
													}),
											  );
										const response = await dispatch(
											setUserProfileForm({
												quickbloxUserId:
													responseQB?.payload?.id || user?.quickbloxUserId,
												isAccountCompleted: true,
											}),
										);
										if (
											response.type ===
											`${thunkString.setUserProfileForm}/fulfilled`
										) {
											navigate(routePaths.root.home);
										}
									}
								} else {
									handleSetStepper();
								}
							}
						} catch (error) {
							throw new Error(error as string);
						}
					} else {
						toast.error('Please select at least one interest');
						return;
					}
				} else {
					toast.error('Please select at least one interest');
					return;
				}
			} else {
				if (onboardingUserData?.expertise !== undefined) {
					// if onboardingUserData?.expertise?.length minium should 1 then it will go to the next step otherwise it show a toast message
					if (onboardingUserData?.expertise?.length >= 1) {
						try {
							const response = await dispatch(
								setUserProfileForm({
									specialization: onboardingUserData.expertise,
								}),
							);
							if (
								response.type === `${thunkString.setUserProfileForm}/fulfilled`
							) {
								if (currentStep === totalSteps) {
									// console.log('QB advisor');
									// we are sending userId, profile picture and profession, we can access customData in the same order by dividing the string
									if (isChangeRole) {
										navigate(routePaths.settings.root);
										toast.success('Role changed');
									} else {
										const responseQB = user?.quickbloxUserId
											? null
											: await dispatch(
													createUserQB({
														email: user?.email,
														login: user?.email,
														full_name:
															onboardingUserData?.firstName +
															' ' +
															onboardingUserData?.lastName,
														password: user?.id,
														custom_data: `${user?.id},${user?.profilePicture},${user?.profession}`,
													}),
											  );

										const response = await dispatch(
											setUserProfileForm({
												quickbloxUserId:
													responseQB?.payload?.id || user?.quickbloxUserId,
												isAccountCompleted: true,
											}),
										);
										if (
											response.type ===
											`${thunkString.setUserProfileForm}/fulfilled`
										) {
											navigate(routePaths.root.home);
										}
									}
								} else {
									handleSetStepper();
								}
							}
						} catch (error) {
							throw new Error(error as string);
						}
					} else {
						toast.error('Please select at least one expertise');
						return;
					}
				} else {
					toast.error('Please select at least one expertise');
					return;
				}
			}
		} else if (currentStep === 3) {
			if (onboardingUserData?.expertise !== undefined) {
				try {
					const response = await dispatch(
						setUserProfileForm({
							specialization: onboardingUserData.expertise,
						}),
					);
					if (response.type === `${thunkString.setUserProfileForm}/fulfilled`) {
						if (currentStep === totalSteps) {
							// console.log('QB senior student');
							// we are sending userId, profile picture and profession, we can access custom data in the same order by dividing the string
							if (isChangeRole) {
								navigate(routePaths.settings.root);
								toast.success('Role changed');
							} else {
								const responseQB = user?.quickbloxUserId
									? null
									: await dispatch(
											createUserQB({
												email: user?.email,
												login: user?.email,
												full_name:
													onboardingUserData?.firstName +
													' ' +
													onboardingUserData?.lastName,
												password: user?.id,
												custom_data: `${user?.id},${user?.profilePicture},${user?.profession}`,
											}),
									  );

								const response = await dispatch(
									setUserProfileForm({
										quickbloxUserId:
											responseQB?.payload?.id || user?.quickbloxUserId,
										isAccountCompleted: true,
									}),
								);
								if (
									response.type ===
									`${thunkString.setUserProfileForm}/fulfilled`
								) {
									navigate(routePaths.root.home);
								}
							}
						} else {
							handleSetStepper();
						}
					}
				} catch (error) {
					throw new Error(error as string);
				}
			}
		} else {
			handleSetStepper();
		}
	}, [
		currentStep,
		handleSetStepper,
		totalSteps,
		navigate,
		dispatch,
		user?.role,
		onboardingUserData?.interests,
		onboardingUserData?.expertise,
	]);

	//* Handle the previous step
	const handlePreviousStep = useCallback(() => {
		setCurrentStep(prevState => prevState - 1);
		setStepValue(prevState => prevState - 100 / totalSteps);
	}, [totalSteps]);

	//* set step value dynamically according to the role
	useEffect(() => {
		if (onboardingUserData.role === 'student') {
			setStepValue(100 / 2);
		}
		if (onboardingUserData.role === 'advisor') {
			setStepValue(100 / 2);
		}
		if (onboardingUserData.role === 'senior student') {
			setStepValue(100 / 3);
		}
	}, [onboardingUserData.role]);

	//* step components
	const stepComponents = useMemo(
		() => [
			{
				showFor: ['student', 'advisor', 'senior student'],
				component: <OnBoardingForm handleNextStep={handleNextStep} />,
			},
			{
				showFor: ['student', 'senior student'],
				component: <OnBoardingSelectInterest />,
			},
			{
				showFor: ['advisor', 'senior student'],
				component: <OnboardingSelectExpertise />,
			},
		],
		[handleNextStep],
	);

	// if the user role is changed then set the total steps and step components
	useEffect(() => {
		// if the user role is student then filter the step components and set total steps as the length of the filtered array
		if (onboardingUserData.role === 'student') {
			const filteredComponents = stepComponents
				.filter(component => component.showFor.includes('student'))
				.map((component, index) => {
					return {
						...component,
						order: index + 1,
					};
				});
			setStepComponentsForRole(filteredComponents);
			// setStepValue(100 / filteredComponents.length);
			setTotalSteps(filteredComponents.length);
			// set to local storage
			sessionStorage.setItem(
				'totalSteps',
				JSON.stringify(filteredComponents.length),
			);
		}

		// Similarly if the user role is advisor
		if (onboardingUserData.role === 'advisor') {
			const filteredComponents = stepComponents
				.filter(component => component.showFor.includes('advisor'))
				.map((component, index) => {
					return {
						...component,
						order: index + 1,
					};
				});
			setStepComponentsForRole(filteredComponents);
			// setStepValue(100 / filteredComponents.length);
			setTotalSteps(filteredComponents.length); // set to local storage
			sessionStorage.setItem(
				'totalSteps',
				JSON.stringify(filteredComponents.length),
			);
		}

		// for senior students
		if (onboardingUserData.role === 'senior student') {
			const filteredComponents = stepComponents
				.filter(component => component.showFor.includes('senior student'))
				.map((component, index) => {
					return {
						...component,
						order: index + 1,
					};
				});
			setStepComponentsForRole(filteredComponents);
			// setStepValue(100 / filteredComponents.length);
			setTotalSteps(filteredComponents.length); // set to local storage
			sessionStorage.setItem(
				'totalSteps',
				JSON.stringify(filteredComponents.length),
			);
		}
	}, [onboardingUserData.role, stepComponents]);

	return (
		<OnboardingLayout
			currentStep={currentStep}
			stepValue={stepValue}
			handleNextStep={handleNextStep}
			handlePreviousStep={handlePreviousStep}
			totalSteps={totalSteps}
			formId="user-form"
			footerComponent={
				<OnboardingFooter
					loadingStatus={loadingStatus}
					footerButtonType={currentStep === 1 ? 'submit' : 'button'}
					currentStep={currentStep}
					totalSteps={totalSteps}
					withPreviousButton={currentStep !== 1}
					handleNext={handleNextStep}
					handlePrevious={handlePreviousStep}
				/>
			}
		>
			{
				// show according to the selected role and the current step
				stepComponentsForRole &&
					stepComponentsForRole.map((step, index) => {
						if (
							step.showFor.includes(onboardingUserData.role as string) &&
							step?.order === currentStep
						) {
							return <Box key={index}>{step.component}</Box>;
						}
						return null;
					})
			}
		</OnboardingLayout>
	);
}

export default Onboarding;
