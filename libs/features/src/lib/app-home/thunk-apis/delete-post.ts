import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const deletePost = createAsyncThunk(
	thunkString.deleteSocialFeedPosts,
	async (
		payload: {
			socialFeedPostId: string;
		},
		thunkAPI,
	) => {
		try {
			const response = await client.delete(
				`${endpoints.socialFeedPost.deleteSocialFeedPost}`,
				payload,
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
