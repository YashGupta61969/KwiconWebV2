import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const setUserInterests = createAsyncThunk(
	thunkString.setUserInterests,
	async (interests: string[], thunkAPI) => {
		try {
			const response = await client.patch(endpoints.user.updateProfileFields, {
				interests,
			});
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
