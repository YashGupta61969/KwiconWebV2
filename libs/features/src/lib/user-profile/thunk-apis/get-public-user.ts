import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const getPublicUser = createAsyncThunk(
	thunkString.getPublicUser,
	async (userId: string, thunkAPI) => {
		try {
			const response = await client.get(
				`${endpoints.user.getPublicUser}?userId=${userId}`,
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
