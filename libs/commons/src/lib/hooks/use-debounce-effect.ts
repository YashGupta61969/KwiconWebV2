import { useEffect, DependencyList } from 'react';

/**
 * @description
 * Debounce effect hook. It will call the function after the waited time. If the hook is called again before the wait time, the timer will be reset. This hook is developed to be used on Image Cropper initially.
 */
export function useDebounceEffect(
	fn: () => void,
	waitTime: number,
	deps?: DependencyList,
) {
	useEffect(() => {
		const t = setTimeout(() => {
			// eslint-disable-next-line prefer-spread
			fn.apply(undefined, deps);
		}, waitTime);

		return () => {
			clearTimeout(t);
		};
	}, deps);
}

export default useDebounceEffect;
