import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const updateSocialFeedPost = createAsyncThunk(
	thunkString.updateSocialFeedPost,
	async (post: any, thunkAPI) => {
		try {
			const response = await client.patch(
				`${endpoints.socialFeedPost.updateSocialFeedPost}`,
				post,
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
