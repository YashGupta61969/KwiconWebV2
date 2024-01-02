import { client, endpoints } from '@kwicon/commons';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';

/**
 * Getting login OTP
 */
export const getLoginOTP = createAsyncThunk(
	thunkString.getLoginOTP,
	async (
		payload: {
			email: string | null;
		},
		thunkAPI,
	) => {
		try {
			const response = await client.post(
				endpoints.authentication.getLoginOTP,
				payload,
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
