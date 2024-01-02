import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const getAllSocialFeedPostsByLoggedInUser = createAsyncThunk(
	thunkString.getAllSocialFeedPosts,
	async (_, thunkAPI) => {
		try {
			const response = await client.get(
				`${endpoints.socialFeedPost.getAllSocialFeedPosts}`,
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
