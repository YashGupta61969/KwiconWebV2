import { routePaths } from '@kwicon/commons';
import { CommunityCard, CommunitySearch } from '@kwicon/components';
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
import { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import styles from '../onboarding.module.css';
import { getOnboardingState } from '../slices/onboarding.slice';
import { getAllCommunities } from '../thunk-apis/get-all-communities';
import { joinOrWithdrawCommunity } from '../thunk-apis/join-or-withdraw-community';
import { thunkString } from '../thunk-apis/thunk-string';
import { OnboardingCommunityEntity } from '../interfaces/onboarding-interfaces';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OnboardingJoinCommunityProps {
	handlePreviousStep: () => void;
}

export const OnboardingJoinCommunity = ({
	handlePreviousStep,
}: OnboardingJoinCommunityProps) => {
	const theme = useTheme();
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const { loadingStatus, communities } = useSelector(getOnboardingState);

	const [selectedCommunities, setSelectedCommunities] = useState<
		OnboardingCommunityEntity[]
	>([]);

	const [filteredCommunities, setFilteredCommunities] = useState<
		OnboardingCommunityEntity[] | undefined | null
	>([]);

	const [searchTerm, setSearchTerm] = useState<string>('');

	useEffect(() => {
		handleGetAllCommunities();
	}, []);

	useEffect(() => {
		if (communities) {
			setFilteredCommunities(communities);
		}

		if (searchTerm === '') {
			setFilteredCommunities(communities);
		}
	}, [communities, searchTerm]);

	//* Handler get all communities
	const handleGetAllCommunities = async () => {
		try {
			await dispatch(getAllCommunities());
		} catch (error) {
			throw new Error(error as string);
		}
	};

	//* handle join community
	const handleJoinCommunity = async (
		commId: string,
		isJoining: boolean,
		commName: string,
		community: OnboardingCommunityEntity | undefined,
	) => {
		try {
			const response = await dispatch(
				joinOrWithdrawCommunity({
					communityId: commId,
					isJoinRequest: isJoining,
				}),
			);

			if (
				response.type === `${thunkString.joinOrWithdrawCommunity}/fulfilled`
			) {
				if (isJoining) {
					setSelectedCommunities([
						...selectedCommunities,
						community as OnboardingCommunityEntity,
					]);
				} else {
					setSelectedCommunities(prevState => {
						return prevState.filter(community => community?.id !== commId);
					});
				}
			}
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const handleSearch = () => {
		if (searchTerm) {
			const filtered =
				communities &&
				communities.filter(community => {
					if (community?.name) {
						return community?.name
							.toLowerCase()
							.includes(searchTerm.toLowerCase());
					}
					return null;
				});
			setFilteredCommunities(filtered);
		} else {
			setFilteredCommunities(communities);
		}
	};

	return (
		<Box as="section" width={'100%'}>
			{/* -- TOP section -- */}
			<Box
				as="section"
				mt={'2rem'}
				width={'100%'}
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Box>
					<IconButton onClick={handlePreviousStep} size="lg">
						<BiArrowBack />
					</IconButton>
					<Box as="article">
						<Heading type="h2" lh={0.5}>
							Join a Community!
						</Heading>
						<Paragraph type="p1" lh={1}>
							Be part of communities to benefit from continuous and active
							learning.
						</Paragraph>
					</Box>
				</Box>
				<Box width={'30%'}>
					<CommunitySearch
						width={'100%'}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setSearchTerm(e.target.value)
						}
						buttonProps={{
							onClick: handleSearch,
						}}
					/>
				</Box>
			</Box>
			{/* -- CONTENT -- */}
			<Box
				as="section"
				className={styles['onboarding-container__content']}
				width={'100%'}
				mt={'2.5rem'}
			>
				{selectedCommunities ? (
					<Grid xl={3} lg={3} sm={2} xs={1}>
						{selectedCommunities.map(community => (
							<GridItem key={community?.id}>
								<CommunityCard
									communityName={community?.name as string}
									communityId={community?.id as string}
									communityAdvisors={
										community?.communityAdvisors?.length as number
									}
									communityLeader={community.leader?.name as string}
									communityMembers={community.members?.length as number}
									selected={true}
									handleJoinCommunity={() =>
										handleJoinCommunity(
											community?.id as string,
											false,
											community?.name as string,
											community,
										)
									}
								/>
							</GridItem>
						))}
					</Grid>
				) : null}
				<Box mt={'2.5rem'}>
					{filteredCommunities ? (
						<Grid xl={3} lg={3} sm={2} xs={1}>
							{filteredCommunities.map(community => (
								<GridItem key={community?.id}>
									<CommunityCard
										communityName={community?.name as string}
										communityId={community?.id as string}
										communityAdvisors={
											community?.communityAdvisors?.length as number
										}
										communityLeader={community.leader?.name as string}
										communityMembers={community.members?.length as number}
										handleJoinCommunity={() =>
											handleJoinCommunity(
												community?.id as string,
												true,
												community?.name as string,
												community,
											)
										}
										shouldShowJoinButton={selectedCommunities.length === 0}
									/>
								</GridItem>
							))}
						</Grid>
					) : null}
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
						onClick={() => navigate(routePaths.onboarding.summary)}
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

export default OnboardingJoinCommunity;
