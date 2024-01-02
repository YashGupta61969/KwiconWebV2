import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const deleteUserProfileCV = createAsyncThunk(
	thunkString.deleteUserProfileCV,
	async (_, thunkAPI) => {
		try {
			const response = await client.delete(
				endpoints.media.deleteProfileCV,
				{},
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
