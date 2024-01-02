import { Box, Button, Container } from '@kwicon/kwicon-ui';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from 'styled-components';
import styles from '../onboarding.module.css';

interface OnboardingFooterProps {
	loadingStatus: 'error' | 'not loaded' | 'loading' | 'loaded';
	footerButtonType: 'submit' | 'button';
	withPreviousButton: boolean;
	handleNext?: () => void;
	handlePrevious?: () => void;
	currentStep: number;
	totalSteps: number;
}

export const OnboardingFooter: React.FC<OnboardingFooterProps> = ({
	loadingStatus,
	footerButtonType,
	handleNext,
	handlePrevious,
	withPreviousButton,
	currentStep,
	totalSteps,
}) => {
	const theme = useTheme();
	const location = useLocation();

	const [isChangeRole, setIsChangeRole] = useState(
		location?.pathname?.includes('change-role') ?? false,
	);

	return (
		<Box
			boxShadow={theme.shadows.regular}
			className={styles['onboarding-container__footer']}
		>
			<Container
				height={'100%'}
				py={'1.5rem'}
				style={{
					justifyContent: 'space-between',
				}}
				className={styles['onboarding-container__footer-inner']}
			>
				{withPreviousButton ? (
					<Button
						style={{
							borderRadius: '2.5rem',
						}}
						onClick={handlePrevious}
						width={'20%'}
						variant="tertiary"
					>
						Previous
					</Button>
				) : (
					<Box>&nbsp;</Box>
				)}
				{footerButtonType === 'submit' ? (
					<Button
						form={'user-form'}
						type={'submit'}
						width={'20%'}
						variant="primary"
						loading={loadingStatus === 'loading' ? true : false}
					>
						{currentStep === totalSteps && !isChangeRole
							? 'Get Started'
							: 'Next'}
					</Button>
				) : (
					<Button
						width={'20%'}
						onClick={handleNext}
						variant="primary"
						loading={loadingStatus === 'loading' ? true : false}
					>
						{currentStep === totalSteps && !isChangeRole
							? 'Get Started'
							: 'Next'}
					</Button>
				)}
			</Container>
		</Box>
	);
};
