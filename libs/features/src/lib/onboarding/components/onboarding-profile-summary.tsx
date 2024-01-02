import { Icons, Images, loadImageWithToken, routePaths } from '@kwicon/commons';
import {
	Avatar,
	Box,
	Button,
	Chip,
	Container,
	Divider,
} from '@kwicon/kwicon-ui';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import styles from '../onboarding.module.css';
import { getOnboardingState } from '../slices/onboarding.slice';
import { getUser } from '../thunk-apis/get-user';
import { AppDispatch } from '../../app-store/app-store';
import { BsPlusLg } from 'react-icons/bs';

// import { CommunityCard } from '@kwicon/components';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OnboardingProfileSummaryProps {}

export const OnboardingProfileSummary = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector(getOnboardingState);

	const navigate = useNavigate();
	const theme = useTheme();

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

	// handle previous step
	const handlePreviousStep = () => {
		// getting total steps from the local storage
		const totalSteps = sessionStorage.getItem('totalSteps');
		if (totalSteps) {
			navigate(routePaths.onboarding.root, {
				state: {
					stateStep: parseInt(totalSteps),
				},
			});
		}
	};

	return (
		<Container>
			<Box className={styles['onboarding-container__header']}>
				<img
					src={Images.KwiconLogoType}
					alt="Kwicon Logo"
					height={50}
					width={180}
				/>
			</Box>
			{/* -- CONTENT -- */}

			<Box
				mt={'10rem'}
				style={{
					display: 'flex',
					width: '100%',
				}}
			>
				{/* Info section */}
				<Box
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						// alignItems: 'center',
						width: '100%',
					}}
				>
					<Box>
						<Box
							style={{
								display: 'flex',
								gap: '4.5rem',
							}}
						>
							<Box
								mt={'-2rem'}
								style={{
									position: 'relative' as const,
								}}
							>
								<Avatar
									type={user?.profilePicture ? 'image' : 'text'}
									text={user?.name}
									src={loadImageWithToken(user?.profilePicture)}
									alt={user?.name}
									style={{
										position: 'relative' as const,
										zIndex: '10',
										height: '12rem',
										width: '12rem',
										fontSize: '4rem',
										background: '#f0f1ff',
									}}
								/>
								<Box
									style={{
										position: 'absolute' as const,
										zIndex: '-10',
										top: 0,
										marginLeft: '-1.25rem',
										marginTop: '-1rem',
									}}
								>
									<Icons.BlobLarge />
								</Box>
							</Box>
							<Box
								style={{
									width: '100%',
								}}
							>
								<Box
									style={{
										fontSize: '2rem',
										fontWeight: 700,
									}}
								>
									{user?.name}
								</Box>
								{/* personal info */}
								{user?.profession && (
									<Box
										mt={'1rem'}
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '0.5rem',
											color: '#828282',
											fontSize: '1rem',
										}}
									>
										<Icons.BriefcaseIcon />
										<Box>{user?.profession}</Box>
									</Box>
								)}
								<Box
									mt={'1rem'}
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '0.5rem',
										color: '#828282',
										fontSize: '1rem',
									}}
								>
									<Icons.GraduateHatIcon />
									<Box>{user?.schoolName}</Box>
								</Box>
								{user?.grade && (
									<Box
										mt={'1rem'}
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '0.5rem',
											color: '#828282',
											fontSize: '1rem',
										}}
									>
										<Icons.DoorIcon />
										<Box>{user?.grade}</Box>
									</Box>
								)}
								<Box
									mt={'1rem'}
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '0.5rem',
										color: '#828282',
										fontSize: '1rem',
									}}
								>
									<Icons.MailIcon />
									<Box>{user?.email}</Box>
								</Box>
							</Box>
						</Box>
						{/* Card */}
						{user?.community && user.community.length > 0 ? (
							<Box>
								{/* --Community Card-- */}
								{/* <CommunityCard selected={true} communityAdvisors={} /> */}
							</Box>
						) : null}
					</Box>
					<Box
						width={'50%'}
						style={{
							display: 'flex',
							flexDirection: 'column' as const,
							alignItems: 'center',
						}}
						mb={'1.5rem'}
					>
						<Box
							style={{
								display: 'flex',
								alignItems: 'baseline',
								gap: '0.5rem',
							}}
						>
							{/* Interests */}
							{user?.interests && user?.interests.length > 0 ? (
								<>
									<Divider
										orientation="horizontal"
										width="6rem"
										height="2px"
										color="rgba(70, 75, 128, 0.4)"
									/>
									<Box
										style={{
											fontSize: '1.125rem',
											fontWeight: 700,
										}}
									>
										{user?.role === 'student'
											? `${user?.interests.length} Interests`
											: 'Expert in'}
									</Box>
									<Divider
										orientation="horizontal"
										width="6rem"
										height="2px"
										color="rgba(70, 75, 128, 0.4)"
									/>
								</>
							) : null}
						</Box>
						{/* Interest mapped */}
						<Box
							style={{
								display: 'flex',
								flexWrap: 'wrap' as const,
								gap: '1rem',
							}}
							mb={'2rem'}
						>
							{user?.interests && (
								<Box
									style={{
										display: 'flex',
										flexWrap: 'wrap' as const,
										gap: '1rem',
									}}
								>
									{user.interests.map((interest: any, index: number) => (
										<Chip key={index}>{interest?.name}</Chip>
									))}
								</Box>
							)}
						</Box>
						{/* Edit Interest */}
						{user?.role !== 'advisor' && (
							<Button
								style={{
									gap: '0.75rem',
								}}
								variant="tertiary"
								width={'50%'}
								onClick={() =>
									navigate('/onboarding', {
										state: {
											currentStateStep: 2,
										},
									})
								}
							>
								{user?.interests && user?.interests.length > 0 ? (
									<Icons.PenIcon />
								) : (
									<BsPlusLg color={theme.palettes.colors.primary as string} />
								)}
								<Box>
									{user?.interests && user?.interests.length > 0 ? (
										<Box>
											{user?.role === 'student'
												? 'Edit Interests'
												: 'Edit Expertise'}
										</Box>
									) : (
										<Box>
											{user?.role === 'student'
												? 'Add Interests'
												: 'Add Expertise'}
										</Box>
									)}
								</Box>
							</Button>
						)}
					</Box>
				</Box>
			</Box>

			{/* Footer */}
			<Box
				boxShadow={theme.shadows.regular}
				className={styles['onboarding-container__footer']}
			>
				<Container
					py={'1.5rem'}
					style={{
						justifyContent: 'space-between',
					}}
					className={styles['onboarding-container__footer-inner']}
				>
					<Button
						style={{
							borderRadius: '2.5rem',
						}}
						onClick={handlePreviousStep}
						width={'20%'}
						variant="tertiary"
					>
						Previous
					</Button>
					<Button onClick={() => navigate('/')} width={'20%'} variant="primary">
						Get Started
					</Button>
				</Container>
			</Box>
		</Container>
	);
};

export default OnboardingProfileSummary;
