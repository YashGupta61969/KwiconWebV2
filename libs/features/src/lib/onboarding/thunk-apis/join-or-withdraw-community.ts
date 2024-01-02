import { client, endpoints } from '@kwicon/commons';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';

export const joinOrWithdrawCommunity = createAsyncThunk(
	thunkString.joinOrWithdrawCommunity,
	async (
		payload: { communityId: string; isJoinRequest: boolean },
		thunkAPI,
	) => {
		try {
			const response = await client.post(
				endpoints.community.joinOrWithdrawCommunity,
				payload,
			);
			return Promise.resolve(response.data);
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error?.response?.data?.message);
		}
	},
);
