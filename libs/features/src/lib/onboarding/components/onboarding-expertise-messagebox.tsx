import { Box, Paragraph } from '@kwicon/kwicon-ui';
import { Images } from '@kwicon/commons';

export const OnboardingExpertiseMessageBox = () => {
	return (
		<Box
			style={{
				display: 'flex',
				gap: '1.5rem',
				alignItems: 'center',
			}}
		>
			<Box width={'70%'}>
				<Paragraph type="p1">
					We value your knowledge and experience! Start typing in the topics you
					feel confident offering advice on. It could be related to your job or
					something you are passionate about.
				</Paragraph>
			</Box>
			<img
				style={{
					marginBottom: '1.5rem',
				}}
				src={Images.OnboardingXPArrow}
				alt="OnboardingXP"
			/>
		</Box>
	);
};
