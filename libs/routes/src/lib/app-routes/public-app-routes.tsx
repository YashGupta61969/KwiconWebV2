import { lazyImport, routePaths } from '@kwicon/commons';

const { Auth } = lazyImport(() => import('@kwicon/features'), 'Auth');

export const publicRoutes = {
	auth: {
		path: routePaths.auth.login,
		element: <Auth />,
	},
};
