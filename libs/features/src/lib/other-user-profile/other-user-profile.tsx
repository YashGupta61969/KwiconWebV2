/* eslint-disable react/jsx-no-useless-fragment */
import { Icons, routePaths } from '@kwicon/commons';
import {
	Box,
	Breadcrumb,
	Button,
	ButtonDropdown,
	Heading,
} from '@kwicon/kwicon-ui';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../app-store/app-store';
import { getUser } from '../onboarding/thunk-apis/get-user';
import { createDialogQB, getChatsQB } from '../quickblox/thunk-apis/quickblox';
import { UserAbout } from '../user-profile/components/user-about';
import { UserAchievement } from '../user-profile/components/user-achievement';
import { UserCertificate } from '../user-profile/components/user-certificate';
import { UserEducation } from '../user-profile/components/user-education';
import { UserExperience } from '../user-profile/components/user-experience';
import { UserExpertise } from '../user-profile/components/user-expertise';
import { UserInterest } from '../user-profile/components/user-interest';
import { getUserState } from '../user-profile/slices/user.slice';
import { getPublicUser } from '../user-profile/thunk-apis/get-public-user';
import { ConnectionModal } from './components/connection-modal';
import { ProfileCard } from './components/profile-card';
import { getOtherUserProfileState } from './slices/other-user-profile.slice';
import { getAllConnectionReq } from './thunk-apis/get-all-connection-req';
import { sendOrWithdrawConnectionRequest } from './thunk-apis/send-withdraw-connection-request';
import { thunkString } from './thunk-apis/thunk-string';

export function OtherUserProfile() {
	const dispatch = useDispatch<AppDispatch>();
	const { data } = useSelector(getOtherUserProfileState);
	const { user, publicUser } = useSelector(getUserState);

	const navigate = useNavigate();
	const { state } = useLocation();
	const theme = useTheme();
	const { id: name } = useParams<{ id: string }>();

	const [showConnectionModal, setShowConnectionModal] = useState(false);
	const [showWithdrawButton, setShowWithdrawButton] = useState(false);
	const [showChatButton, setShowChatButton] = useState(false);
	const [connectionReqId, setConnectionReqId] = useState('');

	useEffect(() => {
		if (
			data?.awaiting?.find((item: any) => item?.to?.id === state?.advisor?.id)
		) {
			setShowWithdrawButton(true);
			setConnectionReqId(
				data?.awaiting?.find((item: any) => item?.to?.id === state?.advisor?.id)
					?.id,
			);
		} else {
			setShowWithdrawButton(false);
			setConnectionReqId('');
		}
	}, [data?.awaiting, state?.advisor?.id]);

	useEffect(() => {
		if (user?.connections?.advisor) {
			if (
				user?.connections?.advisor?.find(
					(item: any) => item?.id === state?.advisor?.id,
				)
			) {
				setShowChatButton(true);
			} else {
				setShowChatButton(false);
			}
		}
	}, [user?.connections?.advisor, state?.advisor?.id]);

	useEffect(() => {
		// get all connection requests
		handleGetUser();
	}, []);

	useEffect(() => {
		// get all connection requests
		handleGetAllConnectionRequests('sent');
	}, []);

	useEffect(() => {
		if (state?.advisor?.id) {
			handleGetPublicUser(state?.advisor?.id);
		}
	}, [state?.advisor?.id]);

	const handleGetPublicUser = async (id: string) => {
		try {
			await dispatch(getPublicUser(id));
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const handleGetAllConnectionRequests = async (type: string) => {
		try {
			await dispatch(getAllConnectionReq(type));
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const handleWithdrawConnection = async () => {
		try {
			const response = await dispatch(
				sendOrWithdrawConnectionRequest({
					isSent: false,
					toUserId: state?.advisor?.id,
					connectionRequestId: connectionReqId,
				}),
			);
			if (
				response.type ===
				`${thunkString.sendOrWithdrawConnectionRequest}/fulfilled`
			) {
				toast.success('Connection request withdrawn successfully');
				handleGetAllConnectionRequests('sent');
				handleGetUser();
			}
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const handleGetUser = async () => {
		try {
			await dispatch(getUser());
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const handleChatClick = async (
		QBUserId: number,
		userId: string,
		photoId: string,
		profession: string,
	) => {
		const response = await dispatch(
			createDialogQB({
				type: 3,
				occupants_ids: [QBUserId],
				data: {
					class_name: 'kwiconCustomData',
					userId,
					photoId,
					profession,
				},
			}),
		);

		dispatch(
			getChatsQB({
				chat_dialog_id: response?.payload._id,
				sort_asc: 'date_sent',
				limit: 100,
			}),
		);

		navigate('/chat');
	};

	return (
		<Box>
			<Breadcrumb navigate={navigate} elements={[name]} />

			{/* Profile Name */}
			<Box
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Heading
					// fixed
					type="h1"
					style={{
						fontSize: '1.75rem',
					}}
				>
					{name}
				</Heading>
				<Box
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '0.5rem',
					}}
				>
					{!showChatButton ? (
						<>
							{!showWithdrawButton ? (
								<Button
									variant="primary"
									size="small"
									px={'2rem'}
									style={{
										borderRadius: '0.5rem',
									}}
									onClick={() => setShowConnectionModal(true)}
								>
									Connect
								</Button>
							) : (
								<Button
									variant="secondary"
									size="small"
									px={'2rem'}
									style={{
										borderRadius: '0.5rem',
									}}
									onClick={handleWithdrawConnection}
								>
									Withdraw Request
								</Button>
							)}
						</>
					) : (
						<Button
							variant="primary"
							size="small"
							style={{
								borderRadius: '0.5rem',
							}}
							px={'2rem'}
							onClick={() =>
								handleChatClick(
									state?.advisor?.quickbloxUserId,
									state?.advisor?.id,
									state?.advisor?.profilePicture,
									state?.advisor?.profession,
								)
							}
						>
							Chat
						</Button>
					)}
					<ButtonDropdown
						variant="secondary"
						content={
							<Box
								width={'1rem'}
								p={'0.5rem'}
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Icons.ThreeDotsIcon />
							</Box>
						}
						style={{
							cursor: 'pointer',
							background: 'white',
							borderRadius: '0.5rem',
						}}
						dropdownWrapperStyle={{
							overflow: 'hidden',
							marginTop: '0.5rem',
						}}
					>
						<Box
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '1rem',
							}}
						>
							<Box mt={'0.5rem'}>
								<Icons.ErrorCircleIcon />
							</Box>
							<Box
								style={{
									fontSize: '1rem',
									width: '8rem',
									fontWeight: '500',
									color: theme.palettes.error[1],
								}}
							>
								Report User
							</Box>
						</Box>
					</ButtonDropdown>
				</Box>
			</Box>

			{/* Profile Info 1st */}
			<Box>
				<ProfileCard
					advisor={state?.advisor}
					mediaId={state?.advisor?.profilePicture}
				/>
			</Box>
			<Box mb={'2rem'}>
				{/*  About */}
				{publicUser?.user?.about && (
					<UserAbout about={publicUser?.user?.about} />
				)}

				{/*   Interests */}
				{publicUser?.user?.interests?.length > 0 && (
					<UserInterest
						showMessage={false}
						interests={publicUser?.user?.interests}
					/>
				)}

				{/* Expertise */}
				{publicUser?.user?.specialization?.length > 0 && (
					<UserExpertise
						showMessage={false}
						expertise={publicUser?.user?.specialization}
					/>
				)}

				{publicUser?.user?.experience?.length > 0 && (
					<Box>
						<UserExperience
							showMessage={false}
							experience={publicUser?.user?.experience}
						/>
						{publicUser?.user?.experience?.length > 0 && (
							<Box
								onClick={() =>
									navigate(routePaths.user.experiences.root, {
										state: {
											publicId: publicUser?.user?.id,
										},
									})
								}
							>
								<Button variant="text">
									See all{' '}
									{`${publicUser?.user?.experience?.length} experiences`}
								</Button>
							</Box>
						)}
					</Box>
				)}

				{/* Education */}
				{publicUser?.user?.education?.length > 0 && (
					<Box>
						<UserEducation
							showMessage={false}
							educations={publicUser?.user?.education}
						/>
						{publicUser?.user?.education?.length > 0 && (
							<Box
								onClick={() =>
									navigate(routePaths.user.education.root, {
										state: {
											publicId: publicUser?.user?.id,
										},
									})
								}
							>
								<Button variant="text">
									See all {`${publicUser?.user?.education?.length} education`}
								</Button>
							</Box>
						)}
					</Box>
				)}

				{/* Certificates */}
				{publicUser?.user?.programs?.length > 0 && (
					<Box>
						<UserCertificate
							showMessage={false}
							programs={publicUser?.user?.programs}
						/>
						{publicUser?.user?.programs?.length > 0 && (
							<Box
								onClick={() =>
									navigate(routePaths.user.certificate.root, {
										state: {
											publicId: publicUser?.user?.id,
										},
									})
								}
							>
								<Button variant="text">
									See all {`${publicUser?.user?.programs?.length} certificates`}
								</Button>
							</Box>
						)}
					</Box>
				)}

				{/* Achievement */}
				{publicUser?.user?.recognitions?.length > 0 && (
					<Box>
						<UserAchievement
							showMessage={false}
							recognitions={publicUser?.user?.recognitions}
						/>
						{publicUser?.user?.recognitions?.length > 0 && (
							<Box
								onClick={() =>
									navigate(routePaths.user.achievement.root, {
										state: {
											publicId: publicUser?.user?.id,
										},
									})
								}
							>
								<Button variant="text">
									See all{' '}
									{`${publicUser?.user?.recognitions?.length} achievements`}
								</Button>
							</Box>
						)}
					</Box>
				)}
			</Box>
			{/* Modal */}
			<ConnectionModal
				isOpen={showConnectionModal}
				advisor={state?.advisor}
				handleClose={() => setShowConnectionModal(false)}
				handleGetAllConnectionRequests={handleGetAllConnectionRequests}
				handleGetUser={handleGetUser}
			/>
		</Box>
	);
}

export default OtherUserProfile;
