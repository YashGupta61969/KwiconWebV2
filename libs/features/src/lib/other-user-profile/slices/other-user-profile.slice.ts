import { createSlice } from '@reduxjs/toolkit';
import { sendOrWithdrawConnectionRequest } from '../thunk-apis/send-withdraw-connection-request';
import { RootState } from '../../app-store/app-store';
import { getAllConnectionReq } from '../thunk-apis/get-all-connection-req';
import { acceptOrRejectConnectionRequest } from '../thunk-apis/accept-reject-connection-requests';
import { toast } from 'react-toastify';

export const OTHER_USER_PROFILE_FEATURE_KEY = 'otherUserProfile';

// will fix this later
const initialState: {
	loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
	error: string | null;
	data: any;
	sentRequests: any[];
	receivedRequests: any[];
	isConnected: boolean;
} = {
	loadingStatus: 'not loaded',
	error: null,
	data: null,
	sentRequests: [],
	receivedRequests: [],
	isConnected: false,
};

export const otherUserProfileSlice = createSlice({
	name: OTHER_USER_PROFILE_FEATURE_KEY,
	initialState,
	reducers: {
		setSentRequests: (state, action) => {
			state.sentRequests = action.payload;
		},
		setReceivedRequests: (state, action) => {
			state.receivedRequests = action.payload;
		},
	},
	// sendOrWithdrawConnectionRequest
	extraReducers: builder => {
		builder
			.addCase(
				sendOrWithdrawConnectionRequest.pending,
				(state: {
					loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
					error: string | null;
					data: any;
				}) => {
					state.loadingStatus = 'loading';
				},
			)
			.addCase(
				sendOrWithdrawConnectionRequest.fulfilled,
				(state: {
					loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
					error: string | null;
					data: any;
				}) => {
					state.loadingStatus = 'loaded';
				},
			)
			.addCase(
				sendOrWithdrawConnectionRequest.rejected,
				(
					state: {
						loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
						error: string | null | undefined;
						data: any;
					},
					action,
				) => {
					state.loadingStatus = 'error';
					toast.error("Couldn't send request");
					state.error = action.error.message;
				},
			);

		// getAllConnectionReq
		builder
			.addCase(getAllConnectionReq.pending, (state: any) => {
				state.loadingStatus = 'loading';
			})
			.addCase(getAllConnectionReq.fulfilled, (state: any, action) => {
				state.loadingStatus = 'loaded';
				state.data = action.payload;
			})
			.addCase(getAllConnectionReq.rejected, (state: any, action) => {
				state.loadingStatus = 'error';
				state.error = action.error.message;
			});

		// accept or reject connection request
		builder
			.addCase(acceptOrRejectConnectionRequest.pending, (state: any) => {
				state.loadingStatus = 'loading';
			})
			.addCase(
				acceptOrRejectConnectionRequest.fulfilled,
				(state: any, action) => {
					state.loadingStatus = 'loaded';
				},
			)
			.addCase(
				acceptOrRejectConnectionRequest.rejected,
				(state: any, action) => {
					state.loadingStatus = 'error';
					state.error = action.error.message;
				},
			);
	},
});

export const otherUserProfileReducer = otherUserProfileSlice.reducer;
export const otherUserProfileActions = otherUserProfileSlice.actions;

export const getOtherUserProfileState = (
	rootState: RootState,
): {
	loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
	error: string | null;
	data: any;
	sentRequests: any;
	receivedRequests: any;
} => rootState[OTHER_USER_PROFILE_FEATURE_KEY];
