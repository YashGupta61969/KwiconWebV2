import { useEffect, useState } from 'react';

/**
 * @description Hook to check if a media query matches
 * the parameter query is a string that can be passed to window.matchMedia
 * It returns true if the query matches, false otherwise.
 * @param query - string passed to window.matchMedia
 * @returns boolean
 *
 * @example
 * ```jsx
 *  const isMobile = useMediaQuery('(max-width: 375px)')
 * ```
 */
export const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState<boolean>(false);

	useEffect(() => {
		const media: MediaQueryList = window.matchMedia(query);

		//* if the media query matches, set the state to true
		//* otherwise set it to false
		if (media.matches !== matches) {
			setMatches(media.matches);
		}

		//* listener function to update the state
		const listener = () => {
			setMatches(media.matches);
		};

		//* adding listener to catch the media query change
		media.addEventListener('change', listener);

		//* Cleanup
		return () => {
			media.removeEventListener('change', listener);
		};
	}, [query, matches]);

	return matches;
};
