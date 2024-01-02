import { client, endpoints } from '@kwicon/commons';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
/**
 * Verifying login OTP
 */
export const verifyLoginOTP = createAsyncThunk(
	thunkString.verifyLoginOTP,
	async (
		payload: {
			email: string | null;
			otp: string | null;
		},
		thunkAPI,
	) => {
		try {
			const response = await client.post(
				endpoints.authentication.verifyLoginOTP,
				payload,
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
