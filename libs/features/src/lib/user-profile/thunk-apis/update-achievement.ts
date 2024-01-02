import { client, endpoints } from '@kwicon/commons';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPayload } from '../interfaces/user-profile-interfaces';
import { thunkString } from './thunk-string';

export const updateAchievement = createAsyncThunk(
	thunkString.updateAchievement,
	async (payload: IPayload, thunkAPI) => {
		try {
			const response = await client.patch(
				endpoints.achievement.updateAchievement,
				payload,
			);
			return Promise.resolve(response.data);
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error?.response?.data?.message);
		}
	},
);
