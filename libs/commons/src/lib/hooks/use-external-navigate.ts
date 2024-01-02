/**
 * @description
 * Hook to navigate to external url. It will open the url in the same tab. Recommended to use for external links. Currently using to navigate between website and app.
 * @returns navigate
 *
 * @example
 * const navigate = useExternalNavigate();
 *
 * <button onClick={() => navigate('https://www.google.com')}>Navigate to Google</button>
 */
export const useExternalNavigate = () => {
	const exnavigate = (
		url: string,
		tab?: {
			newTab: boolean;
		},
	) => {
		window.open(url, tab && tab.newTab ? '_blank' : '_self');
	};

	return exnavigate;
};

export default useExternalNavigate;
