import { client, endpoints } from '@kwicon/commons';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAddress } from '../interfaces/user-profile-interfaces';
import { thunkString } from './thunk-string';

export const addUserAddress = createAsyncThunk(
	thunkString.addAddress,
	async (payload: IAddress, thunkAPI) => {
		try {
			const response = await client.post(endpoints.address.addAddress, payload);
			return Promise.resolve(response.data);
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error?.response?.data?.message);
		}
	},
);
