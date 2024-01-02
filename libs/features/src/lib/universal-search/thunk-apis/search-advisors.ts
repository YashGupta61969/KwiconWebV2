import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const searchAdvisors = createAsyncThunk(
	thunkString.searchAdvisors,
	async (
		payload: {
			keyword?: string;
			page?: number;
			limit?: number;
			location?: string | string[];
			profession?: string | string[];
			interests?: string[];
		},
		thunkAPI,
	) => {
		try {
			const response = await client.post(
				endpoints.search.searchAdvisors,
				payload,
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
