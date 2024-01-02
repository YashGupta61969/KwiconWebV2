import { client, endpoints } from '@kwicon/commons';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';

export const deleteExperience = createAsyncThunk(
	thunkString.deleteExperience,
	async (
		payload: {
			[key: string]: string | null | undefined;
		},
		thunkAPI,
	) => {
		try {
			const response = await client.delete(
				endpoints.experience.deleteExperience,
				payload,
			);
			return Promise.resolve(response.data);
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error?.response?.data?.message);
		}
	},
);
