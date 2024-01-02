import { Images, IRole, roles } from '@kwicon/commons';
import {
	Box,
	Button,
	Container,
	Heading,
	Paper,
	Paragraph,
} from '@kwicon/kwicon-ui';
import { useCallback, useState } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import styles from '../onboarding.module.css';
import {
	getOnboardingState,
	onboardingActions,
} from '../slices/onboarding.slice';
import { setUserRole } from '../thunk-apis/set-user-role';
import { thunkString } from '../thunk-apis/thunk-string';

export const OnboardingSelectRole = () => {
	const dispatch = useDispatch<AppDispatch>();
	const getState = useSelector(getOnboardingState);

	const theme = useTheme();
	const navigate = useNavigate();
	const location = useLocation();

	const [isChangeRole, setIsChangeRole] = useState(
		location?.pathname?.includes('change-role') ?? false,
	);

	//* Local state
	const [selectedRole, setSelectedRole] = useState<IRole | null>(roles[0]);

	//* handle submit role selection
	const handleRoleContinue = useCallback(async () => {
		if (!selectedRole) return;

		try {
			const response = await dispatch(
				setUserRole({
					role: selectedRole.value,
				}),
			);
			dispatch(onboardingActions.setSelectRole(selectedRole.value));
			if (response.type === `${thunkString.setUserRole}/fulfilled`) {
				navigate(isChangeRole ? '/change-role' : '/onboarding');
			}
		} catch (error) {
			throw new Error(error as string);
		}
	}, [selectedRole, dispatch, navigate]);

	return (
		<Container>
			{/* Header */}
			<Box
				className={
					isChangeRole
						? styles['change-role-container__header']
						: styles['onboarding-container__header']
				}
			>
				<img
					src={Images.KwiconLogoType}
					alt="Kwicon Logo"
					height={50}
					width={180}
				/>
			</Box>
			<Box
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Heading type="h2">
					Choose your{' '}
					<Box
						as="span"
						style={{
							fontWeight: 700,
						}}
						color={theme.palettes.colors.primary as string}
					>
						Role!
					</Box>
				</Heading>
			</Box>
			<Box className={styles['onboarding-container__role-container']}>
				<Heading
					mb={'1rem'}
					type="h2"
					style={{
						fontSize: '1rem',
						fontWeight: 500,
					}}
				>
					How do you plan to use the Kwicon?
				</Heading>
				<Box
					style={{
						display: 'flex',
						flexDirection: 'column',
						maxWidth: '30vw',
					}}
				>
					{roles.map(({ title, content, value }, index) => (
						<Paper
							onClick={() => setSelectedRole({ title, content, value })}
							className={styles['onboarding-container__role-selector-card']}
							withBorder
							key={index}
							mb={'1rem'}
							bg={
								selectedRole?.title === title
									? theme.palettes.colors.lightBlue[1]
									: 'transparent'
							}
						>
							{/* Content */}
							<Box>
								<Heading
									style={{
										margin: 0,
									}}
									type="h4"
									lh={1}
								>
									{title}
								</Heading>
								<Paragraph
									style={{
										display: 'block',
										marginTop: '1rem !important',
										fontWeight: 400,
										fontSize: '0.875rem',
									}}
									type="p3"
									color={theme.typography.paragraph1.color as string}
								>
									{content}
								</Paragraph>
							</Box>
							{/* Icon */}
							<Box>
								<BsFillCheckCircleFill
									size={18}
									color={
										selectedRole?.title === title
											? (theme.palettes.colors.primary as string)
											: 'transparent'
									}
								/>
							</Box>
						</Paper>
					))}
					<Box
						style={{
							marginTop: '3rem',
						}}
					>
						<Button
							loading={getState.loadingStatus === 'loading'}
							onClick={handleRoleContinue}
							width="full"
							variant="primary"
						>
							Continue
						</Button>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};

export default OnboardingSelectRole;
