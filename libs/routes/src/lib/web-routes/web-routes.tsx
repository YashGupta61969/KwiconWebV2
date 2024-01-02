import { lazyImport, routePaths } from '@kwicon/commons';
import { withSuspense } from '@kwicon/components';

// Lazy import the web elements
const { Home } = lazyImport(() => import('@kwicon/features'), 'Home');
const { PrivacyPolicy } = lazyImport(
	() => import('@kwicon/features'),
	'PrivacyPolicy',
);
const { TermsAndCondition } = lazyImport(
	() => import('@kwicon/features'),
	'TermsAndCondition',
);

const HomeWithSuspense = withSuspense(Home);
const PrivacyPolicyWithSuspense = withSuspense(PrivacyPolicy);
const TermsAndConditionWithSuspense = withSuspense(TermsAndCondition);

export const webRoutes = {
	home: {
		path: routePaths.webRoutes.root.home,
		element: <HomeWithSuspense />,
	},
	team: {
		path: routePaths.webRoutes.root.team,
		element: (
			<div
				style={{
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: '5rem',
					fontWeight: 700,
					color: 'rgba(0, 0, 0, 0.7)',
				}}
			>
				Teams Coming Soon
			</div>
		),
	},
	about: {
		path: routePaths.webRoutes.root.about,
		element: (
			<div
				style={{
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: '5rem',
					fontWeight: 700,
					color: 'rgba(0, 0, 0, 0.7)',
				}}
			>
				About Coming Soon
			</div>
		),
	},
	contact: {
		path: routePaths.webRoutes.root.contact,
		element: (
			<div
				style={{
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: '5rem',
					fontWeight: 700,
					color: 'rgba(0, 0, 0, 0.7)',
				}}
			>
				Contact Coming Soon
			</div>
		),
	},
	advisory: {
		path: routePaths.webRoutes.root.advisory,
		element: (
			<div
				style={{
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: '5rem',
					fontWeight: 700,
					color: 'rgba(0, 0, 0, 0.7)',
				}}
			>
				Advisory Coming Soon
			</div>
		),
	},
	privacyPolicy: {
		path: routePaths.webRoutes.root.privacyPolicy,
		element: <PrivacyPolicyWithSuspense />,
	},
	termsOfUse: {
		path: routePaths.webRoutes.root.termsOfUse,
		element: <TermsAndConditionWithSuspense />,
	},
	pricing: {
		path: routePaths.webRoutes.root.pricing,
		element: (
			<div
				style={{
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: '5rem',
					fontWeight: 700,
					color: 'rgba(0, 0, 0, 0.7)',
				}}
			>
				Pricing Coming Soon
			</div>
		),
	},
	notFound: {
		path: '*',
		element: (
			<div
				style={{
					height: '80vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: '5rem',
					fontWeight: 700,
					color: '#7581FF',
				}}
			>
				404 Page Not Found
			</div>
		),
	},
};
