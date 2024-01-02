import cookies from '../utils/cookies';
import { useAuth0 } from '@auth0/auth0-react';
import envKeys from '../constants/env-keys';

export const useLogout: () => {
	logOut: () => void;
} = () => {
	const { logout } = useAuth0();

	const logOut: () => void = () => {
		cookies.deleteAll();
		logout({
			clientId: envKeys.AUTH0_CLIENT_ID,
			logoutParams: {
				returnTo: window.location.origin,
			},
		});
	};

	return {
		logOut,
	};
};

export default useLogout;
