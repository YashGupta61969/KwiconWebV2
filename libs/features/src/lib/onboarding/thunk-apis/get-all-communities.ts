import { client, endpoints } from '@kwicon/commons';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';

export const getAllCommunities = createAsyncThunk(
	thunkString.getCommunity,
	async (_, thunkAPI) => {
		try {
			const response = await client.get(endpoints.community.getAllCommunities);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
