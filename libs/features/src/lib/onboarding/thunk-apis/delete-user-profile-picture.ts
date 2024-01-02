import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const deleteUserProfilePicture = createAsyncThunk(
	thunkString.deleteUserProfilePicture,
	async (_, thunkAPI) => {
		try {
			const response = await client.delete(
				endpoints.media.deleteProfilePicture,
				{},
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
