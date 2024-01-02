import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const setUserProfilePicture = createAsyncThunk(
	thunkString.setUserProfilePicture,
	async (payload: any, thunkAPI) => {
		try {
			const response = await client.post(
				endpoints.media.updateProfilePicture,
				payload,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
