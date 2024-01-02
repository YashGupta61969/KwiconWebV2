import { routePaths, useRefScrollTop } from '@kwicon/commons';
import {
	Box,
	Breadcrumb,
	Button,
	Heading,
	Loaders,
	Modal,
	Paragraph,
} from '@kwicon/kwicon-ui';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import { getUser } from '../../onboarding/thunk-apis/get-user';
import { setUserProfileForm } from '../../onboarding/thunk-apis/set-user-profile-form';
import { thunkString } from '../../onboarding/thunk-apis/thunk-string';
import { getUserState } from '../slices/user.slice';
import styles from '../user.module.css';

export function UserAboutMe() {
	// local state
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const { handleSubmit, control, setValue } = useForm({
		defaultValues: {
			about: '',
		},
	});

	// hooks
	const navigate = useNavigate();
	const theme = useTheme();
	const refToTop = useRefScrollTop();

	// handling the delete modal
	const toggleDeleteModal = () => {
		setIsDeleteModalOpen(!isDeleteModalOpen);
	};

	// redux store
	const dispatch = useDispatch<AppDispatch>();
	const { user, loadingStatus } = useSelector(getUserState);

	//* Getting the user
	useEffect(() => {
		handleGetUser();
	}, []);

	// get user function
	const handleGetUser = async () => {
		try {
			await dispatch(getUser());
		} catch (error) {
			throw new Error(error as string);
		}
	};

	// set the default value on form
	useEffect(() => {
		const { about } = user;

		setValue('about', about ? about : '');
	}, [setValue, user]);

	// update about handler
	const updateAboutHandler = async () => {
		const response = await dispatch(
			setUserProfileForm({
				about: '',
			}),
		);

		if (response.type === `${thunkString.setUserProfileForm}/fulfilled`) {
			toast.success('About has been deleted!');
			navigate(routePaths.user.root);
		}
	};

	// handle form submit
	const handleFormSubmit = useCallback(
		async (data: { about: string }) => {
			if (data) {
				const response = await dispatch(
					setUserProfileForm({ about: data.about }),
				);
				if (response.type === `${thunkString.setUserProfileForm}/fulfilled`) {
					toast.success('About has been updated!');
					navigate(routePaths.user.root);
				}
			}
		},
		[dispatch, navigate],
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
					<Heading fs={'1.75rem'} fw={'700'}>
						About Me
					</Heading>
				</Box>
				<Box
					bg={theme.palettes.colors.white as string}
					p={'1rem'}
					as="form"
					onSubmit={handleSubmit(handleFormSubmit)}
				>
					<Box>
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
										// onChange={onChange}
										onChange={e => {
											const inputValue = e.target.value;
											const newLineValue = inputValue.replace(/\r?\n/g, '\r\n');
											onChange(newLineValue);
										}}
										onBlur={onBlur}
										name={name}
										placeholder="Tell people a little bit about you. You can write about your interests, experience or achievements."
										rows={10}
										required
									/>
								</Box>
							)}
						/>
					</Box>

					<Box
						mt={'1rem'}
						style={{ display: 'flex', justifyContent: 'space-between' }}
					>
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
										disabled={(user.about?.length as number) > 0 ? false : true}
									>
										Delete
									</Button>
								}
							>
								<Heading fs={'1.125rem'} fw={'700'}>
									Delete About me?
								</Heading>
								<Paragraph fs={'0.875rem'} color="#101010">
									Are you sure you want to delete the ‘about me’ section? We
									recommend to keep ‘about me’ as it makes your profile rich.
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
										onClick={updateAboutHandler}
										variant="tertiary"
										style={{
											padding: '0.5rem 1rem',
											color: theme.palettes.colors.primary as string,
										}}
									>
										Yes, delete
									</Button>
								</Box>
							</Modal>
						</Box>
						<Box style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
								// loading={loadingStatus === 'loading' ? true : false}
							>
								Save Changes
							</Button>
						</Box>
					</Box>
				</Box>
			</Box>
		</div>
	);
}
