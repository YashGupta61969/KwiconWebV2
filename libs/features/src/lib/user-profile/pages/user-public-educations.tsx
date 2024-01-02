import { useRefScrollTop } from '@kwicon/commons';
import { Box, Breadcrumb, Heading, Loaders } from '@kwicon/kwicon-ui';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import { getUser } from '../../onboarding/thunk-apis/get-user';
import { EducationCard } from '../components/education-card';
import { IEducation } from '../interfaces/user-profile-interfaces';
import { getUserState } from '../slices/user.slice';

export function UserPublicEducations() {
	// hooks
	const theme = useTheme();
	const navigate = useNavigate();
	const refToTop = useRefScrollTop();

	// redux store
	const dispatch = useDispatch<AppDispatch>();

	const { user, loadingStatus } = useSelector(getUserState);
	const { education: educations } = user || {}; // destructure user object

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
				<Box
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Heading fs={'1.75rem'} fw={'600'}>
						My Education
					</Heading>
				</Box>

				<Box bg={theme.palettes.colors.white as string} p={'1rem'}>
					{(educations?.length as number) > 0 ? (
						[...(educations as IEducation[])]
							?.reverse()
							.map((edu: IEducation, index: number) => (
								<EducationCard
									key={index}
									id={edu.id}
									degree={edu.degree}
									school={edu.school}
									location={edu.location}
									fieldOfStudy={edu.fieldOfStudy}
									description={edu.description}
									startDate={edu.startDate}
									endDate={edu.endDate}
									skillSet={edu.skillSet}
									isCurrentlyStudying={edu.isCurrentlyStudying}
									isAdditional={true}
									isEditable={false}
								/>
							))
					) : (
						<Box>
							<Heading fs={'1.25rem'} fw={'600'}>
								No Education Added
							</Heading>
						</Box>
					)}
				</Box>
			</Box>
		</div>
	);
}
