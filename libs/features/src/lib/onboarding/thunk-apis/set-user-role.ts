import { UserRole } from '../slices/onboarding.slice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

/**
 * Setting user role
 */
export const setUserRole = createAsyncThunk(
	thunkString.setUserRole,
	async (payload: { role: UserRole }, thunkAPI) => {
		try {
			const response = await client.patch(
				endpoints.user.updateProfileFields,
				payload,
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
