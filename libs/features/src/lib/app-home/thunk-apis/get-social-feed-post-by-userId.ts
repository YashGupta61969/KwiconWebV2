import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const getSocialFeedPostByUserId = createAsyncThunk(
	thunkString.getSocialFeedPostByUserId,
	async (userId: string, thunkAPI) => {
		try {
			const response = await client.get(
				`${endpoints.socialFeedPost.getSocialFeedPostByUserId}/${userId}`,
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
