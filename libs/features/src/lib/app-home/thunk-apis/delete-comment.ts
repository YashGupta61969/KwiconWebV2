import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const deleteComment = createAsyncThunk(
	thunkString.deleteComment,
	async (payload: any, thunkAPI) => {
		try {
			const response = await client.delete(
				endpoints.socialFeedPostComment.deleteComment,
				payload,
			);

			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
