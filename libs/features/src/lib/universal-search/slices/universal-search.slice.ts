import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../../app-store/app-store';
import { searchAdvisors } from '../thunk-apis/search-advisors';
import { searchUniversalPosts } from '../../app-home/thunk-apis/search-posts';

export const UNIVERSAL_SEARCH_FEATURE_KEY = 'universalSearch';

const initialOnboardingState: {
	loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
	error: any;
	data: any;
	searchedKeyword: string | undefined | null;
	searchedAdvisors: any;
	totalRecords: number;
	totalPages: number;
	currentPage: number;
	Limit: number;
	universalSearchedPosts: any[] | null | undefined;
	uniSearchedPaginationData: {
		searchedTotal: number | null | undefined;
		searchedLimit: number | null | undefined;
		searchedOffset: number | null | undefined;
		searchedCurrentPage: number | null | undefined;
		searchedTotalPages: number | null | undefined;
	};
} = {
	loadingStatus: 'not loaded',
	error: null,
	data: null,
	searchedKeyword: '',
	searchedAdvisors: null,
	totalRecords: 0,
	totalPages: 0,
	currentPage: 0,
	Limit: 0,
	universalSearchedPosts: [],
	uniSearchedPaginationData: {
		searchedTotal: 0,
		searchedLimit: 0,
		searchedOffset: 0,
		searchedCurrentPage: 0,
		searchedTotalPages: 0,
	},
};

export const universalSearchSlice = createSlice({
	name: UNIVERSAL_SEARCH_FEATURE_KEY,
	initialState: initialOnboardingState,
	reducers: {
		setSearchAdvisorsData(state, action) {
			state.searchedAdvisors = action.payload;
		},
	},
	extraReducers: builder => {
		/**
		 * Set Searched Advisors
		 */
		builder
			.addCase(searchAdvisors.pending, state => {
				state.loadingStatus = 'loading';
			})
			.addCase(searchAdvisors.fulfilled, (state, action) => {
				state.loadingStatus = 'loaded';
				state.searchedAdvisors = action.payload?.docs;
				state.totalRecords = action.payload?.total;
				state.totalPages = action.payload?.pages;
				state.currentPage = action.payload?.page;
				state.Limit = action.payload?.limit;
				state.searchedKeyword = action.meta.arg.keyword;
			})
			.addCase(searchAdvisors.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.error = action.error.message;
				// toast.error('Error while fetching advisors');
			});
		// universal search posts
		builder
			.addCase(searchUniversalPosts.pending, state => {
				state.loadingStatus = 'loading';
			})
			.addCase(searchUniversalPosts.fulfilled, (state, action) => {
				state.universalSearchedPosts = action.payload?.docs;
				state.uniSearchedPaginationData = {
					searchedTotal: action.payload?.total,
					searchedLimit: action.payload?.limit,
					searchedOffset: action.payload?.offset,
					searchedCurrentPage: action.payload?.page,
					searchedTotalPages: action.payload?.pages,
				};
				state.loadingStatus = 'loaded';
			})
			.addCase(searchUniversalPosts.rejected, (state, action) => {
				state.loadingStatus = 'error';
				state.error = action.error.message;
			});
	},
});

/*
 * Exporting reducer for store configuration.
 */
export const universalSearchReducer = universalSearchSlice.reducer;

export const universalSearchActions = universalSearchSlice.actions;

export const getUniversalSearchState = (rootState: RootState) =>
	rootState[UNIVERSAL_SEARCH_FEATURE_KEY];
