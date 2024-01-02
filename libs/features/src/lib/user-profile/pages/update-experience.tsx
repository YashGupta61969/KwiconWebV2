import { routePaths, useRefScrollTop } from '@kwicon/commons';
import { Box, Breadcrumb, Heading, Loaders } from '@kwicon/kwicon-ui';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import { getUser } from '../../onboarding/thunk-apis/get-user';
import { ExperienceForm } from '../components/foms/experience-form';
import { IExperience } from '../interfaces/user-profile-interfaces';
import { getUserState } from '../slices/user.slice';

export function UpdateExperience() {
	// Local State
	const [experience, setExperience] = useState<IExperience | null | undefined>(
		null,
	);

	// params
	const { id } = useParams();

	// hooks
	const navigate = useNavigate();
	const refToTop = useRefScrollTop();

	// redux store
	const dispatch = useDispatch<AppDispatch>();
	const {
		user: { experience: experiences },
		loadingStatus,
	} = useSelector(getUserState);

	// hooks

	/* -- Effects --*/
	//* Getting the user
	useEffect(() => {
		handleGetUser();
	}, []);

	// get the experice
	useEffect(() => {
		if (loadingStatus === 'loaded') {
			const experience = experiences?.find((exp: IExperience) => exp.id === id);
			if (experience) {
				setExperience(experience);
			} else {
				toast.error('Experience not found');
				navigate(routePaths.user.experiences.root);
			}
		}
	}, [experiences, id, navigate, loadingStatus]);

	// get user function
	const handleGetUser = async () => {
		try {
			await dispatch(getUser());
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const theme = useTheme();

	// Show the loadings
	if (loadingStatus === 'loading') {
		return <Loaders.Page />;
	}
	return (
		<div ref={refToTop}>
			<Box pb={'4rem'}>
				<Breadcrumb navigate={navigate} />
				<Box>
					<Heading fw={'700'}>Edit Experience</Heading>
				</Box>

				<Box bg={theme.palettes.colors.white as string} p={'1rem'}>
					<ExperienceForm
						isEditable={true}
						experience={experience as IExperience}
					/>
				</Box>
			</Box>
		</div>
	);
}
