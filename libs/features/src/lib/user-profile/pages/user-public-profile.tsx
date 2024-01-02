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

export function UserPublicProfile() {
	const theme = useTheme();

	// hooks
	const navigate = useNavigate();
	const refToTop = useRefScrollTop();

	// redux store
	const dispatch = useDispatch<AppDispatch>();
	const { user, loadingStatus } = useSelector(getUserState);
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
		connections,
		linkedInURL,
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
						to={routePaths.user.root}
						style={{
							borderRadius: theme.borderRadius.regular,
							background: theme.palettes.colors.white as string,
							border: `1px solid ${theme.palettes.colors.lightBlue[2]}`,
							padding: '0.75rem',
						}}
					>
						Go Back
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
					isEditable={false}
				/>

				{/*  About */}
				<UserAbout about={about} isEditable={false} />

				{/*   Interests */}
				{role && role === 'student' && (
					<UserInterest interests={interests} isEditable={false} />
				)}

				{/* Expertise */}
				<UserExpertise expertise={specialization} isEditable={false} />

				{role && role === 'advisor' && (
					<UserExperience experience={experience} isEditable={false} />
				)}

				{/* Education */}
				<UserEducation educations={educations} isEditable={false} />

				{/* Certificates */}
				{role && role === 'student' && (
					<UserCertificate programs={programs} isEditable={false} />
				)}

				{/* Achievement */}
				<UserAchievement recognitions={recognitions} isEditable={false} />
			</Box>
		</div>
	);
}

// export default UserProfile;
