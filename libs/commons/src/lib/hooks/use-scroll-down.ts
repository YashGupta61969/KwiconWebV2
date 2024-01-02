import { RefObject, useEffect, useRef } from 'react';

/**
 * A custom React Hook to automatically scroll a container element to the bottom.
 *
 * @param dep - The dependency value that triggers the scrolling effect.
 * @returns ref - A mutable reference to the container element.
 */
export function useScrollDown(dep: any): RefObject<HTMLDivElement> {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current && dep) {
			ref.current.scrollTop = ref.current.scrollHeight;
		}
	}, [dep]);

	return ref;
}
