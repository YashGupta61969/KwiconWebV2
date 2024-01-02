import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const getComments = createAsyncThunk(
	thunkString.getComments,
	async (
		payload: {
			postOrParentCommentId: string;
			limit?: number;
			page?: number;
			sortField?: string;
			sortOrder?: string;
		},
		thunkAPI,
	) => {
		try {
			const response = await client.get(
				`${endpoints.socialFeedPostComment.getComments}?postOrParentCommentId=${
					payload.postOrParentCommentId
				}${payload.limit ? `&limit=${payload.limit}` : ''}${
					payload.page ? `&page=${payload.page}` : ''
				}${payload.sortField ? `&sortField=${payload.sortField}` : ''}${
					payload.sortOrder ? `&sortOrder=${payload.sortOrder}` : ''
				}`,
			);

			return Promise.resolve(response.data?.docs);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
