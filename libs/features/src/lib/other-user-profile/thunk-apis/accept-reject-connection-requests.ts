import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const acceptOrRejectConnectionRequest = createAsyncThunk(
	thunkString.acceptOrRejectConnectionRequest,
	async (
		payload: {
			[key: string]:
				| string
				| string[]
				| boolean
				| number
				| number[]
				| undefined
				| null;
		},
		thunkAPI,
	) => {
		try {
			const response = await client.post(
				endpoints.connectionRequest.acceptOrRejectConnectionRequest,
				payload,
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
