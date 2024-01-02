import { client, endpoints } from '@kwicon/commons';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';

/**
 * Setting user role
 */
export const setUserProfileForm = createAsyncThunk(
	thunkString.setUserProfileForm,
	async (
		payload: {
			[key: string]:
				| string
				| string[]
				| boolean
				| number
				| number[]
				| undefined
				| null
				| {
						[key: string]:
							| string
							| string[]
							| boolean
							| number
							| number[]
							| undefined
							| null;
				  };
		},
		thunkAPI,
	) => {
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
