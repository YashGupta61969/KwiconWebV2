import { client, endpoints } from '@kwicon/commons';
import { thunkString } from './thunk-string';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOnboardingCategories = createAsyncThunk(
	thunkString.getOnboardingCategories,
	async (_, thunkAPI) => {
		try {
			const response = await client.get(
				`${endpoints.field.getAllCategories}?showGeneral=true`,
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
