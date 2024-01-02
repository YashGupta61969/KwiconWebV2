import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const getAllConnectionReq = createAsyncThunk(
	thunkString.getAllConnectionRequests,
	async (payload: string, thunkAPI) => {
		try {
			const response = await client.get(
				`${endpoints.connectionRequest.getAllConnectionRequests}/${payload}`,
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
