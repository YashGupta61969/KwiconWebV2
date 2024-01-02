import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const getUserByQbId = createAsyncThunk(
	thunkString.getUserByQbId,
	async (
		payload: {
			qbId: number;
			select?: string;
			populate?: string;
		},
		thunkAPI,
	) => {
		try {
			const response = await client.get(
				`${endpoints.user.getUserByQbId}/${payload.qbId}${
					payload.select ? `?select=${payload.select}` : ''
				}${
					payload.select && payload.populate
						? `&populate=${payload.populate}`
						: payload.populate
						? `?populate=${payload.populate}`
						: ''
				}`,
			);

			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
