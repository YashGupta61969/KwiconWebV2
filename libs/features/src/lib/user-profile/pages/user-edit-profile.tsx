/* eslint-disable react/jsx-no-useless-fragment */
import {
	convertJSONToFormData,
	routePaths,
	useGetMedia,
	useRefScrollTop,
} from '@kwicon/commons';
import { ProfilePictureEditor, YearPicker } from '@kwicon/components';
import {
	Box,
	Breadcrumb,
	Button,
	FormElements,
	Grid,
	GridItem,
	Heading,
	Loaders,
	Modal,
} from '@kwicon/kwicon-ui';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { StylesConfig } from 'react-select';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import { deleteUserProfileCV } from '../../onboarding/thunk-apis/delete-user-profile-cv';
import { getUser } from '../../onboarding/thunk-apis/get-user';
import { setUserProfileCV } from '../../onboarding/thunk-apis/set-user-profile-cv';
import { setUserProfileForm } from '../../onboarding/thunk-apis/set-user-profile-form';
import { setUserProfilePicture } from '../../onboarding/thunk-apis/set-user-profile-picture';
import { thunkString } from '../../onboarding/thunk-apis/thunk-string';
import {
	ICountryCode,
	UserUpdateForm,
} from '../interfaces/user-profile-interfaces';
import { getUserState, userActions } from '../slices/user.slice';
import { addUserAddress } from '../thunk-apis/add-user-address';
import { deleteProfilePicture } from '../thunk-apis/delete-profile-picture';
import { getCoutries } from '../thunk-apis/get-countries';
import { updateUserAddress } from '../thunk-apis/update-user-address';
import styles from '../user.module.css';

export function UserEditProfile() {
	// Local State
	const [isCountryCodeModalShow, setIsCountryCodeModalshow] =
		useState<boolean>(false);
	const [searchCountryCodeTerm, setSearchCountryCodeTerm] =
		useState<string>('');

	// redux store
	const dispatch = useDispatch<AppDispatch>();
	const { user, loadingStatus, countryCodes } = useSelector(getUserState);
	const [updateLoading, setUpdateLoading] = useState<boolean>(false);

	// hooks
	const navigate = useNavigate();
	const refToTop = useRefScrollTop();

	//* Getting the user
	useEffect(() => {
		handleGetUser();
	}, []);

	// get media hook
	const { media } = useGetMedia(user?.profilePicture as string);

	// toggole Country code modal
	const toggoleCountryCodeModal = () => {
		setSearchCountryCodeTerm('');
		setIsCountryCodeModalshow(!isCountryCodeModalShow);
	};

	// get user function
	const handleGetUser = async () => {
		try {
			await dispatch(getUser());
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const theme = useTheme();

	// Locals states
	const birthYearRef = useRef(null);
	const {
		formState: { errors: error },
		handleSubmit,
		control,
		register,
		setValue,
	} = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			birthYear: '',
			linkedInURL: '',
			phone: { countryCode: '', phoneNumber: '' },
			country: '',
			state: '',
			city: '',
			zipCode: '',
			address: '',
		},
	});
	const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const [previewCV, setPreviewCV] = useState<
		| File
		| {
				name: string;
		  }
	>();

	// Preview image with user existing profile picture
	useEffect(() => {
		setPreviewImage(media);
	}, [media]);

	// get all country codes
	useEffect(() => {
		dispatch(getCoutries());
	}, [dispatch]);

	// set the default value on form
	useEffect(() => {
		const { name, email, birthYear, linkedInURL, cvFile, phone, addressId } =
			user;
		const { country, city, address, zipCode, state } = addressId || {}; // destructure address object.

		setValue('firstName', name ? name?.split(' ')[0] : '');
		setValue('lastName', name ? name?.split(' ')[1] : '');
		setValue('email', email ? (email as string) : '');
		setValue('birthYear', birthYear ? birthYear.toString() : '');
		setValue('linkedInURL', linkedInURL ? linkedInURL : '');
		setPreviewCV({ name: cvFile?.fileName as string });
		setValue(
			'phone.countryCode',
			phone?.countryCode ? phone.countryCode : '+998',
		);
		setValue('phone.phoneNumber', phone?.phoneNumber ? phone.phoneNumber : '');
		setValue('country', country ? country : '');
		setValue('state', state ? state : '');
		setValue('city', city ? city : '');
		setValue('zipCode', zipCode ? zipCode : '');
		setValue('address', address ? address : '');
	}, [setValue, user]);

	// phone number country code handler
	const phoneNumberCountryCodeHanlder = (option: ICountryCode) => {
		setValue(
			'phone.countryCode',
			option.phonecode.startsWith('+')
				? option.phonecode
				: `+${option.phonecode}`,
		);
		setIsCountryCodeModalshow(false);
		setSearchCountryCodeTerm('');
	};

	// Handle Country Code filter
	const handleSearchCountryCode = (e: any) => {
		setSearchCountryCodeTerm(e.target.value);
	};
	const handleCountryCodeFilter = (item: ICountryCode) => {
		const formattedPhoneCode = item.phonecode.startsWith('+')
			? item.phonecode
			: `+${item.phonecode}`;
		if (
			item.name.toLowerCase().includes(searchCountryCodeTerm.toLowerCase()) ||
			formattedPhoneCode.includes(searchCountryCodeTerm)
		) {
			return true;
		} else {
			return false;
		}
	};

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
	const handleImageUpload = useCallback((e: any) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewImage(reader.result as string);
		};

		setUploadedImageFile(file);
	}, []);

	// handle cv upload
	const handleCVUpload = useCallback((e: any) => {
		const file = e.target.files[0];
		setPreviewCV(file);
	}, []);

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
		const input = document.getElementById('upload-image') as HTMLInputElement;

		input.value = '';
	};

	// handle delete cv
	const handleRemoveCV = (e: any) => {
		e.preventDefault();
		setPreviewCV(undefined);
		dispatch(deleteUserProfileCV());
	};

	// handling the year input
	const handleOnChangeYearOptions = (option: any) => {
		if (!option) {
			option = {
				target: birthYearRef,
				value: '',
			};
		}
		setValue('birthYear', option.option.value);
	};

	// select box custom styles
	const selectStyles: StylesConfig = useMemo(() => {
		return {
			control: provided => ({
				...provided,
				'border': 'none',
				'borderRadius': theme.borderRadius.regular,
				'background': theme.palettes.colors.lightGray[0],
				'color': '#EC6E6E',
				'padding': '0.375rem',
				'boxShadow': 'none',
				'::placeholder': {
					color: theme.palettes.colors.darkBlue[1],
				},
				'$:active': {
					border: `1px solid ${theme.palettes.colors.secondary}`,
				},
			}),
			menu: provided => ({
				...provided,
				borderRadius: theme.borderRadius.regular,
				width: '100%',
			}),
			menuList: provided => ({
				...provided,
				padding: 10,
				borderRadius: theme.borderRadius.regular,
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
				'&:hover': {
					backgroundColor: theme.palettes.colors.lightBlue[2],
					cursor: 'pointer',
				},
			}),
		};
	}, []);

	//* form submit handler
	const handleFormSubmit = useCallback(
		async (data: UserUpdateForm) => {
			setUpdateLoading(true);
			if (data) {
				const {
					address,
					city,
					country,
					state,
					zipCode,
					firstName,
					lastName,
					phone,
					birthYear,
					linkedInURL,
				} = data;

				// check if user is already address exist or not
				let addressResponse;
				if (user?.addressId?.id) {
					addressResponse = await dispatch(
						updateUserAddress({
							id: user?.addressId?.id,
							address,
							city,
							country,
							state,
							zipCode,
						}),
					);
				} else {
					const { address, city, country, state, zipCode } = data;
					addressResponse = await dispatch(
						addUserAddress({ address, city, country, state, zipCode }),
					);
				}
				if (addressResponse?.meta?.requestStatus === 'fulfilled') {
					const updateResponse = await dispatch(
						setUserProfileForm({
							name: `${firstName} ${lastName}`,
							phone: {
								countryCode: phone?.countryCode,
								phoneNumber: phone?.phoneNumber,
							},
							birthYear,
							linkedInURL,
						}),
					);

					// convert json to form data
					const imageInFormData = convertJSONToFormData({
						image: uploadedImageFile as File,
					});
					const cvInFormData = convertJSONToFormData({
						cv: previewCV as File,
					});

					// update the profile picture
					if (uploadedImageFile) {
						await dispatch(setUserProfilePicture(imageInFormData));
						dispatch(userActions.changeProfilePicture(''));
					}
					// update the cv
					if (previewCV) {
						const isFilePresent =
							typeof previewCV !== 'undefined' && previewCV instanceof File;
						if (isFilePresent) {
							await dispatch(setUserProfileCV(cvInFormData));
						}
					}

					if (
						updateResponse.type ===
						`${thunkString.setUserProfileForm}/fulfilled`
					) {
						setUpdateLoading(false);
						toast.success('Profile has been updated!');
						navigate(routePaths.user.root);
					}
				}
			}
		},
		[
			dispatch,
			user?.addressId?.id,
			navigate,
			previewCV,
			uploadedImageFile,
			setUpdateLoading,
		],
	);

	// Show the loadings
	if (loadingStatus === 'loading') {
		return <Loaders.Page />;
	}

	return (
		<div ref={refToTop}>
			<Box pb={'4rem'}>
				<Breadcrumb navigate={navigate} />
				<Box>
					<Heading fw={'700'}>Edit Profile</Heading>
				</Box>

				<Box bg={theme.palettes.colors.white as string} p={'1rem'}>
					{/* Profile Picture */}
					<Box
						mt={'0.5rem'}
						style={{
							display: 'flex',
						}}
					>
						<ProfilePictureEditor
							onChange={handleImageUpload}
							previewImage={previewImage as string}
							setPreviewImage={setPreviewImage}
							setUploadedImageFile={setUploadedImageFile}
							handleRemoveImage={handleRemoveImage}
							userProfilePicture={user?.profilePicture as string}
							avatarSize="medium"
							uploadIconSize="5rem"
						/>
					</Box>

					<Box mt={'1rem'} as="form" onSubmit={handleSubmit(handleFormSubmit)}>
						<Box>
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
										<FormElements.Label withAsterisk>
											First Name
										</FormElements.Label>
										<Controller
											name="firstName"
											control={control}
											render={({
												field: { name, onChange, value, onBlur },
											}) => (
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
										<FormElements.Label withAsterisk>
											Last Name
										</FormElements.Label>
										<Controller
											name="lastName"
											control={control}
											render={({
												field: { name, onChange, value, onBlur },
											}) => (
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

								{/* -- Email -- */}
								<GridItem>
									<Box
										style={{
											display: 'flex',
											flexDirection: 'column' as const,
											gap: '0.5rem',
										}}
									>
										<FormElements.Label withAsterisk>Email</FormElements.Label>
										<Controller
											name="email"
											control={control}
											render={({
												field: { name, onChange, value, onBlur },
											}) => (
												<FormElements.Input
													value={value}
													onChange={onChange}
													onBlur={onBlur}
													name={name}
													placeholder="What's your email address?"
													error={error.email?.message}
													disabled
												/>
											)}
											rules={{
												required: 'Email is required',
											}}
										/>
										{/* Error Box */}
										{error.email?.message && (
											<Box
												style={{
													fontSize: '0.875rem',
												}}
												color={theme.palettes.error[1]}
											>
												{error.email?.message}
											</Box>
										)}
									</Box>
								</GridItem>

								{/* -- Birth Year -- */}
								<GridItem>
									<Box
										style={{
											display: 'flex',
											flexDirection: 'column' as const,
											gap: '0.5rem',
										}}
									>
										<FormElements.Label withAsterisk>
											Birth Year
										</FormElements.Label>
										<Controller
											name="birthYear"
											control={control}
											render={({ field: { name, value } }) => {
												return (
													<YearPicker
														ref={birthYearRef}
														name={name}
														onChange={handleOnChangeYearOptions}
														value={value ? { label: value, value } : null}
													/>
												);
											}}
											rules={{ required: 'Birth year is required' }}
										/>
										{/* Error Box */}
										{error.birthYear?.message && (
											<Box
												style={{
													fontSize: '0.875rem',
												}}
												color={theme.palettes.error[1]}
											>
												{error.birthYear?.message}
											</Box>
										)}
									</Box>
								</GridItem>

								{/* -- Mobile No -- */}
								<GridItem>
									<Box
										style={{
											display: 'flex',
											flexDirection: 'column' as const,
											gap: '0.5rem',
										}}
									>
										<FormElements.Label>Mobile No</FormElements.Label>
										<Box style={{ display: 'flex', gap: '1rem' }}>
											<Box>
												{/* <Controller
													name="phone.countryCode"
													control={control}
													render={({ field: { name} }) => (
														<SelectBox
                              name={name}
															variant="select"
															options={countryCodeOptions}
                              defaultValue={countryCodeOptions[0]}
															onChange={phoneNumberCountryCodeHanlder}
															selectStyles={selectStyles}
															isClearable={false}
															isSearchable={false}
                              required
														/>
													)}
													rules={{
														required: 'Phone number country code is required',
													}}
												/> */}
												<Controller
													name="phone.countryCode"
													control={control}
													render={({
														field: { name, onChange, value, onBlur },
													}) => (
														<Button
															onClick={toggoleCountryCodeModal}
															style={{
																border: `1px solid ${theme.palettes.colors.lightBlue[1]}`,
																background: theme.palettes.colors.lightGray[0],
																color: theme.palettes.colors.darkBlue[0],
																padding: '0.9rem 1rem',
																fontWeight: 400,
															}}
															borderRadius={theme.borderRadius.regular}
														>
															{value}
														</Button>
													)}
												/>
												{/* <Button
													onClick={toggoleCountryCodeModal}
													style={{
														border: `1px solid ${theme.palettes.colors.lightBlue[1]}`,
														background: theme.palettes.colors.lightGray[0],
														color: theme.palettes.colors.darkBlue[0],
														padding: '0.9rem 1rem',
														fontWeight: 400,
													}}
													borderRadius={theme.borderRadius.regular}
												>
													+998
												</Button> */}

												{/* Error Box */}
												{error.phone?.countryCode?.message && (
													<Box
														style={{
															fontSize: '0.875rem',
														}}
														color={theme.palettes.error[1]}
													>
														{error.phone.countryCode?.message}
													</Box>
												)}
											</Box>
											<Box style={{ flex: 1 }}>
												<Controller
													name="phone.phoneNumber"
													control={control}
													render={({
														field: { name, onChange, value, onBlur },
													}) => (
														<FormElements.Input
															value={value}
															onChange={onChange}
															onBlur={onBlur}
															name={name}
															type="number"
															placeholder="Enter your phone number"
															error={error.phone?.phoneNumber?.message}
															maxLength={10}
															onInput={e => {
																if (e.target.value.length > e.target.maxLength)
																	e.target.value = e.target.value.slice(
																		0,
																		e.target.maxLength,
																	);
															}}
														/>
													)}
													rules={{
														required: false,
													}}
												/>
											</Box>
										</Box>

										{/* Error Box */}
										{error.phone?.phoneNumber?.message && (
											<Box
												style={{
													fontSize: '0.875rem',
												}}
												color={theme.palettes.error[1]}
											>
												{error.phone.phoneNumber?.message}
											</Box>
										)}
									</Box>
								</GridItem>
								{/* <Box></Box> */}

								{/* -- LinkedIn URL -- */}
								<GridItem>
									<Box
										style={{
											display: 'flex',
											flexDirection: 'column' as const,
											gap: '0.5rem',
										}}
									>
										<FormElements.Label>LinkedIn URL</FormElements.Label>
										<Controller
											name="linkedInURL"
											control={control}
											render={({
												field: { name, onChange, value, onBlur },
											}) => (
												<FormElements.Input
													value={value}
													onChange={onChange}
													onBlur={onBlur}
													name={name}
													placeholder="Share your LinkedIn public URL"
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
										{error.linkedInURL?.message && (
											<Box
												style={{
													fontSize: '0.875rem',
												}}
												color={theme.palettes.error[1]}
											>
												{error.linkedInURL?.message}
											</Box>
										)}
									</Box>
								</GridItem>

								{/* -- CV -- */}
								{/* <GridItem>
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
										>
											<CvUploadBox
												onClickUploadCV={onClickUploadCV}
												previewCV={previewCV?.name}
												handleRemoveCV={handleRemoveCV}
											/>
										</UploadWrapper>
									</Box>
								</GridItem> */}

								{/* -- Country -- */}
								<GridItem>
									<Box
										style={{
											display: 'flex',
											flexDirection: 'column' as const,
											gap: '0.5rem',
										}}
									>
										<FormElements.Label>Country</FormElements.Label>
										<Controller
											name="country"
											control={control}
											render={({
												field: { name, onChange, value, onBlur },
											}) => (
												<FormElements.Input
													value={value}
													onChange={onChange}
													onBlur={onBlur}
													name={name}
													placeholder="Enter the country you reside in"
												/>
											)}
										/>
										{/* Error Box */}
										{error.country?.message && (
											<Box
												style={{
													fontSize: '0.875rem',
												}}
												color={theme.palettes.error[1]}
											>
												{error.country?.message}
											</Box>
										)}
									</Box>
								</GridItem>

								{/* -- State -- */}
								<GridItem>
									<Box
										style={{
											display: 'flex',
											flexDirection: 'column' as const,
											gap: '0.5rem',
										}}
									>
										<FormElements.Label>State</FormElements.Label>
										<Controller
											name="state"
											control={control}
											render={({
												field: { name, onChange, value, onBlur },
											}) => (
												<FormElements.Input
													value={value}
													onChange={onChange}
													onBlur={onBlur}
													name={name}
													placeholder="Enter the state you reside in"
												/>
											)}
										/>
										{/* Error Box */}
										{error.state?.message && (
											<Box
												style={{
													fontSize: '0.875rem',
												}}
												color={theme.palettes.error[1]}
											>
												{error.state?.message}
											</Box>
										)}
									</Box>
								</GridItem>

								{/* -- City/Town -- */}
								<GridItem>
									<Box
										style={{
											display: 'flex',
											flexDirection: 'column' as const,
											gap: '0.5rem',
										}}
									>
										<FormElements.Label>City/Town</FormElements.Label>
										<Controller
											name="city"
											control={control}
											render={({
												field: { name, onChange, value, onBlur },
											}) => (
												<FormElements.Input
													value={value}
													onChange={onChange}
													onBlur={onBlur}
													name={name}
													placeholder="Which city or town do you live in"
												/>
											)}
										/>
										{/* Error Box */}
										{error.country?.message && (
											<Box
												style={{
													fontSize: '0.875rem',
												}}
												color={theme.palettes.error[1]}
											>
												{error.country?.message}
											</Box>
										)}
									</Box>
								</GridItem>

								{/* -- Zip code -- */}
								<GridItem>
									<Box
										style={{
											display: 'flex',
											flexDirection: 'column' as const,
											gap: '0.5rem',
										}}
									>
										<FormElements.Label>Zip code</FormElements.Label>
										{/* <Controller
											name="zipCode"
											control={control}
											render={({
												field: { name, onChange, value, onBlur },
											}) => (
												<FormElements.Input
													value={value}
													onChange={onChange}
													onBlur={onBlur}
													name={name}
													placeholder="Please enter the zip code of  your area."
												/>
											)}
										/> */}
										<Controller
											name="zipCode"
											control={control}
											rules={{
												minLength: {
													value: 4,
													message: 'Zip minium 4 digits',
												},
												maxLength: {
													value: 6,
													message: 'Zip maximum 6 digits',
												},
												pattern: {
													value: /^[0-9]+$/,
													message: 'Invalid Zip Code',
												},
											}}
											render={({
												field: { name, onChange, value, onBlur },
											}) => (
												<FormElements.Input
													type="number"
													value={value}
													onChange={onChange}
													onBlur={onBlur}
													name={name}
													maxLength={6}
													minLength={4}
													placeholder="Please enter the zip code of your area."
													onInput={e => {
														if (e.target.value.length > e.target.maxLength)
															e.target.value = e.target.value.slice(
																0,
																e.target.maxLength,
															);
													}}
												/>
											)}
										/>
										{/* Error Box */}
										{error.zipCode?.message && (
											<Box
												style={{
													fontSize: '0.875rem',
												}}
												color={theme.palettes.error[1]}
											>
												{error.zipCode?.message}
											</Box>
										)}
									</Box>
								</GridItem>
							</Grid>
							{/* address */}
							<Box
								mt={'1rem'}
								style={{
									display: 'flex',
									flexDirection: 'column' as const,
									gap: '0.5rem',
								}}
							>
								<FormElements.Label>Address</FormElements.Label>
								<Controller
									name="address"
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
												placeholder="Please enter your address"
												rows={4}
											/>
										</Box>
									)}
								/>
							</Box>
						</Box>
						<Box mt={'1rem'} style={{ display: 'flex', justifyContent: 'end' }}>
							<Box
								style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
							>
								<Link
									to={routePaths.user.root}
									style={{
										background: theme.palettes.colors.lightGray[0],
										padding: '0.6875em 2rem',
										borderRadius: theme.borderRadius.pill,
										fontSize: '1rem',
										color: theme.palettes.colors.primary as string,
									}}
								>
									Go back
								</Link>
								<Button
									type="submit"
									variant="primary"
									style={{ padding: '0.6875em 2rem' }}
									loading={updateLoading}
								>
									Save Changes
								</Button>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>

			{/* Country Code Modal */}
			<Modal
				height="500px"
				width="350px"
				isOpen={isCountryCodeModalShow}
				toggleModal={toggoleCountryCodeModal}
			>
				{countryCodes.loadingStatus === 'loading' ? (
					<Loaders.Page />
				) : (
					<Box className={styles['country_code_wrapper']}>
						<FormElements.Input
							placeholder="Search country code"
							onChange={handleSearchCountryCode}
						/>
						<Box className={styles['country_code_items']}>
							{countryCodes?.countries
								?.filter(handleCountryCodeFilter)
								?.map((country: ICountryCode, key: number) => (
									<Box
										onClick={() => phoneNumberCountryCodeHanlder(country)}
										key={key}
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											borderBottom: '1px solid #e7d9d9',
											cursor: 'pointer',
										}}
										py={'1rem'}
										pr={'1rem'}
									>
										<span>{country.name}</span>
										<span>
											{country.phonecode.startsWith('+') ? '' : '+'}
											{country.phonecode}
										</span>
									</Box>
								))}
						</Box>
					</Box>
				)}
			</Modal>
		</div>
	);
}
