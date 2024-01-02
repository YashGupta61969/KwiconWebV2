import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

/**
 * Handle social login
 */
export const socialLogin = createAsyncThunk(
	thunkString.socialLogin,
	async (payload: { userId: string | null; type: string | null }, thunkAPI) => {
		try {
			const response = await client.post(
				endpoints.authentication.socialLogin,
				payload,
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue;
		}
	},
);
