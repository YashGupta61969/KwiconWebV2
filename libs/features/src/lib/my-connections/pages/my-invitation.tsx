import { Box, Breadcrumb, Heading, TabBar } from '@kwicon/kwicon-ui';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReceivedCard } from '../components/received-card';
import { AppDispatch } from '../../app-store/app-store';
import { useDispatch, useSelector } from 'react-redux';
import { acceptOrRejectConnectionRequest } from '../../other-user-profile/thunk-apis/accept-reject-connection-requests';
import { thunkString } from '../../other-user-profile/thunk-apis/thunk-string';
import { getAllConnectionReq } from '../../other-user-profile/thunk-apis/get-all-connection-req';
import {
	getOtherUserProfileState,
	otherUserProfileActions,
} from '../../other-user-profile/slices/other-user-profile.slice';
import { toast } from 'react-toastify';
import { SentCard } from '../components/sent-card';
import { sendOrWithdrawConnectionRequest } from '../../other-user-profile/thunk-apis/send-withdraw-connection-request';

export function MyInvitation() {
	const { receivedRequests, sentRequests } = useSelector(
		getOtherUserProfileState,
	);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const [selected, setSelected] = useState(0);

	const tabs = [
		{
			value: 0,
			label: `Received ${receivedRequests?.awaiting?.length ?? 0}`,
		},
		{
			value: 1,
			label: `Sent ${sentRequests?.awaiting?.length ?? 0}`,
		},
	];

	const handleAcceptConnectionRequest = async (
		connectionRequestId: string,
		type: string,
		fromUserId: string,
		data?: any,
	) => {
		if (type === 'accept') {
			try {
				const response = await dispatch(
					acceptOrRejectConnectionRequest({
						isAccepted: true,
						fromUserId,
						connectionRequestId,
					}),
				);

				if (
					response?.type ===
					`${thunkString.acceptOrRejectConnectionRequest}/fulfilled`
				) {
					toast.success('Connection request accepted');
					handleGetReceivedConnectionRequests();
				}
			} catch (error) {
				throw new Error(error as string);
			}
		} else {
			try {
				const response = await dispatch(
					acceptOrRejectConnectionRequest({
						isAccepted: false,
						fromUserId,
						connectionRequestId,
						rejectReason: data?.reason,
					}),
				);

				if (
					response?.type ===
					`${thunkString.acceptOrRejectConnectionRequest}/fulfilled`
				) {
					toast.success('Connection request rejected');
					handleGetReceivedConnectionRequests();
				}
			} catch (error) {
				throw new Error(error as string);
			}
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

	const handleWithdrawConnection = async (id: string, connectId: string) => {
		try {
			const response = await dispatch(
				sendOrWithdrawConnectionRequest({
					isSent: false,
					toUserId: id,
					connectionRequestId: connectId,
				}),
			);
			if (
				response.type ===
				`${thunkString.sendOrWithdrawConnectionRequest}/fulfilled`
			) {
				toast.success('Connection request withdrawn successfully');
				handleGetSentConnectionRequests();
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
		if (selected === 0) {
			handleGetReceivedConnectionRequests();
		} else {
			handleGetSentConnectionRequests();
		}
	}, [selected]);

	return (
		<Box>
			<Breadcrumb navigate={navigate} />
			<Box mt={'2rem'}>
				{/* TITLE */}
				<Heading
					type="h1"
					style={{
						fontSize: '1.75rem',
					}}
				>
					Invitations
				</Heading>

				{/* Tab */}
				<Box mt={'2rem'} width={'50%'}>
					<TabBar tabs={tabs} selected={selected} setSelected={setSelected} />
				</Box>

				{/* Tab Content */}
				<Box mt={'2rem'}>
					{selected === 0 ? (
						// eslint-disable-next-line react/jsx-no-useless-fragment
						<>
							{receivedRequests?.awaiting?.length !== 0 ? (
								<Box>
									{receivedRequests?.awaiting?.map(
										(awaiting: any, index: number) => (
											<ReceivedCard
												key={index}
												awaiting={awaiting}
												handleAcceptConnectionRequest={
													handleAcceptConnectionRequest
												}
											/>
										),
									)}
								</Box>
							) : (
								<Box>No received requests</Box>
							)}
						</>
					) : (
						// eslint-disable-next-line react/jsx-no-useless-fragment
						<>
							{sentRequests?.awaiting?.length !== 0 ? (
								<Box>
									{sentRequests?.awaiting?.map(
										(awaiting: any, index: number) => (
											<SentCard
												key={index}
												awaiting={awaiting}
												handleWithdraw={handleWithdrawConnection}
											/>
										),
									)}
								</Box>
							) : (
								<Box>No sent requests</Box>
							)}
						</>
					)}
				</Box>
			</Box>
		</Box>
	);
}

export default MyInvitation;
