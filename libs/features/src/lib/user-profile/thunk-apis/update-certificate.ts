import { client, endpoints } from '@kwicon/commons';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPayload } from '../interfaces/user-profile-interfaces';
import { thunkString } from './thunk-string';

export const updateCertificate = createAsyncThunk(
	thunkString.updateCertificate,
	async (payload: IPayload, thunkAPI) => {
		try {
			const response = await client.patch(
				endpoints.certificate.updateCertificate,
				payload,
			);
			return Promise.resolve(response.data);
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error?.response?.data?.message);
		}
	},
);
