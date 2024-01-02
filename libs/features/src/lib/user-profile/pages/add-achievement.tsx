import { useRefScrollTop } from '@kwicon/commons';
import { Box, Breadcrumb, Heading } from '@kwicon/kwicon-ui';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { AchievementForm } from '../components/foms/achievement-form';

export function AddAchievement() {
	const theme = useTheme();

	// hooks
	const navigate = useNavigate();
	const refToTap = useRefScrollTop();

	return (
		<div ref={refToTap}>
			<Box pb={'4rem'}>
				<Breadcrumb navigate={navigate} />
				<Box>
					<Heading fw={'700'}>Add Achievement</Heading>
				</Box>

				<Box bg={theme.palettes.colors.white as string} p={'1rem'}>
					<AchievementForm />
				</Box>
			</Box>
		</div>
	);
}
