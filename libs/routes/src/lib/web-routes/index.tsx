import { Route, Routes } from 'react-router-dom';
import { webRoutes } from './web-routes';

export const WebRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path={'/'} element={webRoutes.home.element} />
			<Route path={webRoutes.home.path} element={webRoutes.home.element} />
			<Route path={webRoutes.team.path} element={webRoutes.team.element} />
			<Route path={webRoutes.about.path} element={webRoutes.about.element} />
			<Route
				path={webRoutes.contact.path}
				element={webRoutes.contact.element}
			/>
			<Route
				path={webRoutes.advisory.path}
				element={webRoutes.advisory.element}
			/>
			<Route
				path={webRoutes.privacyPolicy.path}
				element={webRoutes.privacyPolicy.element}
			/>
			<Route
				path={webRoutes.termsOfUse.path}
				element={webRoutes.termsOfUse.element}
			/>
			<Route
				path={webRoutes.pricing.path}
				element={webRoutes.pricing.element}
			/>
			{/* Not Found */}
			<Route
				path={webRoutes.notFound.path}
				element={webRoutes.notFound.element}
			/>
		</Routes>
	);
};
