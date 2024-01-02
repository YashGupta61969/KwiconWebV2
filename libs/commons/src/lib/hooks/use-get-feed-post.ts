/**
 * @description
 * A handy hook to get feed post. Here we only implement the get feed post on scroll functionality. In the future, we can add more functionality to this hook.
 * @param dispatcher
 * @param refObj
 * @returns { handleGetFeedPostOnScroll: () => void }
 *
 * @example
 * const { handleGetFeedPostOnScroll } = useGetFeedPost(dispatcher, refObj);
 *
 * <div ref={refObj} onScroll={handleGetFeedPostOnScroll}>
 *   {children}
 * </div>
 */
export const useGetFeedPost = (
	dispatcher: () => void,
	refObj: React.MutableRefObject<HTMLDivElement | null>,
): {
	handleGetFeedPostOnScroll: () => void;
} => {
	const handleGetFeedPostOnScroll: () => void = () => {
		if (refObj?.current) {
			const { scrollTop, clientHeight, scrollHeight } = refObj.current;

			if (scrollHeight - scrollTop === clientHeight) {
				dispatcher();
			}
		}
	};

	return { handleGetFeedPostOnScroll };
};

export default useGetFeedPost;
