import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const sendOrWithdrawConnectionRequest = createAsyncThunk(
	thunkString.sendOrWithdrawConnectionRequest,
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
				endpoints.connectionRequest.sendOrWithdrawConnectionRequest,
				payload,
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
