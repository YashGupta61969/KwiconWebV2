import {
	Box,
	Breadcrumb,
	Chip,
	IconButton,
	Paper,
	TabBar,
} from '@kwicon/kwicon-ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOnboardingState } from '../onboarding/slices/onboarding.slice';
import { useEffect, useMemo, useState } from 'react';
import { AppDispatch } from '../app-store/app-store';
import { getUser } from '../onboarding/thunk-apis/get-user';
import { getAllConnectionReq } from '../other-user-profile/thunk-apis/get-all-connection-req';
import { thunkString } from '../other-user-profile/thunk-apis/thunk-string';
import { useTheme } from 'styled-components';
import { BsChevronRight } from 'react-icons/bs';
import { routePaths } from '@kwicon/commons';
import {
	getOtherUserProfileState,
	otherUserProfileActions,
} from '../other-user-profile/slices/other-user-profile.slice';
import { getConnections } from '../user-profile/thunk-apis/get-connections';
import { getUserState } from '../user-profile/slices/user.slice';
import { ConnectionCard } from './components/connection-card';

export function MyConnections() {
	const { user: onboardingUser } = useSelector(getOnboardingState);
	const { user } = useSelector(getUserState);

	const { receivedRequests, sentRequests } = useSelector(
		getOtherUserProfileState,
	);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const theme = useTheme();

	const [connectedAdvisors, setConnectedAdvisors] = useState([]);
	const [connectedStudents, setConnectedStudents] = useState([]);

	const [selectedTab, setSelectedTab] = useState(0);

	useEffect(() => {
		if (onboardingUser?.id) {
			handleGetReceivedConnectionRequests();
			handleGetSentConnectionRequests();
		}
	}, [onboardingUser?.id]);

	useEffect(() => {
		handleGetAdvisorsConnection();
		handleGetSeekersConnection();
	}, []);

	// get user function
	const handleGetUser = async () => {
		try {
			await dispatch(getUser());
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const handleGetReceivedConnectionRequests = async () => {
		try {
			const response = await dispatch(getAllConnectionReq('received'));
			if (
				response.type === `${thunkString.getAllConnectionRequests}/fulfilled`
			) {
				dispatch(otherUserProfileActions.setReceivedRequests(response.payload));
			}
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const handleGetSentConnectionRequests = async () => {
		try {
			const response = await dispatch(getAllConnectionReq('sent'));
			if (
				response.type === `${thunkString.getAllConnectionRequests}/fulfilled`
			) {
				dispatch(otherUserProfileActions.setSentRequests(response.payload));
			}
		} catch (error) {
			throw new Error(error as string);
		}
	};

	useEffect(() => {
		handleGetUser();
	}, []);

	const tabs = [
		{
			value: 0,
			label: `Advisors (${
				connectedAdvisors?.filter((connection: any) => connection?.isActive)
					?.length ?? 0
			})`,
		},
		{
			value: 1,
			label: `Students (${
				connectedStudents?.filter((connection: any) => connection?.isActive)
					?.length ?? 0
			})`,
		},
	];

	const handleGetAdvisorsConnection = async () => {
		try {
			const response = await dispatch(
				getConnections({
					type: 'advisor',
					limit: 100,
				}),
			);
			setConnectedAdvisors(response.payload.docs);
		} catch (error) {
			throw new Error(error as string);
		}
	};
	const handleGetSeekersConnection = async () => {
		try {
			const response = await dispatch(
				getConnections({
					type: 'seeker',
					limit: 100,
				}),
			);
			setConnectedStudents(response.payload.docs);
		} catch (error) {
			throw new Error(error as string);
		}
	};

	return (
		<Box>
			<Breadcrumb navigate={navigate} />
			{/* INVITATION */}
			<Paper
				mt={'2rem'}
				bg="white"
				style={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Box>
					<Box
						style={{
							fontSize: '1rem',
							color: theme.palettes.colors.darkBlue[0],
							fontWeight: 600,
						}}
					>
						Invitations
					</Box>
					<Box
						mt={'0.5rem'}
						style={{
							display: 'flex',
							gap: '0.5rem',
							fontSize: '0.875rem',
						}}
					>
						<Box>
							<Box as="span" color="#828282">
								Received
							</Box>{' '}
							<Box
								as="span"
								color="#4F4F4F"
								style={{
									fontWeight: 700,
								}}
							>
								{receivedRequests?.awaiting?.length}
							</Box>
						</Box>
						<Box>
							<Box as="span" color="#828282">
								Sent
							</Box>{' '}
							<Box
								as="span"
								color="#4F4F4F"
								style={{
									fontWeight: 700,
								}}
							>
								{sentRequests?.awaiting?.length}
							</Box>
						</Box>
					</Box>
				</Box>
				<Box
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '0.5rem',
					}}
				>
					{receivedRequests?.awaiting?.length > 0 && (
						<Chip
							style={{
								padding: '4px 8px',
							}}
							bg={theme.palettes.error[1]}
							color={theme.palettes.colors.white as string}
						>
							{receivedRequests?.awaiting?.length} New
						</Chip>
					)}
					<IconButton
						onClick={() =>
							navigate(routePaths.myConnections.invitations, {
								state: {
									receivedRequests,
									sentRequests,
								},
							})
						}
					>
						<BsChevronRight />
					</IconButton>
				</Box>
			</Paper>

			{/* CONNECTIONS RESULTS*/}
			{/* TAB BAR */}
			<Box mt={'2rem'} width={'50%'}>
				<TabBar
					tabs={tabs}
					selected={selectedTab}
					setSelected={setSelectedTab}
				/>
			</Box>

			{/* TAB CONTENT */}
			<Box mt={'2rem'}>
				{selectedTab === 0 ? (
					connectedAdvisors?.length > 0 ? (
						<Box>
							{connectedAdvisors
								?.filter((connection: any) => connection?.isActive)
								?.map(connection => (
									<ConnectionCard
										key={connection?.id}
										connection={connection}
										fetchConnection={handleGetAdvisorsConnection}
									/>
								))}
						</Box>
					) : (
						<Box>You don't have any connected advisors</Box>
					)
				) : connectedStudents?.length > 0 ? (
					<Box>
						{connectedStudents
							?.filter((connection: any) => connection?.isActive)
							?.map(connection => (
								<ConnectionCard
									key={connection?.id}
									connection={connection}
									fetchConnection={handleGetSeekersConnection}
								/>
							))}
					</Box>
				) : (
					<Box>You don't have any connected students</Box>
				)}
			</Box>
		</Box>
	);
}

export default MyConnections;
