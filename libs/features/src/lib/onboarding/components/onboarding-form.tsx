/* eslint-disable react/jsx-no-useless-fragment */
import {
	Icons,
	convertJSONToFormData,
	storageKeys,
	useGetMedia,
} from '@kwicon/commons';
import {
	ImageCropper,
	ProfilePictureEditor,
	UserForm,
} from '@kwicon/components';
import { Box, Heading, Paragraph } from '@kwicon/kwicon-ui';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import { deleteProfilePicture } from '../../user-profile/thunk-apis/delete-profile-picture';
import { UserDataEntry } from '../interfaces/onboarding-interfaces';
import styles from '../onboarding.module.css';
import {
	getOnboardingState,
	onboardingActions,
} from '../slices/onboarding.slice';
import { getGrades } from '../thunk-apis/get-grades';
import { getUser } from '../thunk-apis/get-user';
import { setUserProfileCV } from '../thunk-apis/set-user-profile-cv';
import { setUserProfileForm } from '../thunk-apis/set-user-profile-form';
import { setUserProfilePicture } from '../thunk-apis/set-user-profile-picture';
import { thunkString } from '../thunk-apis/thunk-string';
import { useLocation } from 'react-router-dom';

export interface OnBoardingFormProps {
	handleNextStep: () => void;
}

export function OnBoardingForm({ handleNextStep }: OnBoardingFormProps) {
	const onboardingUserDataSession = sessionStorage.getItem(
		storageKeys.KEY_OF_ONBOARDING_USER_DATA,
	);

	const theme = useTheme();
	const location = useLocation();
	const dispatch = useDispatch<AppDispatch>();
	const { onboardingUserData, user, allGrades, loadingStatus } =
		useSelector(getOnboardingState);
	const {
		formState: { errors: error },
		handleSubmit,
		control,
		setValue,
	} = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			profession: '',
			alumniOf: '',
			linkedInUrl: '',
			phoneNumber: '',
			schoolName: '',
			grade: '',
			cvFile: '',
			about: '',
		},
	});
	const [uploadedImageFile, setUploadedImageFile] = useState<
		File | undefined | null
	>(null);
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const [previewCV, setPreviewCV] = useState<
		| File
		| {
				name: string;
		  }
	>();
	const [userGrade, setUserGrade] = useState<string>('');
	const [isChangeRole, setIsChangeRole] = useState<boolean>(
		location?.pathname?.includes('change-role') ?? false,
	);

	// get media hook
	const { media } = useGetMedia(user?.profilePicture as string);

	// Preview image with user existing profile picture
	useEffect(() => {
		setPreviewImage(media);
	}, [media]);

	// handle trigger upload image function on click on the icon button
	const onClickUpload = () => {
		const input = document.getElementById('upload-image') as HTMLInputElement;
		input.click();
	};
	const onClickUploadCV = () => {
		const input = document.getElementById('upload-cv') as HTMLInputElement;
		input.click();
	};

	//** Event Handlers **/
	// handle image upload
	const handleImageUpload = (e: any) => {
		const file = e.target.files[0];
		if (e.target.files && e.target.files[0]) {
			const reader = new FileReader();
			reader.addEventListener('load', () =>
				setPreviewImage(reader.result?.toString() || ''),
			);
			reader.readAsDataURL(e.target.files[0]);
			// reader.readAsDataURL(file);
			// reader.onloadend = () => {
			// 	setPreviewImage(reader.result as string);
			// };
			setUploadedImageFile(file);
		}
	};

	// handle cv upload
	const handleCVUpload = useCallback((e: any) => {
		const file = e.target.files[0];
		setPreviewCV(file);
	}, []);

	// handle delete cv
	const handleRemoveCV = (e: any) => {
		e.preventDefault();
		setPreviewCV(undefined);
		// dispatch(deleteUserProfileCV());
	};

	// handle get the grades
	const handleGetGrades = async () => {
		try {
			await dispatch(getGrades());
		} catch (error) {
			throw new Error(error as string);
		}
	};

	useEffect(() => {
		handleGetUser();
	}, []);

	//* Effects
	useEffect(() => {
		if (user && user !== null) {
			setValue('firstName', user?.name?.split(' ')?.[0] ?? '');
			setValue('lastName', user?.name?.split(' ')?.[1] ?? '');
			setValue('profession', user?.profession ?? '');
			setValue('alumniOf', user?.schoolName ?? '');
			setValue('linkedInUrl', user?.linkedInURL ?? '');
			setValue('phoneNumber', user?.phone ?? '');
			setValue('schoolName', user?.schoolName ?? '');
			setValue('about', user?.about ?? '');
			setValue('profession', user?.profession ?? '');
			setValue('grade', user?.grade ?? '');
		}
	}, [dispatch, setValue, onboardingUserDataSession, user]);

	useEffect(() => {
		handleGetGrades();
	}, []);

	//* form submit handler
	const handleFormSubmit = useCallback(
		async (data: UserDataEntry) => {
			if (data) {
				dispatch(
					onboardingActions.setSelectOnboardingUserData({
						...onboardingUserData,
						firstName: data.firstName as string,
						lastName: data.lastName as string,
						profession: data.profession as string,
						about: data.about as string,
						schoolName: data.alumniOf as string,
						profilePicture: onboardingUserData.profilePicture as string,
						grade: userGrade,
					}),
				);
				// convert json to form data
				const imageInFormData = convertJSONToFormData({
					image: uploadedImageFile as File,
				});
				const cvInFormData = convertJSONToFormData({
					cv: previewCV as File,
				});

				// call api to save to the database
				try {
					const response = await dispatch(
						setUserProfileForm({
							name: `${data.firstName} ${data.lastName}`,
							schoolName: data.schoolName as string,
							profession: data.profession as string,
							grade: userGrade,
							linkedInURL: (data.linkedInUrl as string) ?? null,
							about: (data.about as string) ?? null,
						}),
					);
					if (uploadedImageFile) {
						await dispatch(setUserProfilePicture(imageInFormData));
					}
					if (previewCV) {
						await dispatch(setUserProfileCV(cvInFormData));
					}
					if (response.type === `${thunkString.setUserProfileForm}/fulfilled`) {
						handleNextStep();
					}
				} catch (error) {
					throw new Error(error as string);
				}
			}
		},
		[
			dispatch,
			previewCV,
			onboardingUserData,
			uploadedImageFile,
			handleNextStep,
			userGrade,
		],
	);

	// handle get user
	const handleGetUser = async () => {
		try {
			await dispatch(getUser());
		} catch (error) {
			throw new Error(error as string);
		}
	};
	// handle delete image
	const handleRemoveImage = async () => {
		setPreviewImage(null);
		setUploadedImageFile(null);

		if (user?.profilePicture) {
			try {
				await dispatch(deleteProfilePicture());
			} catch (error) {
				throw new Error(error as string);
			} finally {
				handleGetUser();
			}
		}
	};

	return (
		<Box as="section" width={'100%'}>
			{/* -- TOP section -- */}
			<Box as="section" mt={'2rem'}>
				<Box as="article">
					<Heading type="h2" lh={0.5}>
						{isChangeRole ? 'Basic Details.' : 'Welcome!'}
					</Heading>
					<Paragraph type="p1" lh={1}>
						{isChangeRole
							? 'Please check if this information is up to date.'
							: `Let's have a quick introduction`}
					</Paragraph>
				</Box>
			</Box>

			{/* -- Content -- */}
			<Box
				as="section"
				width={'100%'}
				mt={'2.5rem'}
				style={{
					display: 'flex',
					gap: '2.5rem',
				}}
				className={styles['onboarding-container__content']}
			>
				<Box mt={'0.5rem'}>
					<ProfilePictureEditor
						previewImage={previewImage as string}
						setPreviewImage={setPreviewImage}
						setUploadedImageFile={setUploadedImageFile}
						onChange={handleImageUpload}
						handleRemoveImage={handleRemoveImage}
						userProfilePicture={user?.profilePicture}
						avatarSize="large"
						uploadIconSize="8rem"
						uploadIcon={<Icons.CameraAdd />}
					/>
				</Box>
				<UserForm
					handleSubmit={handleSubmit}
					onSubmit={handleFormSubmit}
					control={control}
					error={error}
					formId={'user-form'}
					user={user}
					previewCV={previewCV}
					onClickUploadCV={onClickUploadCV}
					handleCVUpload={handleCVUpload}
					handleRemoveCV={handleRemoveCV}
					allGrades={allGrades}
					userGrade={userGrade}
					setUserGrade={setUserGrade}
					setValue={setValue}
				/>
			</Box>
			{/* <Box
				boxShadow={theme.shadows.regular}
				className={styles['onboarding-container__footer']}
			>
				<Box
					py={'1.5rem'}
					style={{
						justifyContent: 'space-between',
					}}
					className={styles['onboarding-container__footer-inner']}
				>
					<Box>&nbsp;</Box>
					<Button
						form={'user-form'}
						type={'submit'}
						width={'20%'}
						variant="primary"
						loading={loadingStatus === 'loading' ? true : false}
					>
						Next
					</Button>
				</Box>
			</Box> */}
		</Box>
	);
}

export default OnBoardingForm;
