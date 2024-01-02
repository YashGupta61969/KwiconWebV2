import { client, endpoints } from '@kwicon/commons';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAddress } from '../interfaces/user-profile-interfaces';
import { thunkString } from './thunk-string';

export const updateUserAddress = createAsyncThunk(
	thunkString.updateAddress,
	async (payload: IAddress, thunkAPI) => {
		try {
			const response = await client.patch(
				endpoints.address.updateAddress,
				payload,
			);
			return Promise.resolve(response.data);
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error?.response?.data?.message);
		}
	},
);
