import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkString } from './thunk-string';
import { client, endpoints } from '@kwicon/commons';

interface payloadProps {
	keyword?: string | null | undefined;
	page?: number | null | undefined;
	limit?: number | null | undefined;
	populate?: string | null | undefined;
	sort?: string | null | undefined;
	select?: string | null | undefined;
}

export const searchPosts = createAsyncThunk(
	thunkString.searchPosts,
	async (payload: payloadProps, thunkAPI) => {
		try {
			const response = await client.get(
				`${endpoints.socialFeedPost.searchPosts}${
					payload?.keyword ? `?keyword=${payload?.keyword}` : ''
				}${
					payload?.page
						? `${payload?.keyword ? '&' : '?'}page=${payload?.page}`
						: ''
				}${
					payload?.limit
						? `${payload?.keyword || payload?.page ? '&' : '?'}limit=${
								payload?.limit
						  }`
						: ''
				}${
					payload?.populate
						? `${
								payload?.keyword || payload?.page || payload?.limit ? '&' : '?'
						  }populate=${payload?.populate}`
						: ''
				}${
					payload?.sort
						? `${
								payload?.keyword ||
								payload?.page ||
								payload?.limit ||
								payload?.populate
									? '&'
									: '?'
						  }sort=${payload?.sort}`
						: ''
				}${
					payload?.select
						? `${
								payload?.keyword ||
								payload?.page ||
								payload?.limit ||
								payload?.populate ||
								payload?.sort
									? '&'
									: '?'
						  }select=${payload?.select}`
						: ''
				}`,
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

export const searchUniversalPosts = createAsyncThunk(
	thunkString.searchUniversalPosts,
	async (payload: payloadProps, thunkAPI) => {
		try {
			const response = await client.get(
				`${endpoints.socialFeedPost.searchPosts}${
					payload?.keyword ? `?keyword=${payload?.keyword}` : ''
				}${
					payload?.page
						? `${payload?.keyword ? '&' : '?'}page=${payload?.page}`
						: ''
				}${
					payload?.limit
						? `${payload?.keyword || payload?.page ? '&' : '?'}limit=${
								payload?.limit
						  }`
						: ''
				}${
					payload?.populate
						? `${
								payload?.keyword || payload?.page || payload?.limit ? '&' : '?'
						  }populate=${payload?.populate}`
						: ''
				}${
					payload?.sort
						? `${
								payload?.keyword ||
								payload?.page ||
								payload?.limit ||
								payload?.populate
									? '&'
									: '?'
						  }sort=${payload?.sort}`
						: ''
				}${
					payload?.select
						? `${
								payload?.keyword ||
								payload?.page ||
								payload?.limit ||
								payload?.populate ||
								payload?.sort
									? '&'
									: '?'
						  }select=${payload?.select}`
						: ''
				}`,
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
