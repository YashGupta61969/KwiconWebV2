import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const deactivateAccount = createAsyncThunk(
	thunkString.deactivateAccount,
	async (payload: { deactivateReason: string }, thunkAPI) => {
		try {
			const response = await client.patch(
				endpoints.user.deactivateAccount,
				payload,
			);

			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
