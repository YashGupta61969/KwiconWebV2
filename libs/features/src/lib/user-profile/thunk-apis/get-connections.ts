import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const getConnections = createAsyncThunk(
	thunkString.getConnections,
	async (
		payload: { type: string; page?: number; limit?: number },
		thunkAPI,
	) => {
		try {
			const response = await client.get(
				`${endpoints?.user?.getAllConnections}?type=${payload.type}${
					payload.page ? `&page=${payload.page}` : ''
				}${payload.limit ? `&limit=${payload.limit}` : ''}`,
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
