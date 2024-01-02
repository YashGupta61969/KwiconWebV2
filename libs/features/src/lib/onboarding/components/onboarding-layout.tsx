import { Images, routePaths } from '@kwicon/commons';
import {
	Box,
	Container,
	Heading,
	IconButton,
	Paragraph,
	Tracker,
} from '@kwicon/kwicon-ui';
import styles from '../onboarding.module.css';
import { BiArrowBack } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

// layout props
export interface OnboardingLayoutProps {
	children: React.ReactNode;
	totalSteps: number;
	currentStep: number;
	stepValue: number;
	formId?: string;

	handleNextStep?: () => void;
	handlePreviousStep?: () => void;

	footerComponent?: React.ReactNode;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
	children,
	totalSteps,
	currentStep,
	stepValue,
	handlePreviousStep,
	footerComponent,
}) => {
	const navigate = useNavigate();
	const location = useLocation();

	const [isChangeRole, setIsChangeRole] = useState(
		location?.pathname?.includes('change-role') ?? false,
	);

	const handleGoBack = () => {
		if (currentStep === 1) {
			navigate(
				isChangeRole
					? routePaths.changeRole.selectRole
					: routePaths.onboarding.selectRole,
			);
		} else {
			if (handlePreviousStep) {
				handlePreviousStep();
			}
		}
	};

	return (
		<Box>
			<Container
				style={{
					paddingBottom: '0',
				}}
			>
				{isChangeRole ? (
					<Box
						style={{
							width: '57%',
							marginLeft: '43%',
						}}
					>
						<Box
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								width: '100%',
							}}
						>
							<Box>
								<Heading
									type="h2"
									lh={0.5}
									style={{
										marginLeft: 'auto',
									}}
								>
									Changing Role
								</Heading>
							</Box>
							<Box className={styles['change-role-container__header']}>
								<img
									src={Images.KwiconLogoType}
									alt="Kwicon Logo"
									height={50}
									width={180}
								/>
							</Box>
						</Box>
					</Box>
				) : (
					<Box className={styles['onboarding-container__header']}>
						<img
							src={Images.KwiconLogoType}
							alt="Kwicon Logo"
							height={50}
							width={180}
						/>
					</Box>
				)}

				<Box
					as="section"
					mt={'3rem'}
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						width: '100%',
					}}
				>
					{/* Tracker Area */}
					<Box
						as="article"
						width={'100%'}
						style={{
							display: 'flex',
							gap: '3rem',
							alignItems: 'center',
						}}
					>
						<Box mt={'2rem'}>
							<IconButton onClick={handleGoBack} size="lg">
								<BiArrowBack />
							</IconButton>
						</Box>
						<Box width={'100%'}>
							<Box>
								<Paragraph
									lh={0.5}
								>{`Step ${currentStep} of ${totalSteps}`}</Paragraph>
							</Box>
							<Box>
								<Tracker value={stepValue} />
							</Box>
						</Box>
					</Box>
				</Box>

				{/* Actual Child Contents */}
				<Box>{children}</Box>
			</Container>
			{/* Footer component  */}
			<Box
				style={{
					position: 'relative' as const,
					marginTop: '6rem',
					width: '100%',
				}}
			>
				{footerComponent}
			</Box>
		</Box>
	);
};

export default OnboardingLayout;
