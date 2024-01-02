import { client, endpoints } from '@kwicon/commons';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';

export const getCoutries = createAsyncThunk(
	thunkString.getCountries,
	async (_, thunkAPI) => {
		try {
			const response = await client.get(
				`${endpoints.supportData.getAllCountries}`,
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
