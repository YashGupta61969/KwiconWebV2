import {
	Box,
	Button,
	Container,
	Grid,
	GridItem,
	Heading,
	IconButton,
	Paragraph,
} from '@kwicon/kwicon-ui';
import { useCallback, useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { AdvisorCard } from '@kwicon/components';
import styles from '../onboarding.module.css';
import { getOnboardingState } from '../slices/onboarding.slice';
import { getAdvisorsByCategoryId } from '../thunk-apis/get-advisors-by-category-id';
import { setUserProfileForm } from '../thunk-apis/set-user-profile-form';
import { thunkString } from '../thunk-apis/thunk-string';
import { getAllAdvisors } from '../thunk-apis/get-all-advisors';
import { AppDispatch } from '../../app-store/app-store';

export interface OnboardingSelectAdvisorsProps {
	handlePreviousStep: () => void;
	handleNextStep: () => void;
}

export const OnboardingSelectAdvisors = ({
	handlePreviousStep,
	handleNextStep,
}: OnboardingSelectAdvisorsProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const theme = useTheme();
	const { advisors, selectedSubCategoryIds, loadingStatus } =
		useSelector(getOnboardingState);
	const [selectedAdvisors, setSelectedAdvisors] = useState<string[]>([]);

	useEffect(() => {
		if (selectedSubCategoryIds && selectedSubCategoryIds.length > 0) {
			handleGetAdvisorsByCategoryIds(selectedSubCategoryIds as string[]);
		}

		if (selectedSubCategoryIds?.length === 0) {
			handleGetAllAdvisors();
		}
	}, [selectedSubCategoryIds]);

	// handle get advisor by category
	const handleGetAdvisorsByCategoryIds = async (category: string[]) => {
		try {
			await dispatch(getAdvisorsByCategoryId(category));
		} catch (error) {
			throw new Error(error as string);
		}
	};

	// handle get all advisors
	const handleGetAllAdvisors = async () => {
		try {
			await dispatch(getAllAdvisors());
		} catch (error) {
			throw new Error(error as string);
		}
	};

	// handle select advisor
	const handleSelectAdvisor = (id: string) => {
		if (selectedAdvisors.includes(id)) {
			setSelectedAdvisors(selectedAdvisors.filter(advisor => advisor !== id));
		} else {
			setSelectedAdvisors([...selectedAdvisors, id]);
		}
	};

	// handle next step
	const handleAddAdvisors = useCallback(async () => {
		try {
			const response = await dispatch(
				setUserProfileForm({
					connection: selectedAdvisors,
				}),
			);
			if (response.type === `${thunkString.setUserProfileForm}/fulfilled`) {
				handleNextStep();
			}
		} catch (error) {
			throw new Error(error as string);
		}
	}, [selectedAdvisors, dispatch, handleNextStep]);

	return (
		<Box as="section" width={'100%'}>
			{/* -- TOP section -- */}
			<Box as="section" mt={'2rem'}>
				<IconButton onClick={handlePreviousStep} size="lg">
					<BiArrowBack />
				</IconButton>
				<Box as="article">
					<Heading type="h2" lh={0.5}>
						Connect with your{' '}
						<span
							style={{
								color: theme.palettes.colors.primary as string,
								fontWeight: 700,
							}}
						>
							Advisors
						</span>
					</Heading>
					<Paragraph type="p1" lh={1}>
						We identified few people that might help you on your path to
						excellence.
					</Paragraph>
					<Box
						as="section"
						width={'100%'}
						mt={'2.5rem'}
						className={styles['onboarding-container__content']}
					>
						{advisors && advisors.length > 0 ? (
							<Grid xl={7} lg={5} md={4} sm={3} xs={2}>
								{advisors.map(advisor => (
									<GridItem>
										<AdvisorCard
											id={advisor.id}
											key={advisor.id}
											// profilePicture={advisor.profilePicture}
											name={advisor.name}
											onSelectAdvisor={handleSelectAdvisor}
											selected={selectedAdvisors.includes(advisor.id)}
										/>
									</GridItem>
								))}
							</Grid>
						) : (
							<Box
								style={{
									fontWeight: 500,
									fontSize: '1.5rem',
								}}
							>
								No advisors are found according to your interests
							</Box>
						)}
					</Box>
				</Box>
			</Box>
			{/* Footer */}
			<Box
				boxShadow={theme.shadows.regular}
				className={styles['onboarding-container__footer']}
			>
				<Container
					py={'1.5rem'}
					style={{
						justifyContent: 'space-between',
					}}
					className={styles['onboarding-container__footer-inner']}
				>
					<Button
						style={{
							borderRadius: '2.5rem',
						}}
						onClick={handlePreviousStep}
						width={'20%'}
						variant="tertiary"
					>
						Previous
					</Button>
					<Button
						onClick={handleAddAdvisors}
						width={'20%'}
						variant="primary"
						loading={loadingStatus === 'loading' ? true : false}
					>
						Next
					</Button>
				</Container>
			</Box>
		</Box>
	);
};

export default OnboardingSelectAdvisors;
