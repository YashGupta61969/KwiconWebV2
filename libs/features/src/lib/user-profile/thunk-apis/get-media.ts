import { client, endpoints } from '@kwicon/commons';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';

//! we don't need this anymore
export const getMedia = createAsyncThunk(
	thunkString.getMedia,
	async (mediaId: string, thunkAPI) => {
		try {
			const response = await client.get(
				`${endpoints.media.getMedia}?mediaId=${mediaId}`,
			);
			return Promise.resolve(response.data);
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error?.response?.data?.message);
		}
	},
);
