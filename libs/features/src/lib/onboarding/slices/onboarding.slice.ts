import { storageKeys } from '@kwicon/commons';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../../app-store/app-store';
import {
	OnboardingState,
	OnboardingUserEntity,
} from '../interfaces/onboarding-interfaces';
import { addCategory } from '../thunk-apis/add-category';
import { getAdvisorsByCategoryId } from '../thunk-apis/get-advisors-by-category-id';
import { getAllAdvisors } from '../thunk-apis/get-all-advisors';
import { getAllCommunities } from '../thunk-apis/get-all-communities';
import { getGrades } from '../thunk-apis/get-grades';
import { getOnboardingCategories } from '../thunk-apis/get-onboarding-categories';
import { getSubCategoriesByCategories } from '../thunk-apis/get-subcategories-by-categories';
import { getUser } from '../thunk-apis/get-user';
import { joinOrWithdrawCommunity } from '../thunk-apis/join-or-withdraw-community';
import { setUserProfileCV } from '../thunk-apis/set-user-profile-cv';
import { setUserProfileForm } from '../thunk-apis/set-user-profile-form';
import { setUserProfilePicture } from '../thunk-apis/set-user-profile-picture';
import { setUserRole } from '../thunk-apis/set-user-role';
import { UserRole } from '../types/onboarding-types';
import { deleteUserProfilePicture } from '../thunk-apis/delete-user-profile-picture';
import { deleteUserProfileCV } from '../thunk-apis/delete-user-profile-cv';

export const ONBOARDING_FEATURE_KEY = 'onboarding';

const initialOnboardingState: OnboardingState = {
	loadingStatus: 'not loaded',
	error: null,
	data: null,
	allGrades: null,
	onboardingUserData: {
		lastStep: 0,
		isAccountCompleted: false,
		role: 'student',
		name: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		grade: '',
		schoolId: '',
		schoolName: '',
		addressId: '',
		board: '',
		about: '',
		isActive: false,
		profilePicture: '',
		profession: '',
		interests: [],
		specialization: [],
		connection: [],
		community: [],
	},
	selectedOnboardingCategories: [],
	subCategoryList: null,
	selectedSubCategoryIds: [],

	onboardingCategories: {
		categoryList: null as string[] | null,
	},
	advisors: null,
	communities: null,
	user: null,
};

export const onboardingSlice = createSlice({
	name: ONBOARDING_FEATURE_KEY,
	initialState: initialOnboardingState,
	reducers: {
		setSelectRole(
			state: OnboardingState,
			action: PayloadAction<UserRole | undefined>,
		) {
			state.onboardingUserData.role = action.payload;
			// save onboardingUserData to session storage
			sessionStorage.setItem(
				storageKeys.KEY_OF_ONBOARDING_USER_DATA,
				JSON.stringify({
					...state.onboardingUserData,
					role: action.payload,
				}),
			);
		},
		setSelectOnboardingUserData(
			state: OnboardingState,
			action: PayloadAction<OnboardingUserEntity>,
		) {
			state.onboardingUserData = action.payload;
			// save onboardingUserData to session storage
			sessionStorage.setItem(
				storageKeys.KEY_OF_ONBOARDING_USER_DATA,
				JSON.stringify(state.onboardingUserData),
			);
		},
		resetOnboardingCategories(state: OnboardingState) {
			state.onboardingCategories.categoryList = null;
		},
		setSelectOnboardingCategories(
			state: OnboardingState,
			action: PayloadAction<string[]>,
		) {
			state.selectedOnboardingCategories = action.payload;
		},
		setSelectSubCategoryIds(
			state: OnboardingState,
			action: PayloadAction<string[]>,
		) {
			state.selectedSubCategoryIds = action.payload;
		},
		setOnboardingInterests(
			state: OnboardingState,
			action: PayloadAction<string[]>,
		) {
			state.onboardingUserData.interests = action.payload;
		},
		setOnboardingExpertise(
			state: OnboardingState,
			action: PayloadAction<string[]>,
		) {
			state.onboardingUserData.expertise = action.payload;
		},
	},
	extraReducers: builder => {
		/**
		 * Set User Role
		 */
		builder
			.addCase(setUserRole.pending, (state: OnboardingState) => {
				state.loadingStatus = 'loading';
			})
			.addCase(setUserRole.fulfilled, (state: OnboardingState) => {
				state.loadingStatus = 'loaded';
			})
			.addCase(setUserRole.rejected, (state: OnboardingState, action) => {
				state.loadingStatus = 'error';
				state.error = action.error.message;
				toast.error('Error while setting user role');
			});
		/**
		 * Set User Profile Form
		 */
		builder
			.addCase(setUserProfileForm.pending, (state: OnboardingState) => {
				state.loadingStatus = 'loading';
			})
			.addCase(setUserProfileForm.fulfilled, (state: OnboardingState) => {
				state.loadingStatus = 'loaded';
			})
			.addCase(
				setUserProfileForm.rejected,
				(state: OnboardingState, action) => {
					state.loadingStatus = 'error';
					state.error = action.error.message;
					toast.error('Error while setting profile');
				},
			);
		/**
		 * Set User Profile Picture
		 */
		builder
			.addCase(setUserProfilePicture.pending, (state: OnboardingState) => {
				state.loadingStatus = 'loading';
			})
			.addCase(setUserProfilePicture.fulfilled, (state: OnboardingState) => {
				state.loadingStatus = 'loaded';
			})
			.addCase(
				setUserProfilePicture.rejected,
				(state: OnboardingState, action) => {
					state.loadingStatus = 'error';
					state.error = action.error.message;
					toast.error('Error while setting profile picture');
				},
			);
		/**
		 * Remove User Profile Picture
		 */
		builder
			.addCase(deleteUserProfilePicture.pending, (state: OnboardingState) => {
				state.loadingStatus = 'loading';
			})
			.addCase(deleteUserProfilePicture.fulfilled, (state: OnboardingState) => {
				state.loadingStatus = 'loaded';
			})
			.addCase(
				deleteUserProfilePicture.rejected,
				(state: OnboardingState, action) => {
					state.loadingStatus = 'error';
					state.error = action.error.message;
					toast.error('Error while removing profile picture');
				},
			);
		/**
		 * Get Onboarding Categories
		 */
		builder
			.addCase(getOnboardingCategories.pending, (state: OnboardingState) => {
				state.loadingStatus = 'loading';
			})
			.addCase(
				getOnboardingCategories.fulfilled,
				(state: OnboardingState, action) => {
					state.loadingStatus = 'loaded';
					state.onboardingCategories.categoryList =
						action.payload?.categoryList;
				},
			)
			.addCase(
				getOnboardingCategories.rejected,
				(state: OnboardingState, action) => {
					state.loadingStatus = 'error';
					state.error = action.error.message;
					toast.error('Error while getting onboarding categories');
				},
			);
		/**
		 * Get Subcategories by Categories
		 */
		builder
			.addCase(
				getSubCategoriesByCategories.pending,
				(state: OnboardingState) => {
					state.loadingStatus = 'loading';
				},
			)
			.addCase(
				getSubCategoriesByCategories.fulfilled,
				(state: OnboardingState, action) => {
					state.loadingStatus = 'loaded';
					state.subCategoryList = action.payload?.subcategoryList;
				},
			)
			.addCase(
				getSubCategoriesByCategories.rejected,
				(state: OnboardingState, action) => {
					state.loadingStatus = 'error';
					state.error = action.error.message;
					toast.error('Error while getting subcategories');
				},
			);
		/**
		 * Get Advisors By CategoryId
		 */
		builder
			.addCase(getAdvisorsByCategoryId.pending, (state: OnboardingState) => {
				state.loadingStatus = 'loading';
			})
			.addCase(
				getAdvisorsByCategoryId.fulfilled,
				(state: OnboardingState, action) => {
					state.loadingStatus = 'loaded';
					state.advisors = action.payload?.advisors;
				},
			)
			.addCase(
				getAdvisorsByCategoryId.rejected,
				(state: OnboardingState, action) => {
					state.loadingStatus = 'error';
					state.error = action.error.message;
					toast.error('Error while getting advisors according to category');
				},
			);
		/**
		 * Get All Advisors
		 */
		builder
			.addCase(getAllAdvisors.pending, (state: OnboardingState) => {
				state.loadingStatus = 'loading';
			})
			.addCase(getAllAdvisors.fulfilled, (state: OnboardingState, action) => {
				state.loadingStatus = 'loaded';
				state.advisors = action.payload;
			})
			.addCase(getAllAdvisors.rejected, (state: OnboardingState, action) => {
				state.loadingStatus = 'error';
				state.error = action.error.message;
				toast.error('Error while getting the advisors');
			});
		/**
		 * Get All Communities
		 */
		builder
			.addCase(getAllCommunities.pending, (state: OnboardingState) => {
				state.loadingStatus = 'loading';
			})
			.addCase(
				getAllCommunities.fulfilled,
				(state: OnboardingState, action) => {
					state.loadingStatus = 'loaded';
					state.communities = action.payload?.communityList;
				},
			)
			.addCase(getAllCommunities.rejected, (state: OnboardingState, action) => {
				state.loadingStatus = 'error';
				state.error = action.error.message;
				toast.error('Error while getting the communities');
			});
		/**
		 * Join or Withdraw Community
		 */
		builder
			.addCase(joinOrWithdrawCommunity.pending, (state: OnboardingState) => {
				state.loadingStatus = 'loading';
			})
			.addCase(joinOrWithdrawCommunity.fulfilled, (state: OnboardingState) => {
				state.loadingStatus = 'loaded';
			})
			.addCase(
				joinOrWithdrawCommunity.rejected,
				(state: OnboardingState, action) => {
					state.loadingStatus = 'error';
					state.error = action.payload as string;
					toast.error('Error while joining or withdrawing community');
				},
			);
		/**
		 * Get all grades
		 */
		builder
			.addCase(getGrades.pending, (state: OnboardingState) => {
				state.loadingStatus = 'loading';
			})
			.addCase(getGrades.fulfilled, (state: OnboardingState, action) => {
				state.loadingStatus = 'loaded';
				state.allGrades = action.payload;
			})
			.addCase(getGrades.rejected, (state: OnboardingState, action) => {
				state.loadingStatus = 'error';
				state.error = action.error.message;
				toast.error('Error while getting the grades');
			});
		/**
		 * Set User Profile CV
		 */
		builder
			.addCase(setUserProfileCV.pending, (state: OnboardingState) => {
				state.loadingStatus = 'loading';
			})
			.addCase(setUserProfileCV.fulfilled, (state: OnboardingState, action) => {
				state.loadingStatus = 'loaded';
				state.user = action.payload;
			})
			.addCase(setUserProfileCV.rejected, (state: OnboardingState, action) => {
				state.loadingStatus = 'error';
				state.error = action.payload as string;
				toast.error('Error while setting user profile CV');
			});
		/**
		 * Remove User Profile CV
		 */
		builder
			.addCase(deleteUserProfileCV.pending, (state: OnboardingState) => {
				state.loadingStatus = 'loading';
			})
			.addCase(deleteUserProfileCV.fulfilled, (state: OnboardingState, action) => {
				state.loadingStatus = 'loaded';
				state.user = action.payload;
			})
			.addCase(deleteUserProfileCV.rejected, (state: OnboardingState, action) => {
				state.loadingStatus = 'error';
				state.error = action.payload as string;
				toast.error('Error while removing user profile CV');
			});

		/**
		 * Get User
		 */
		builder.addCase(getUser.pending, (state: OnboardingState) => {
			state.loadingStatus = 'loading';
		});
		builder.addCase(getUser.fulfilled, (state: OnboardingState, action) => {
			state.loadingStatus = 'loaded';
			state.user = action.payload;
		});
		builder.addCase(getUser.rejected, (state: OnboardingState, action) => {
			state.loadingStatus = 'error';
			state.error = action.payload as string;
		});

		/**
		 * Add Category
		 */
		builder
			.addCase(addCategory.pending, (state: OnboardingState) => {
				state.loadingStatus = 'loading';
			})
			.addCase(addCategory.fulfilled, (state: OnboardingState) => {
				state.loadingStatus = 'loaded';
			})
			.addCase(addCategory.rejected, (state: OnboardingState, action) => {
				state.loadingStatus = 'error';
				state.error = action.payload as string;
				toast.error('Error while adding category');
			});
	},
});

/*
 * Exporting reducer for store configuration.
 */
export const onboardingReducer = onboardingSlice.reducer;

export const onboardingActions = onboardingSlice.actions;

export const getOnboardingState = (rootState: RootState): OnboardingState =>
	rootState[ONBOARDING_FEATURE_KEY];
