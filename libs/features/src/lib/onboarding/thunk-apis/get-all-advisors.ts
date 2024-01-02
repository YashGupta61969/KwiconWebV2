import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const getAllAdvisors = createAsyncThunk(
	thunkString.getAllAdvisors,
	async (_, thunkAPI) => {
		try {
			const response = await client.get(endpoints.user.getAllAdvisors);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
