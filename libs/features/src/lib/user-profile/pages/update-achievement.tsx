import { routePaths, useRefScrollTop } from '@kwicon/commons';
import { Box, Breadcrumb, Heading, Loaders } from '@kwicon/kwicon-ui';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import { getUser } from '../../onboarding/thunk-apis/get-user';
import { AchievementForm } from '../components/foms/achievement-form';
import { IAchievement } from '../interfaces/user-profile-interfaces';
import { getUserState } from '../slices/user.slice';

export function UpdateAchievement() {
	// Local State
	const [achievement, setAchievement] = useState<IAchievement | null | undefined>(
		null,
	);

	// params
	const { id } = useParams();

	// hooks
	const navigate = useNavigate();
	const theme = useTheme();
	const refToTop = useRefScrollTop();

	// redux store
	const dispatch = useDispatch<AppDispatch>();
	const {
		user: { recognitions: achievements },
		loadingStatus,
	} = useSelector(getUserState);

	/* -- Effects --*/
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

	// get the experice
	useEffect(() => {
		if (loadingStatus === 'loaded') {
			const achievement = achievements?.find(
				(achiev: IAchievement) => achiev.id === id,
			);
			if (achievement?.id) {
				setAchievement(achievement);
			} else {
				toast.error('Achievement not found');
				navigate(routePaths.user.education.root);
			}
		}
	}, [achievement, id, navigate, achievements, loadingStatus]);

	// Show the loadings
	if (loadingStatus === 'loading') {
		return <Loaders.Page />;
	}

	return (
		<div ref={refToTop}>
			<Box pb={'4rem'}>
				<Breadcrumb navigate={navigate} />
				<Box>
					<Heading fw={'700'}>Edit Education</Heading>
				</Box>

				<Box bg={theme.palettes.colors.white as string} p={'1rem'}>
					<AchievementForm isEditable achievement={achievement as IAchievement} />
				</Box>
			</Box>
		</div>
	);
}
