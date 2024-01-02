import { useEffect, useRef } from 'react';

export const useRefScrollTop = () => {
	const scrollToTop = useRef<HTMLInputElement>(null);
	useEffect(() => {
		scrollToTop.current && scrollToTop.current.scrollIntoView();
	});
	return scrollToTop;
};
