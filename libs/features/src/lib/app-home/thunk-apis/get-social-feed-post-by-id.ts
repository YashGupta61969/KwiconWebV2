import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const getSocialFeedPostById = createAsyncThunk(
	thunkString.getSocialFeedPostById,
	async (postId: string, thunkAPI) => {
		try {
			const response = await client.get(
				`${endpoints.socialFeedPost.getSocialFeedPostById}/${postId}`,
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
