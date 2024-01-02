import { useRefScrollTop } from '@kwicon/commons';
import { Box, Breadcrumb, Heading } from '@kwicon/kwicon-ui';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { EducationForm } from '../components/foms/education-form';

export function AddEducation() {
	const theme = useTheme();

	// hooks
	const navigate = useNavigate();
	const refToTop = useRefScrollTop();

	return (
		<div ref={refToTop}>
			<Box pb={'4rem'}>
				<Breadcrumb navigate={navigate} />
				<Box>
					<Heading fw={'700'}>Add Education Qualification</Heading>
				</Box>

				<Box bg={theme.palettes.colors.white as string} p={'1rem'}>
					<EducationForm />
				</Box>
			</Box>
		</div>
	);
}
