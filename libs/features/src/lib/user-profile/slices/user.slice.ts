import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app-store/app-store';
import { getUser } from '../../onboarding/thunk-apis/get-user';
import { IUserState } from '../interfaces/user-profile-interfaces';
import { addUserAddress } from '../thunk-apis/add-user-address';
import { deactivateAccount } from '../thunk-apis/deactivate-account';
import { deleteProfilePicture } from '../thunk-apis/delete-profile-picture';
import { getConnections } from '../thunk-apis/get-connections';
import { getCoutries } from '../thunk-apis/get-countries';
import { getMedia } from '../thunk-apis/get-media';
import { getPublicUser } from '../thunk-apis/get-public-user';
import { getUserByQbId } from '../thunk-apis/get-user-by-qb-id';
import { unfollowUser } from '../thunk-apis/unfollow-user';
import { updateUserAddress } from '../thunk-apis/update-user-address';
import { getUserDevices } from '../thunk-apis/user-devices';

const initialUserState: IUserState = {
	loadingStatus: 'not loaded',
	conversationLoadingStatus: 'not loaded',
	error: null,
	user: {
		name: '',
		email: '',
		role: '',
		isAccountCompleted: null,
		lastStep: null,
		birthYear: null,
		deactivateReason: '',
		schoolId: '',
		schoolName: '',
		phone: {
			countryCode: '',
			phoneNumber: '',
		},
		addressId: {
			state: '',
			city: '',
			country: '',
			address: '',
			zipCode: '',
		},
		grade: '',
		board: '',
		socialIntegration: {
			linkedIn: null,
			google: null,
		},
		isActive: null,
		about: null,
		linkedInURL: '',
		cvFile: null,
		profilePicture: '',
		profession: '',
		education: [],
		interests: [],
		specialization: [],
		expertise: [],
		recognitions: [],
		programs: [],
		experience: [],
		connections: {
			seeker: [],
			advisor: [],
		},
		community: null,
	},
	media: {
		loadingStatus: 'not loaded',
		error: null,
		data: undefined,
	},
	connectionsQBUserIds: {
		advisor: [],
		seeker: [],
	},
	publicUser: null,
	connections: [],
	countryCodes: {
		loadingStatus: 'not loaded',
		countries: [],
	},
	userDevices: {
		loadingStatus: 'not loaded',
		devices: [],
		error: null,
	},
};

export const USER_FEATURE_KEY = 'user';

export const userSlice = createSlice({
	name: USER_FEATURE_KEY,
	initialState: initialUserState,
	reducers: {
		changeProfilePicture(state: IUserState, action) {
			state.user.profilePicture = action.payload;
		},
	},
	extraReducers: builder => {
		/**
		 * Get User
		 */
		builder.addCase(getUser.pending, (state: IUserState) => {
			state.loadingStatus = 'loading';
		});
		builder.addCase(getUser.fulfilled, (state: IUserState, action) => {
			state.loadingStatus = 'loaded';
			state.user = action.payload;
		});
		builder.addCase(getUser.rejected, (state: IUserState, action) => {
			state.loadingStatus = 'error';
			state.error = action.payload as string;
		});

		/**
		 * Get Media
		 */
		builder.addCase(getMedia.pending, (state: IUserState) => {
			state.media.loadingStatus = 'loading';
		});
		builder.addCase(getMedia.fulfilled, (state: IUserState, action) => {
			state.media.loadingStatus = 'loaded';
			state.media.data = action.payload;
		});
		builder.addCase(getMedia.rejected, (state: IUserState, action) => {
			state.media.loadingStatus = 'error';
			state.media.error = action.payload as string;
		});

		/**
		 * Add User Address
		 */
		builder.addCase(addUserAddress.pending, (state: IUserState) => {
			state.loadingStatus = 'loading';
		});
		builder.addCase(addUserAddress.fulfilled, (state: IUserState, action) => {
			state.loadingStatus = 'loaded';
			state.user.addressId = action.payload;
		});
		builder.addCase(addUserAddress.rejected, (state: IUserState, action) => {
			state.loadingStatus = 'error';
			state.error = action.payload as string;
		});

		/**
		 * Update User Address
		 */
		builder.addCase(updateUserAddress.pending, (state: IUserState) => {
			state.loadingStatus = 'loading';
		});
		builder.addCase(
			updateUserAddress.fulfilled,
			(state: IUserState, action) => {
				state.loadingStatus = 'loaded';
				state.user.addressId = action.payload;
			},
		);
		builder.addCase(updateUserAddress.rejected, (state: IUserState, action) => {
			state.loadingStatus = 'error';
			state.error = action.payload as string;
		});

		/**
		 * Unfollow User
		 */
		builder
			.addCase(unfollowUser.pending, (state: IUserState) => {
				state.loadingStatus = 'loading';
			})
			.addCase(unfollowUser.fulfilled, (state: IUserState, action) => {
				state.loadingStatus = 'loaded';
			})
			.addCase(unfollowUser.rejected, (state: IUserState, action) => {
				state.loadingStatus = 'error';
				state.error = action.payload as string;
			});

		/**
		 * Get Public User
		 */
		builder
			.addCase(getPublicUser.pending, (state: IUserState) => {
				state.loadingStatus = 'loading';
			})
			.addCase(getPublicUser.fulfilled, (state: IUserState, action) => {
				state.loadingStatus = 'loaded';
				state.publicUser = action.payload;
			})
			.addCase(getPublicUser.rejected, (state: IUserState, action) => {
				state.loadingStatus = 'error';
				state.error = action.payload as string;
			});

		/**
		 * Get All Connections
		 */
		builder
			.addCase(getConnections.pending, (state: IUserState) => {
				state.loadingStatus = 'loading';
			})
			.addCase(getConnections.fulfilled, (state: IUserState, action) => {
				state.loadingStatus = 'loaded';
				// set connections to the seeker and advisor array of the user state
				state.connections = action.payload.docs;
				state.connectionsQBUserIds[action?.meta?.arg?.type] =
					action?.payload?.docs?.map(obj => obj.quickbloxUserId) || [];
			})
			.addCase(getConnections.rejected, (state: IUserState, action) => {
				state.loadingStatus = 'error';
				state.error = action.payload as string;
			});

		// delete profile picture
		builder
			.addCase(deleteProfilePicture.pending, (state: IUserState) => {
				state.loadingStatus = 'loading';
			})
			.addCase(deleteProfilePicture.fulfilled, (state: IUserState, action) => {
				state.loadingStatus = 'loaded';
			})
			.addCase(deleteProfilePicture.rejected, (state: IUserState, action) => {
				state.loadingStatus = 'error';
				state.error = action.payload as string;
			});

		// Get All Countries
		builder
			.addCase(getCoutries.pending, (state: IUserState) => {
				state.countryCodes.loadingStatus = 'loaded';
			})
			.addCase(getCoutries.fulfilled, (state: IUserState, action) => {
				state.countryCodes.loadingStatus = 'loaded';
				state.countryCodes.countries = action.payload;
			})
			.addCase(getCoutries.rejected, (state: IUserState, action) => {
				state.countryCodes.loadingStatus = 'error';
			});
		// deactivate account
		builder
			.addCase(deactivateAccount.pending, (state: IUserState) => {
				state.loadingStatus = 'loading';
			})
			.addCase(deactivateAccount.fulfilled, (state: IUserState, action) => {
				state.loadingStatus = 'loaded';
			})
			.addCase(deactivateAccount.rejected, (state: IUserState, action) => {
				state.loadingStatus = 'error';
				state.error = action.payload as string;
			});
		// get user by qb id
		builder
			.addCase(getUserByQbId.pending, (state: IUserState) => {
				state.conversationLoadingStatus = 'loading';
			})
			.addCase(getUserByQbId.fulfilled, (state: IUserState, action) => {
				state.conversationLoadingStatus = 'loaded';
			})
			.addCase(getUserByQbId.rejected, (state: IUserState, action) => {
				state.conversationLoadingStatus = 'error';
				state.error = action.payload as string;
			});

		// get user devices
		builder
			.addCase(getUserDevices.pending, (state: IUserState) => {
				state.userDevices.loadingStatus = 'loading';
			})
			.addCase(getUserDevices.fulfilled, (state: IUserState, action) => {
				state.userDevices.loadingStatus = 'loaded';
				state.userDevices.devices = action.payload;
			})
			.addCase(getUserDevices.rejected, (state: IUserState, action) => {
				state.userDevices.loadingStatus = 'error';
				state.userDevices.error = action.payload as string;
			});
	},
});

/*
 * Exporting reducer for store configuration.
 */
export const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;

export const getUserState = (rootState: RootState): IUserState =>
	rootState[USER_FEATURE_KEY];
