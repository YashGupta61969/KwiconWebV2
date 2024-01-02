import { cookies } from '@kwicon/commons';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AuthEntity } from '../interfaces/auth-entity';
import { AuthState } from '../interfaces/auth-state';
import { getLoginOTP } from '../thunk-apis/get-login-otp';
import { verifyLoginOTP } from '../thunk-apis/verify-login-otp';
import { RootState } from '../../app-store/app-store';
import { socialLogin } from '../thunk-apis/social-login';

export const AUTH_FEATURE_KEY = 'auth';

export const initialAuthState: AuthState = {
	loadingStatus: 'not loaded',
	otpLoadingStatus: 'not loaded',
	socialLoadingStatus: 'not loaded',
	error: null,
	data: null,
	otpError: null,
};

export const authSlice = createSlice({
	name: AUTH_FEATURE_KEY,
	initialState: initialAuthState,
	reducers: {
		// set otp error null
		setOtpError: (state: AuthState, action: PayloadAction<string | null>) => {
			state.otpError = action.payload;
		},
	},
	extraReducers: builder => {
		/**
		 * getLoginOTP
		 */
		builder
			.addCase(getLoginOTP.pending, (state: AuthState) => {
				state.loadingStatus = 'loading';
			})
			.addCase(
				getLoginOTP.fulfilled,
				(state: AuthState, action: PayloadAction<AuthEntity>) => {
					state.loadingStatus = 'loaded';
					state.data = action.payload;
					toast.success(action.payload.message);
				},
			)
			.addCase(getLoginOTP.rejected, (state: AuthState, action) => {
				state.loadingStatus = 'error';
				state.error = action.error.message;
			});
		/**
		 * Verify OTP
		 */
		builder
			.addCase(verifyLoginOTP.pending, (state: AuthState) => {
				state.otpLoadingStatus = 'loading';
			})
			.addCase(
				verifyLoginOTP.fulfilled,
				(state: AuthState, action: PayloadAction<AuthEntity>) => {
					state.otpLoadingStatus = 'loaded';
					state.data = action.payload;

					// Setting cookies
					const refreshToken = action.payload?.tokens?.refresh.token;
					const refreshExpires = action.payload?.tokens.refresh.expires;
					const accessToken = action.payload?.tokens?.access.token;
					const accessExpires = action.payload?.tokens.access.expires;
					cookies.set('refresh_token', refreshToken, refreshExpires);
					cookies.set('access_token', accessToken, accessExpires);
					toast.success('Login successful!');
				},
			)
			.addCase(verifyLoginOTP.rejected, (state: AuthState, action) => {
				state.otpLoadingStatus = 'error';
				state.otpError = action.error.message;
			});
		/**
		 * Social Login
		 */
		builder
			.addCase(socialLogin.pending, (state: AuthState) => {
				state.socialLoadingStatus = 'loading';
			})
			.addCase(
				socialLogin.fulfilled,
				(state: AuthState, action: PayloadAction<AuthEntity>) => {
					state.socialLoadingStatus = 'loaded';
					state.data = action.payload;
					// Setting cookies
					const refreshToken = action.payload?.tokens?.refresh.token;
					const refreshExpires = action.payload?.tokens.refresh.expires;
					const accessToken = action.payload?.tokens?.access.token;
					const accessExpires = action.payload?.tokens.access.expires;
					cookies.set('refresh_token', refreshToken, refreshExpires);
					cookies.set('access_token', accessToken, accessExpires);
					toast.success('Login successful!');
				},
			)
			.addCase(socialLogin.rejected, (state: AuthState, action) => {
				state.socialLoadingStatus = 'error';
				state.error = action.error.message;
			});
	},
});

/*
 * Exporting reducer for store configuration.
 */
export const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;

export const getAuthState = (rootState: RootState): AuthState =>
	rootState[AUTH_FEATURE_KEY];
