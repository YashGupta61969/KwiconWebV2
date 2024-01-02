import {
	Protected,
	cookies,
	envKeys,
	lazyImport,
	onMessageListener,
	requestForToken,
} from '@kwicon/commons';
import { withSuspense } from '@kwicon/components';
import {
	AppDispatch,
	addUserDevice,
	getOnboardingState,
	getUser,
	getUserDevices,
	updateUserDevice,
} from '@kwicon/features';
import { DashboardLayout, Header, SidebarDrawer } from '@kwicon/kwicon-ui';
import { getQuickbloxSliceState } from 'libs/features/src/lib/quickblox/slices/quickblox.slice';
import {
	QBInit,
	connectChatQB,
	connectToQB,
	getChatsQB,
	getDialogsQB,
} from 'libs/features/src/lib/quickblox/thunk-apis/quickblox';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { privateRoutes } from './private-app-routes';
import { publicRoutes } from './public-app-routes';
import decode from 'jwt-decode'
// @ts-ignore
import { getUserState } from 'libs/features/src/lib/user-profile/slices/user.slice';
import { getConnections } from 'libs/features/src/lib/user-profile/thunk-apis/get-connections';
import * as QB from 'quickblox/quickblox';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ChatClient, ChatMessageReceivedEvent } from '@azure/communication-chat';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { listThreadMessages, listThreads } from 'libs/features/src/lib/azure-commmunication/thunk-apis/azure';
import { getAzureSliceState } from 'libs/features/src/lib/azure-commmunication/slices/azure.slice';

// Lazy loaded component
const { Search } = lazyImport(() => import('@kwicon/features'), 'Search');

const { ProfileAvatar } = lazyImport(
	() => import('@kwicon/features'),
	'ProfileAvatar',
);

// with Suspense components
const SearchWithSuspense = withSuspense(Search);

/**
 * @description App Routes
 * Place all the app related routes here
 */
export const AppRoutes: React.FC = () => {
	const [fcmToken, setFcmToken] = useState('');
	const dispatch = useDispatch<AppDispatch>();
	const { QBinit, currentChat, currentDialog, userIdQB } = useSelector(
		getQuickbloxSliceState,
	);
	const { user } = useSelector(getOnboardingState);
	const { otherUser, currentThread } = useSelector(getAzureSliceState);
	const { userDevices } = useSelector(getUserState);

	useEffect(() => {
		requestForToken(setFcmToken);
		dispatch(getUserDevices());
	}, [dispatch]);

	const startRealtimeNotifications = async () => {
		try {
			const token: string | null = cookies.get('access_token');
			// @ts-ignore
			const { azureAccessToken } = decode(token)
			// @ts-ignore
			let chatClient = new ChatClient(envKeys.COMMUNICATION_SERVICES_ENDPOINT, new AzureCommunicationTokenCredential(azureAccessToken));

			await chatClient.startRealtimeNotifications();

			chatClient.on("chatMessageReceived", async (e) => {
				if(e.metadata.type === 'text') dispatch(listThreads(null))
				if ((e.metadata.type === 'text') && currentThread?.threadId === e.threadId) {
					await dispatch(listThreadMessages(e.metadata.threadId))
				}
			});

			chatClient.on("chatMessageEdited", async (e) => {
				if(currentThread?.threadId === e.threadId){
					await dispatch(listThreadMessages(e.metadata.threadId))
					dispatch(listThreads(null))
				}
			});

			chatClient.on('readReceiptReceived', async (e) => {
				if (currentThread?.threadId === e.threadId) {
					await dispatch(listThreadMessages(currentThread?.id));
				}
				dispatch(listThreads(null))
			})

			chatClient.on('chatMessageDeleted', async (e) => {
				if (currentThread?.threadId === e.threadId) {
					await dispatch(listThreadMessages(currentThread?.id));
				}
				dispatch(listThreads(null))
			})
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (user?.id) {
			startRealtimeNotifications();
		}
	}, [user?.id, otherUser?.id])

	// // if fcmToken is available then call the thunk api
	useEffect(() => {
		const { loadingStatus, devices } = userDevices;

		if (loadingStatus === 'loaded' && (devices?.length as number) > 0) {
			const device = devices?.find((device: any) => device.userId === user?.id);
			if (device?.id && fcmToken) {
				dispatch(
					updateUserDevice({
						userId: user?.id,
						id: device?.id,
						fcmToken: fcmToken,
						isActive: true,
					}),
				);
			}
		} else {
			if (loadingStatus === 'loaded' && fcmToken) {
				dispatch(
					addUserDevice({
						userId: user?.id,
						fcmToken: fcmToken,
						fcmTokenCreatedDate: new Date().toISOString(),
						isActive: true,
					}),
				);
			}
		}
	}, [fcmToken, dispatch, user?.id, userDevices]);

	onMessageListener()
		.then(payload => {
			// toast(payload?.notification?.body);
			toast.success(payload?.notification?.body, {
				autoClose: 1000,
				hideProgressBar: true,
				position: toast.POSITION.TOP_RIGHT,
			});
		})
		.catch(error => {
			// console.log('onMessageListener error', error);
		});

	useEffect(() => {
		// if (!QBinit) {
		// 	dispatch(QBInit());
		// 	dispatch(getUser());
		// }
		if (user) {
			dispatch(
				getConnections({
					type: 'advisor',
					limit: 100,
				}),
			);
			dispatch(
				getConnections({
					type: 'seeker',
					limit: 100,
				}),
			);
		}
	}, []);

	useEffect(() => {
		if (QBinit) {
			QB.chat.onMessageListener = (userId: any, message: any) => {
				if (
					currentChat?.dialog_id === message.dialog_id ||
					message.dialog_id === currentDialog?._id
				) {
					dispatch(
						getChatsQB({
							chat_dialog_id: message.dialog_id,
							limit: 100,
							sort_asc: 'date_sent',
						}),
					);

					const params = {
						messageId: message.id,
						userId: userIdQB,
						dialogId: message.dialog_id,
					};

					QB.chat.sendReadStatus(params);
				}
				dispatch(getDialogsQB({ limit: 100 }));
			};

			QB.chat.onReadStatusListener = (messageId, dialogId, userId) => {
				// console.log('onReadStatusListener', messageId, dialogId, userId);
				if (currentDialog?._id === dialogId) {
					dispatch(
						getChatsQB({
							chat_dialog_id: dialogId,
							limit: 100,
							sort_asc: 'date_sent',
						}),
					);
				}
			};
		}
	}, [QBinit, currentChat, currentDialog]);

	// useEffect(() => {
	// 	if (user?.quickbloxUserId) {
	// 		dispatch(
	// 			connectToQB({
	// 				email: user?.email,
	// 				password: user?.id,
	// 			}),
	// 		);
	// 		dispatch(
	// 			connectChatQB({
	// 				userId: user?.quickbloxUserId,
	// 				password: user?.id,
	// 			}),
	// 		);
	// 	}
	// }, [user?.quickbloxUserId]);

	return (
		<Routes>
			{/*
        -- PUBLIC ROUTES | NO LAYOUT -- | INITIAL ROUTE
      */}
			<Route
				path={publicRoutes.auth.path}
				element={publicRoutes.auth.element}
			/>
			{/*
        -- ONBOARDING ROUTES | NO LAYOUT --
      */}
			{/* -- Onboarding Select Role -- */}
			<Route
				path={privateRoutes.onboarding.selectRole.path}
				element={privateRoutes.onboarding.selectRole.element}
			/>
			{/* -- Onboarding Start -- */}
			<Route
				path={privateRoutes.onboarding.path}
				element={privateRoutes.onboarding.element}
			/>
			{/* -- Onboarding Profile Summary -- */}
			<Route
				path={privateRoutes.onboarding.profileSummary.path}
				element={privateRoutes.onboarding.profileSummary.element}
			/>
			{/*
        -- CHANGE ROLE ROUTES --
      */}
			{/* -- Change Role Select Role -- */}
			<Route
				path={privateRoutes.changeRole.selectRole.path}
				element={privateRoutes.changeRole.selectRole.element}
			/>
			{/* -- Change Role Start -- */}
			<Route
				path={privateRoutes.changeRole.path}
				element={privateRoutes.changeRole.element}
			/>
			{/* -- Change Role Profile Summary -- */}
			<Route
				path={privateRoutes.changeRole.profileSummary.path}
				element={privateRoutes.changeRole.profileSummary.element}
			/>
			{/*
        -- ROOT ROUTES | WITH LAYOUT --
      */}
			{/* -- Home -- */}
			<Route
				path="/"
				element={
					<Protected
						element={
							<DashboardLayout
								header={
									<Header
										searchComponent={<SearchWithSuspense />}
										avatarBox={<ProfileAvatar />}
									/>
								}
								sidebar={<SidebarDrawer />}
							/>
						}
					/>
				}
			>
				<Route
					path={privateRoutes.home.path}
					element={privateRoutes.home.element}
				/>
				{/* -- User Profile  -- */}
				<Route
					path={privateRoutes.user.path}
					element={privateRoutes.user.element}
				/>
				<Route
					path={privateRoutes.user.edit.path}
					element={privateRoutes.user.edit.element}
				/>
				<Route
					path={privateRoutes.user.aboutMe.path}
					element={privateRoutes.user.aboutMe.element}
				/>
				<Route
					path={privateRoutes.user.interests.path}
					element={privateRoutes.user.interests.element}
				/>
				<Route
					path={privateRoutes.user.expertise.path}
					element={privateRoutes.user.expertise.element}
				/>
				{/* User Experiences */}
				<Route
					path={privateRoutes.user.experiences.path}
					element={privateRoutes.user.experiences.element}
				/>
				<Route
					path={privateRoutes.user.addExperience.path}
					element={privateRoutes.user.addExperience.element}
				/>
				<Route
					path={privateRoutes.user.updateExperience.path}
					element={privateRoutes.user.updateExperience.element}
				/>
				{/* User Educations */}
				<Route
					path={privateRoutes.user.educations.path}
					element={privateRoutes.user.educations.element}
				/>
				<Route
					path={privateRoutes.user.addEducation.path}
					element={privateRoutes.user.addEducation.element}
				/>
				<Route
					path={privateRoutes.user.updateEducation.path}
					element={privateRoutes.user.updateEducation.element}
				/>
				<Route
					path={privateRoutes.user.achievements.path}
					element={privateRoutes.user.achievements.element}
				/>
				<Route
					path={privateRoutes.user.addAchievement.path}
					element={privateRoutes.user.addAchievement.element}
				/>
				<Route
					path={privateRoutes.user.updateAchievement.path}
					element={privateRoutes.user.updateAchievement.element}
				/>
				<Route
					path={privateRoutes.user.certificates.path}
					element={privateRoutes.user.certificates.element}
				/>
				<Route
					path={privateRoutes.user.addCertificate.path}
					element={privateRoutes.user.addCertificate.element}
				/>
				<Route
					path={privateRoutes.user.updateCertificate.path}
					element={privateRoutes.user.updateCertificate.element}
				/>
				<Route
					path={privateRoutes.user.publicePorfile.path}
					element={privateRoutes.user.publicePorfile.element}
				/>
				<Route
					path={privateRoutes.user.publicEducations.path}
					element={privateRoutes.user.publicEducations.element}
				/>
				<Route
					path={privateRoutes.user.publicExperiences.path}
					element={privateRoutes.user.publicExperiences.element}
				/>
				<Route
					path={privateRoutes.user.publicAchievements.path}
					element={privateRoutes.user.publicAchievements.element}
				/>
				<Route
					path={privateRoutes.user.publicCertificates.path}
					element={privateRoutes.user.publicCertificates.element}
				/>

				{/* -- Universal Search  -- */}
				<Route
					path={privateRoutes.home.search.path}
					element={privateRoutes.home.search.element}
				/>

				{/* My Connections */}
				<Route
					path={privateRoutes.myConnections.path}
					element={privateRoutes.myConnections.element}
				/>
				{/* My Invitations */}
				<Route
					path={privateRoutes.myInvitation.path}
					element={privateRoutes.myInvitation.element}
				/>

				{/* Other user profiles */}
				<Route
					path={privateRoutes.otherUserProfile.path}
					element={privateRoutes.otherUserProfile.element}
				/>

				{/* Chat */}
				<Route
					path={privateRoutes.chat.path}
					element={privateRoutes.chat.element}
				/>

				{/* Single Posts */}
				<Route
					path={privateRoutes.post.singlePost.path}
					element={privateRoutes.post.singlePost.element}
				/>

				<Route
					path={privateRoutes.post.myPosts.path}
					element={privateRoutes.post.myPosts.element}
				/>

				{/* Account Settings */}
				<Route
					path={privateRoutes.settings.path}
					element={privateRoutes.settings.element}
				/>
			</Route>
		</Routes>
	);
};
