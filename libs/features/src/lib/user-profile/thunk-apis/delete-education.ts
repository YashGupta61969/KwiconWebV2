import { client, endpoints } from '@kwicon/commons';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';

export const deleteEducation = createAsyncThunk(
	thunkString.deleteEducation,
	async (
		payload: {
			[key: string]: string | null | undefined;
		},
		thunkAPI,
	) => {
		try {
			const response = await client.delete(
				endpoints.education.deleteEducation,
				payload,
			);
			return Promise.resolve(response.data);
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error?.response?.data?.message);
		}
	},
);
