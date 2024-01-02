import { cookies } from './../utils/cookies';

/**
 * Custom hook to check the authentication status
 * @description
 * This hook checks the authentication status by checking the cookies
 * and returns the status as a boolean
 *
 * @returns {boolean} The authentication status
 *
 * @example
 * const isAuthenticated = useAuthStatus();
 *
 * if (isAuthenticated) {
 *   // Do something
 * }
 *
 */
export const useAuthStatus = (): boolean => {
	const accessToken = cookies?.get('access_token');
	const refreshToken = cookies?.get('refresh_token');

	if (accessToken && refreshToken) {
		return true;
	} else {
		return false;
	}
};
