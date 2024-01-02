import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const addSocialFeedPost = createAsyncThunk(
	thunkString.addSocialFeedPost,
	async (post: any, thunkAPI) => {
		try {
			const response = await client.post(
				`${endpoints.socialFeedPost.addSocialFeedPost}`,
				post,
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
