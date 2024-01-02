import { routePaths, useGetMedia, useRefScrollTop } from '@kwicon/commons';
import { Box, Breadcrumb, Heading, Loaders } from '@kwicon/kwicon-ui';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import { getUser } from '../../onboarding/thunk-apis/get-user';
import { ProfileHeading } from '../components/profile-heading';
import { UserAbout } from '../components/user-about';
import { UserAchievement } from '../components/user-achievement';
import { UserCertificate } from '../components/user-certificate';
import { UserEducation } from '../components/user-education';
import { UserExperience } from '../components/user-experience';
import { UserExpertise } from '../components/user-expertise';
import { UserInterest } from '../components/user-interest';
import { getUserState } from '../slices/user.slice';

export function UserProfile() {
	const theme = useTheme();

	// hooks
	const navigate = useNavigate();
	const refToTop = useRefScrollTop();

	// redux store
	const dispatch = useDispatch<AppDispatch>();
	const { user, loadingStatus, connectionsQBUserIds } =
		useSelector(getUserState);
	const {
		name,
		role,
		about,
		interests,
		specialization,
		education: educations,
		experience,
		programs,
		recognitions,
		linkedInURL,
		connections,
	} = user || {}; // destructure user object

	//* Getting the user
	useEffect(() => {
		handleGetUser();
	}, []);

	// get media hook
	const { media, mediaLoader } = useGetMedia(user?.profilePicture as string);

	// get user function
	const handleGetUser = async () => {
		try {
			await dispatch(getUser());
		} catch (error) {
			throw new Error(error as string);
		}
	};

	// Show the loadings
	if (loadingStatus === 'loading') {
		return <Loaders.Page />;
	}

	return (
		<div ref={refToTop}>
			{/* {handleGetMedia(user?.profilePicture as string)} */}
			<Box pb={'4rem'}>
				<Breadcrumb navigate={navigate} />
				<Box
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Heading fs={'1.75rem'} fw={'600'}>
						My Profile
					</Heading>
					<Link
						to={routePaths.user.publicProfile.root}
						style={{
							borderRadius: theme.borderRadius.regular,
							background: theme.palettes.colors.white as string,
							border: `1px solid ${theme.palettes.colors.lightBlue[2]}`,
							padding: '0.75rem',
						}}
					>
						My public profile
					</Link>
				</Box>

				{/* Profile Heading */}
				<ProfileHeading
					mediaLoading={mediaLoader}
					media={media}
					linkedin={linkedInURL as string}
					name={name as string}
					role={role as string}
					connections={
						connections?.seeker?.length + connections?.advisor?.length
					}
					isEditable
				/>

				{/*  About */}
				<UserAbout about={about} isEditable />

				{/*   Interests */}
				{role && role === 'student' && (
					<UserInterest interests={interests} isEditable />
				)}

				{/* Expertise */}
				{role && role === 'advisor' && (
					<UserExpertise expertise={specialization} isEditable />
				)}

				{role && role === 'advisor' && (
					<UserExperience experience={experience} isEditable />
				)}

				{/* Education */}
				<UserEducation educations={educations} isEditable />

				{/* Certificates */}
				{role && role === 'student' && (
					<UserCertificate programs={programs} isEditable />
				)}

				{/* Achievement */}
				<UserAchievement recognitions={recognitions} isEditable />
			</Box>
		</div>
	);
}

// export default UserProfile;
