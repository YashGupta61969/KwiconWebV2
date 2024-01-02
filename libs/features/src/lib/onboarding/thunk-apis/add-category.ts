import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const addCategory = createAsyncThunk(
	thunkString.addCategory,
	async (name: string, thunkAPI) => {
		try {
			const response = await client.post(endpoints.field.addCategory, {
				name,
				category: 'custom category',
			});
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
