import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const unfollowUser = createAsyncThunk(
	thunkString.unfollowUser,
	async (payload: any, thunkAPI) => {
		try {
			const response = await client.patch(endpoints.user.unfollowUser, payload);
			return Promise.resolve(response.data);
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error?.response?.data?.message);
		}
	},
);
