import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../auth/slices/auth.slice';
import { onboardingReducer } from '../onboarding/slices/onboarding.slice';
import { otherUserProfileReducer } from '../other-user-profile/slices/other-user-profile.slice';
import { universalSearchReducer } from '../universal-search/slices/universal-search.slice';
import { userReducer } from '../user-profile/slices/user.slice';
import { quickbloxReducer } from '../quickblox/slices/quickblox.slice';

import { appHomeReducer } from '../app-home/slices/app-home.slice';
import { azureReducer } from '../azure-commmunication/slices/azure.slice';
// ts-ignore
export const store = configureStore({
	reducer: {
		auth: authReducer,
		appHome: appHomeReducer,
		onboarding: onboardingReducer,
		user: userReducer,
		universalSearch: universalSearchReducer,
		otherUserProfile: otherUserProfileReducer,
		quickblox: quickbloxReducer,
		azure: azureReducer,
	},

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),

	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
