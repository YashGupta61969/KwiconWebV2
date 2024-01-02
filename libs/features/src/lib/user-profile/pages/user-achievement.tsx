import { routePaths, useRefScrollTop } from '@kwicon/commons';
import { Box, Breadcrumb, Heading, Loaders, Paper } from '@kwicon/kwicon-ui';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import { getUser } from '../../onboarding/thunk-apis/get-user';
import { AchievementCard } from '../components/achievement-card';
import { IAchievement } from '../interfaces/user-profile-interfaces';
import { getUserState } from '../slices/user.slice';
import { getPublicUser } from '../thunk-apis/get-public-user';

export function UserAchievement() {
	// hooks
	const theme = useTheme();
	const navigate = useNavigate();
	const refToTop = useRefScrollTop();

	// redux store
	const dispatch = useDispatch<AppDispatch>();

	const { user, loadingStatus, publicUser } = useSelector(getUserState);
	const { recognitions: achievements } = user || {}; // destructure user object

	const { state } = useLocation();
	//* Getting the public user
	useEffect(() => {
		if (state?.publicId) {
			handleGetPublicUser(state?.publicId);
		}
	}, [state?.publicId]);
	// get public user function
	const handleGetPublicUser = async (id: string) => {
		try {
			await dispatch(getPublicUser(id));
		} catch (error) {
			throw new Error(error as string);
		}
	};

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

	// Show the loadings
	if (loadingStatus === 'loading') {
		return <Loaders.Page />;
	}

	return (
		<div ref={refToTop}>
			<Box pb={'4rem'}>
				<Breadcrumb navigate={navigate} />
				{!state?.publicId && (
					<Box
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Heading fs={'1.75rem'} fw={'600'}>
							My Achievement
						</Heading>
						<Box style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
							<Link
								to={routePaths.user.achievement.addAchievement}
								style={{
									borderRadius: theme.borderRadius.regular,
									background: theme.palettes.colors.primary as string,
									padding: '0.6rem 1rem',
									border: `1px solid ${theme.palettes.colors.lightBlue[2]}`,
									color: theme.palettes.colors.white as string,
								}}
							>
								Add Achievement
							</Link>
						</Box>
					</Box>
				)}
				{state?.publicId ? (
					publicUser?.user?.recognitions?.map((achiev: any, index: number) => (
						<Paper mt={'2rem'} key={index} mb={'1rem'}>
							<AchievementCard
								key={index}
								id={achiev.id}
								awardName={achiev.awardName}
								givenBy={achiev.givenBy}
								date={achiev.date}
								description={achiev.description}
								isAdditional={true}
								isEditable={false}
							/>
						</Paper>
					))
				) : (
					<Box bg={theme.palettes.colors.white as string} p={'1rem'}>
						{(achievements?.length as number) > 0 ? (
							[...(achievements as IAchievement[])]
								?.reverse()
								.map((achiev: IAchievement, index: number) => (
									<AchievementCard
										key={index}
										id={achiev.id}
										awardName={achiev.awardName}
										givenBy={achiev.givenBy}
										date={achiev.date}
										description={achiev.description}
										isAdditional={true}
										isEditable
									/>
								))
						) : (
							<Box></Box>
						)}
					</Box>
				)}
			</Box>
		</div>
	);
}
