import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const getUser = createAsyncThunk(
	thunkString.getUser,
	async (_, thunkAPI) => {
		try {
			const response = await client.get(endpoints.user.getUser);
			return Promise.resolve(response.data);
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error?.response?.data?.message);
		}
	},
);
