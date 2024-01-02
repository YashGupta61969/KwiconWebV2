import { Navigate, useLocation } from 'react-router-dom';
import { routePaths } from '../config/route-paths';
import { useAuthStatus } from '../hooks/use-auth-status';

interface ProtectedProps {
	element: React.ReactNode;
}

export const Protected: React.FC<ProtectedProps> = ({ element }) => {
	const location = useLocation();
	const isAuthenticated = useAuthStatus();

	if (!isAuthenticated) {
		return <Navigate to={routePaths.auth.login} state={{ from: location }} />;
		// eslint-disable-next-line react/jsx-no-useless-fragment
	} else return <>{element}</>;
};
