import { routePaths, useRefScrollTop } from '@kwicon/commons';
import { Box, Breadcrumb, Heading, Loaders } from '@kwicon/kwicon-ui';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import { getUser } from '../../onboarding/thunk-apis/get-user';
import { EducationForm } from '../components/foms/education-form';
import { IEducation } from '../interfaces/user-profile-interfaces';
import { getUserState } from '../slices/user.slice';

export function UpdateEducation() {
	// Local State
	const [education, setEducation] = useState<IEducation | null | undefined>(
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
		user: { education: educations },
		loadingStatus,
	} = useSelector(getUserState);

	// hooks

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
			const education = educations?.find((edu: IEducation) => edu.id === id);
			if (education?.id) {
				setEducation(education);
			} else {
				toast.error('Education not found');
				navigate(routePaths.user.education.root);
			}
		}
	}, [educations, id, navigate, loadingStatus]);

	const theme = useTheme();

	/*
    Handlers
  */

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
					<EducationForm isEditable education={education as IEducation} />
				</Box>
			</Box>
		</div>
	);
}
