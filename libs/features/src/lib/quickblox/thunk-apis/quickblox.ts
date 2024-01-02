import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
// @ts-ignore
import * as QB from 'quickblox/quickblox';
import { envKeys, storageKeys } from '@kwicon/commons';
import axios from 'axios';

export const QBInit = createAsyncThunk(
	thunkString.QBInit,
	async (payload, thunkAPI) => {
		try {
			const appId = envKeys.QB_APP_ID;
			const accKey = envKeys.QB_ACCOUNT_KEY;
			const authKey = envKeys.QB_AUTH_KEY;
			const authSecret = envKeys.QB_AUTH_SECRET;

			await QB.init(appId, authKey, authSecret, accKey);
			// console.log('QBInit');
			return Promise.resolve();
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

export const connectToQB = createAsyncThunk(
	thunkString.connectToQB,
	async (payload: { email: string; password: string }, thunkAPI) => {
		try {
			const res = await new Promise((resolve, reject) => {
				// @ts-ignore
				QB.createSession(payload, function (err, res) {
					if (err) {
						reject(err);
					} else {
						resolve(res);
					}
				});
			});
			// console.log('connectToQB ', res);

			return Promise.resolve(res);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

export const createUserQB = createAsyncThunk(
	thunkString.createUserQB,
	async (
		payload: {
			email: string;
			login: string;
			password: string;
			full_name: string;
			custom_data: string;
		},
		thunkAPI,
	) => {
		try {
			const res = await new Promise((resolve, reject) => {
				// @ts-ignore
				QB.createSession(function (err, res) {
					// console.log('QB.users.createSession ', err, res);
					if (res) {
						// @ts-ignore
						QB.users.create(payload, function (err, res) {
							if (err) {
								reject(err);
							} else {
								resolve(res);
							}
						});
					}
				});
			});

			// console.log('QB.users.create ', res);
			return Promise.resolve(res);
		} catch (error) {
			// console.log('QB.users.create error ', error);
			return thunkAPI.rejectWithValue(error);
		}
	},
);

export const connectChatQB = createAsyncThunk(
	thunkString.connectChatQB,
	async (payload: { userId: number; password: string }, thunkAPI) => {
		try {
			const res = await new Promise((resolve, reject) => {
				// @ts-ignore
				QB.chat.connect(payload, function (err, res) {
					if (err) {
						reject(err);
					} else {
						resolve(res);
					}
				});
			});
			// console.log('connectChatQB ', res);
			return Promise.resolve(res);
		} catch (error) {
			// console.log('connectChatQB error', error);
			return thunkAPI.rejectWithValue(error);
		}
	},
);

export const createDialogQB = createAsyncThunk(
	thunkString.createDialogQB,
	async (
		payload: {
			type: number;
			occupants_ids: Array<number>;
			data: {
				class_name: string;
				userId: string;
				photoId: string;
				profession: string;
			};
		},
		thunkAPI,
	) => {
		try {
			const res = await new Promise((resolve, reject) => {
				// @ts-ignore
				QB.chat.dialog.create(payload, function (err, res) {
					if (err) {
						reject(err);
					} else {
						resolve(res);
					}
				});
			});
			// console.log('createDialogQB ', res);
			return Promise.resolve(res);
		} catch (error) {
			// console.log('createDialogQB error', error);
			return thunkAPI.rejectWithValue(error);
		}
	},
);

export const listUsersQB = createAsyncThunk(
	thunkString.listUsersQB,
	async (
		payload: {
			page: number;
			per_page: number;
		},
		thunkAPI,
	) => {
		try {
			const res = await new Promise((resolve, reject) => {
				// @ts-ignore
				QB.users.listUsers(payload, function (err, res) {
					if (err) {
						reject(err);
					} else {
						resolve(res);
					}
				});
			});
			// console.log('listUsersQB ', res);
			return Promise.resolve(res);
		} catch (error) {
			// console.log('listUsersQB error', error);
			return thunkAPI.rejectWithValue(error);
		}
	},
);

export const getDialogsQB = createAsyncThunk(
	thunkString.getDialogsQB,
	async (payload: { limit: number }, thunkAPI) => {
		try {
			const res = await new Promise((resolve, reject) => {
				// @ts-ignore
				QB?.chat?.dialog.list(payload, function (err, res) {
					if (err) {
						reject(err);
					} else {
						resolve(res);
					}
				});
			});
			// console.log('getDialogsQB ', res);
			return Promise.resolve(res);
		} catch (error) {
			// console.log('getDialogsQB error', error);
			return thunkAPI.rejectWithValue(error);
		}
	},
);

export const getChatsQB = createAsyncThunk(
	thunkString.getChatsQB,
	async (
		payload: {
			chat_dialog_id: string;
			sort_asc: string;
			limit: number;
			markAsRead?: boolean;
		},
		thunkAPI,
	) => {
		try {
			const res = await new Promise((resolve, reject) => {
				// @ts-ignore
				QB.chat.message.list(payload, function (err, res) {
					if (err) {
						reject(err);
					} else {
						resolve(res);
					}
				});
			});

			res.dialog_id = payload.chat_dialog_id;
			// console.log('getChatsQB ', res);
			return Promise.resolve(res);
		} catch (error) {
			// console.log('getChatsQB error', error);
			return thunkAPI.rejectWithValue(error);
		}
	},
);

export const sendMessageQB = createAsyncThunk(
	thunkString.sendMessageQB,
	async (
		payload: {
			opponentId: number;
			from: {
				id: string;
				name: string;
			};
			message: {
				id?: number;
				type: string;
				body: string;
				extension: object;
				markable: number;
			};
		},
		thunkAPI,
	) => {
		try {
			const { opponentId, message } = payload;
			message.id = QB.chat.send(opponentId, message);
			// console.log('sendMessageQB', message);
			return Promise.resolve();
		} catch (error) {
			// console.log('sendMessageQB error', error);
			return thunkAPI.rejectWithValue(error);
		}
	},
);

const sendQBPushNotification = async (payload: {
	event: {
		notification_type: string;
		environment: string;
		user: {
			ids: number | string;
		};
		message: string;
	};
}) => {
	try {
		const headers = {
			'Content-Type': 'application/json',
			'QB-Token': sessionStorage.getItem(storageKeys.KEY_OF_QB_TOKEN),
		};

		axios
			.post('https://api.quickblox.com/events.json', payload, { headers })
			.then(res => {
				return Promise.resolve(res);
			})
			.catch(err => {
				return Promise.reject(err);
			});
	} catch (error) {
		return Promise.reject(error);
	}
};

export const disconnectFromQB = createAsyncThunk(
	thunkString.disconnectFromQB,
	async (payload, thunkAPI) => {
		try {
			await QB.chat.disconnect();
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
