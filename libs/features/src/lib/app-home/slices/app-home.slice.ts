import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app-store/app-store';
import { addComment } from '../thunk-apis/add-comment';
import { addMedia } from '../thunk-apis/add-media';
import { addSocialFeedPost } from '../thunk-apis/add-social-feed-post';
import { deleteComment } from '../thunk-apis/delete-comment';
import { getAllSocialFeedPostsByLoggedInUser } from '../thunk-apis/get-all-posts-by-logged-user';
import { getComments } from '../thunk-apis/get-comments';
import { getSocialFeedPostById } from '../thunk-apis/get-social-feed-post-by-id';
import { handleCommentUpvote } from '../thunk-apis/handle-comment-upvote';
import { handleSocialFeedPostUpvote } from '../thunk-apis/handle-upvote';
import { searchPosts } from '../thunk-apis/search-posts';
import { updateSocialFeedPost } from '../thunk-apis/update-social-feed-post';

const APP_HOME_FEATURE_KEY = 'appHome';

export interface InitialAppHomeStateProps {
	allSearchedPosts: any[] | null | undefined;
	searchedPaginationData: {
		searchedTotal: number | null | undefined;
		searchedLimit: number | null | undefined;
		searchedOffset: number | null | undefined;
		searchedCurrentPage: number | null | undefined;
		searchedTotalPages: number | null | undefined;
	};

	singlePost: any | null | undefined;
	singlePostLoading: 'not loaded' | 'loading' | 'loaded' | 'error';
	loggedInUserPosts: any[] | null | undefined;
	loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
	error: null | undefined | string;
	comments: any[] | null | undefined;
}

const initialAppHomeState: InitialAppHomeStateProps = {
	allSearchedPosts: [],
	loggedInUserPosts: [],
	singlePost: null,
	singlePostLoading: 'not loaded',
	loadingStatus: 'not loaded',
	error: null,
	comments: [],
	searchedPaginationData: {
		searchedTotal: 0,
		searchedLimit: 10,
		searchedOffset: 0,
		searchedCurrentPage: 0,
		searchedTotalPages: 0,
	},
};

export const appHomeSlice = createSlice({
	name: APP_HOME_FEATURE_KEY,
	initialState: initialAppHomeState,
	reducers: {
		setPostLimit: (state, action) => {
			state.searchedPaginationData.searchedLimit = action.payload;
		},
	},
	extraReducers: builder => {
		// search posts
		builder
			.addCase(searchPosts.pending, (state, action) => {
				state.loadingStatus = 'loading';
			})
			.addCase(searchPosts.fulfilled, (state, action) => {
				state.loadingStatus = 'loaded';
				state.allSearchedPosts = action.payload?.docs;
				state.searchedPaginationData = {
					searchedTotal: action.payload?.total,
					searchedLimit: action.payload?.limit,
					searchedOffset: action.payload?.offset,
					searchedCurrentPage: action.payload?.page,
					searchedTotalPages: action.payload?.pages,
				};
			})
			.addCase(
				searchPosts.rejected,
				(state: InitialAppHomeStateProps, action) => {
					state.loadingStatus = 'error';
					state.error = action.error.message;
				},
			);

		// handle upvote
		builder
			.addCase(
				handleSocialFeedPostUpvote.pending,
				(state: InitialAppHomeStateProps) => {
					state.loadingStatus = 'loading';
				},
			)
			.addCase(
				handleSocialFeedPostUpvote.fulfilled,
				(state: InitialAppHomeStateProps) => {
					state.loadingStatus = 'loaded';
				},
			)
			.addCase(
				handleSocialFeedPostUpvote.rejected,
				(state: InitialAppHomeStateProps, action) => {
					state.loadingStatus = 'error';
					state.error = action.error.message;
				},
			);

		// get single post by id
		builder
			.addCase(
				getSocialFeedPostById.pending,
				(state: InitialAppHomeStateProps) => {
					state.singlePostLoading = 'loading';
				},
			)
			.addCase(
				getSocialFeedPostById.fulfilled,
				(state: InitialAppHomeStateProps, action) => {
					state.singlePostLoading = 'loaded';
					state.singlePost = action.payload;
				},
			)
			.addCase(
				getSocialFeedPostById.rejected,
				(state: InitialAppHomeStateProps, action) => {
					state.singlePostLoading = 'error';
					state.error = action.error.message;
				},
			);
		// get single post by user id
		builder
			.addCase(
				getAllSocialFeedPostsByLoggedInUser.pending,
				(state: InitialAppHomeStateProps) => {
					state.loadingStatus = 'loading';
				},
			)
			.addCase(
				getAllSocialFeedPostsByLoggedInUser.fulfilled,
				(state: InitialAppHomeStateProps, action) => {
					state.loadingStatus = 'loaded';
					state.loggedInUserPosts = action.payload;
				},
			)
			.addCase(
				getAllSocialFeedPostsByLoggedInUser.rejected,
				(state: InitialAppHomeStateProps, action) => {
					state.loadingStatus = 'error';
					state.error = action.error.message;
				},
			);
		// add social feed post
		builder
			.addCase(addSocialFeedPost.pending, (state: InitialAppHomeStateProps) => {
				state.loadingStatus = 'loading';
			})
			.addCase(
				addSocialFeedPost.fulfilled,
				(state: InitialAppHomeStateProps) => {
					state.loadingStatus = 'loaded';
				},
			)
			.addCase(
				addSocialFeedPost.rejected,
				(state: InitialAppHomeStateProps, action) => {
					state.loadingStatus = 'error';
					state.error = action.error.message;
				},
			);

		// update social feed post
		builder
			.addCase(
				updateSocialFeedPost.pending,
				(state: InitialAppHomeStateProps) => {
					state.loadingStatus = 'loading';
				},
			)
			.addCase(
				updateSocialFeedPost.fulfilled,
				(state: InitialAppHomeStateProps) => {
					state.loadingStatus = 'loaded';
				},
			)
			.addCase(
				updateSocialFeedPost.rejected,
				(state: InitialAppHomeStateProps, action) => {
					state.loadingStatus = 'error';
					state.error = action.error.message;
				},
			);

		// add media
		builder
			.addCase(addMedia.pending, (state: InitialAppHomeStateProps) => {
				state.loadingStatus = 'loading';
			})
			.addCase(addMedia.fulfilled, (state: InitialAppHomeStateProps) => {
				state.loadingStatus = 'loaded';
			})
			.addCase(addMedia.rejected, (state: InitialAppHomeStateProps, action) => {
				state.loadingStatus = 'error';
				state.error = action.error.message;
			});

		// get comments
		builder
			.addCase(getComments.pending, (state: InitialAppHomeStateProps) => {
				state.loadingStatus = 'loading';
			})
			.addCase(
				getComments.fulfilled,
				(state: InitialAppHomeStateProps, action) => {
					state.loadingStatus = 'loaded';
				},
			)
			.addCase(
				getComments.rejected,
				(state: InitialAppHomeStateProps, action) => {
					state.loadingStatus = 'error';
					state.error = action.error.message;
				},
			);

		// add comment
		builder
			.addCase(addComment.pending, (state: InitialAppHomeStateProps) => {
				state.loadingStatus = 'loading';
			})
			.addCase(addComment.fulfilled, (state: InitialAppHomeStateProps) => {
				state.loadingStatus = 'loaded';
			})
			.addCase(
				addComment.rejected,
				(state: InitialAppHomeStateProps, action) => {
					state.loadingStatus = 'error';
					state.error = action.error.message;
				},
			);

		// handle comment upvote
		builder
			.addCase(
				handleCommentUpvote.pending,
				(state: InitialAppHomeStateProps) => {
					state.loadingStatus = 'loading';
				},
			)
			.addCase(
				handleCommentUpvote.fulfilled,
				(state: InitialAppHomeStateProps) => {
					state.loadingStatus = 'loaded';
				},
			)
			.addCase(
				handleCommentUpvote.rejected,
				(state: InitialAppHomeStateProps, action) => {
					state.loadingStatus = 'error';
					state.error = action.error.message;
				},
			);

		// handle delete comment
		builder
			.addCase(deleteComment.pending, (state: InitialAppHomeStateProps) => {
				state.loadingStatus = 'loading';
			})
			.addCase(deleteComment.fulfilled, (state: InitialAppHomeStateProps) => {
				state.loadingStatus = 'loaded';
			})
			.addCase(
				deleteComment.rejected,
				(state: InitialAppHomeStateProps, action) => {
					state.loadingStatus = 'error';
					state.error = action.error.message;
				},
			);
	},
});

export const appHomeReducer = appHomeSlice.reducer;
export const appHomeActions = appHomeSlice.actions;

export const getAppHomeState = (
	rootState: RootState,
): InitialAppHomeStateProps => rootState[APP_HOME_FEATURE_KEY];
