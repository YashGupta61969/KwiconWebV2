import { client, endpoints } from '@kwicon/commons';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';

export const deleteAchievement = createAsyncThunk(
	thunkString.deleteAchievement,
	async (
		payload: {
			[key: string]: string | null | undefined;
		},
		thunkAPI,
	) => {
		try {
			const response = await client.delete(
				endpoints.achievement.deleteAchievement,
				payload,
			);
			return Promise.resolve(response.data);
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error?.response?.data?.message);
		}
	},
);
