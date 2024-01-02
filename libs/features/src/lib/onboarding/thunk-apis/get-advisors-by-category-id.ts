import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const getAdvisorsByCategoryId = createAsyncThunk(
	thunkString.getAdvisorsByCategoryId,
	async (categoryId: string[], thunkAPI) => {
		try {
			const response = await client.post(
				endpoints.user.getAdvisorsByCategoryId,
				{
					categoryIdList: categoryId,
				},
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
