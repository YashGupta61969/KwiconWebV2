import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../../app-store/app-store';
import {
	QBInit,
	connectChatQB,
	connectToQB,
	createDialogQB,
	createUserQB,
	getChatsQB,
	getDialogsQB,
	listUsersQB,
} from '../thunk-apis/quickblox';
import { storageKeys } from '@kwicon/commons';

export const QUICKBLOX_FEATURE_KEY = 'quickblox';

const initialQuickbloxState = {
	loadingStatus: 'not loaded',
	error: null,
	data: null,
	QBinit: false,
	QBChatConnected: false,
	userIdQB: 0,
	currentQBUser: null,
	currentChat: {
		items: [],
		limit: 0,
		skip: 0,
		dialog_id: '',
	},
	currentDialog: null,
	allDialogs: {
		items: [],
		limit: 0,
		skip: 0,
		total_entries: 0,
	},
	totalPages: 0,
	searchedAdvisors: [],
	currentPage: 0,
	Limit: 0,
};

export const quickbloxSlice = createSlice({
	name: QUICKBLOX_FEATURE_KEY,
	initialState: initialQuickbloxState,
	reducers: {
		setCurrentDialog(state, action) {
			state.currentDialog = action.payload;
		},
	},
	extraReducers: builder => {
		/**
		 * Set quickblox SDK init status
		 */
		builder
			.addCase(QBInit.pending, state => {
				state.loadingStatus = 'loading';
			})
			.addCase(QBInit.fulfilled, (state, action) => {
				state.loadingStatus = 'loaded';
				state.QBinit = true;
			})
			.addCase(QBInit.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.error = action.error.message;
				toast.error('Error while initializing QB');
			});

		/**
		 * Set quickblox SDK init status
		 */
		builder
			.addCase(connectChatQB.pending, state => {
				state.loadingStatus = 'loading';
			})
			.addCase(connectChatQB.fulfilled, (state, action) => {
				state.loadingStatus = 'loaded';
				state.QBChatConnected = true;
			})
			.addCase(connectChatQB.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.error = action.error.message;
				toast.error('Error while connecting to QB chat');
			});

		/**
		 * Set current Quickblox user
		 */
		builder
			.addCase(createUserQB.pending, state => {
				state.loadingStatus = 'loading';
			})
			.addCase(createUserQB.fulfilled, (state, action) => {
				state.loadingStatus = 'loaded';
				state.currentQBUser = action.payload;
			})
			.addCase(createUserQB.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.error = action.error.message;
				toast.error('Error while creating QB user');
			});

		/**
		 * Set Quickblox user id
		 */
		builder
			.addCase(connectToQB.pending, state => {
				state.loadingStatus = 'loading';
			})
			.addCase(connectToQB.fulfilled, (state, action) => {
				state.loadingStatus = 'loaded';
				state.userIdQB = action.payload.user_id;

				sessionStorage.setItem(
					storageKeys.KEY_OF_QB_TOKEN,
					action.payload.token,
				);
			})
			.addCase(connectToQB.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.error = action.error.message;
				toast.error('Error while connecting to QB');
			});

		/**
		 * Set Current Dialog
		 */
		builder
			.addCase(createDialogQB.pending, state => {
				state.loadingStatus = 'loading';
			})
			.addCase(createDialogQB.fulfilled, (state, action) => {
				state.loadingStatus = 'loaded';
				state.currentDialog = action.payload;
			})
			.addCase(createDialogQB.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.error = action.error.message;
				toast.error('Error while creating dialog of QB');
			});

		/**
		 * Set All Dialogs
		 */
		builder
			.addCase(getDialogsQB.pending, state => {
				state.loadingStatus = 'loading';
			})
			.addCase(getDialogsQB.fulfilled, (state, action) => {
				state.loadingStatus = 'loaded';
				state.allDialogs = action.payload;
			})
			.addCase(getDialogsQB.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.error = action.error.message;
				toast.error('Error while getting all dialogs of QB');
			});

		/**
		 * Set Current Chat
		 */
		builder
			.addCase(getChatsQB.pending, state => {
				state.loadingStatus = 'loading';
			})
			.addCase(getChatsQB.fulfilled, (state, action) => {
				state.loadingStatus = 'loaded';
				state.currentChat = action.payload;
			})
			.addCase(getChatsQB.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.error = action.error.message;
				toast.error('Error while getting chats of QB');
			});
	},
});

/*
 * Exporting reducer for store configuration.
 */
export const quickbloxReducer = quickbloxSlice.reducer;

export const quickbloxActions = quickbloxSlice.actions;

export const getQuickbloxSliceState = (rootState: RootState) =>
	rootState[QUICKBLOX_FEATURE_KEY];
