import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const getSubCategoriesByCategories = createAsyncThunk(
	thunkString.getSubCategoriesByCategories,
	async (categories: string[], thunkAPI) => {
		try {
			const response = await client.post(
				endpoints.field.getSubCategoriesByCategories,
				{
					categories,
				},
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
