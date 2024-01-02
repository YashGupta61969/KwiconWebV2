import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

export const getGrades = createAsyncThunk(
	thunkString.getGrades,
	async (_, thunkAPI) => {
		try {
			const response = await client.get(
				endpoints.supportData.getAllSupportData,
			);
			if (response.data?.length > 0) {
				return Promise.resolve(
					response.data?.filter((item: any) => item?.name === 'grade'),
				);
			}
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
