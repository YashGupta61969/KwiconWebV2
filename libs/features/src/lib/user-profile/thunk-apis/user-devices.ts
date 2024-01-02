import { client, endpoints } from '@kwicon/commons';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPayload } from '../interfaces/user-profile-interfaces';
import { thunkString } from './thunk-string';

export const addUserDevice = createAsyncThunk(
	thunkString.addUserDevice,
	async (payload: IPayload, thunkAPI) => {
		try {
			const response = await client.post(endpoints.devices.addDevice, payload);
			return Promise.resolve(response.data);
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error?.response?.data?.message);
		}
	},
);

export const getUserDevices = createAsyncThunk(
	thunkString.getUserDevices,
	async (_, thunkAPI) => {
		try {
			const response = await client.get(endpoints.devices.getDevices);
			return Promise.resolve(response.data);
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error?.response?.data?.message);
		}
	},
);

export const updateUserDevice = createAsyncThunk(
	thunkString.updateUserDevice,
	async (payload: IPayload, thunkAPI) => {
		try {
			const response = await client.patch(
				endpoints.devices.updateDevice,
				payload,
			);
			return Promise.resolve(response.data);
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error?.response?.data?.message);
		}
	},
);
