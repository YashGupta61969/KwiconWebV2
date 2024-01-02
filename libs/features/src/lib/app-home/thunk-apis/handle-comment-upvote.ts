import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const handleCommentUpvote = createAsyncThunk(
	thunkString.handleCommentUpvote,
	async (payload: any, thunkAPI) => {
		try {
			const response = await client.post(
				endpoints.socialFeedPostComment.handleCommentUpvote,
				payload,
			);

			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
