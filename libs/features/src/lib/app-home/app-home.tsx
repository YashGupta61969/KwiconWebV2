import styles from './app-home.module.css';
import { Box, Loaders } from '@kwicon/kwicon-ui';
import { AddPostButton } from './components/add-post-button';
import { AppDispatch } from '../app-store/app-store';
import { useDispatch, useSelector } from 'react-redux';
import { appHomeActions, getAppHomeState } from './slices/app-home.slice';
import { searchPosts } from './thunk-apis/search-posts';
import {
	Suspense,
	lazy,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { PostCard } from './components/post-card';
import { getSocialFeedPostById } from './thunk-apis/get-social-feed-post-by-id';
import { getUserState } from '../user-profile/slices/user.slice';
import { getUser } from '../onboarding/thunk-apis/get-user';
import { getAllSocialFeedPostsByLoggedInUser } from './thunk-apis/get-all-posts-by-logged-user';
import { RightPane } from './components/right-pane';

const AddPostModal = lazy(() => import('./components/add-post-modal'));

export function AppHome() {
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector(getUserState);
	const { allSearchedPosts, searchedPaginationData, loadingStatus } =
		useSelector(getAppHomeState);

	const postListRef = useRef(null);

	const [showAddPostModal, setShowAddPostModal] = useState(false);

	// const [postLimit, setPostLimit] = useState(10);

	useEffect(() => {
		handleGetAllPosts();
	}, [searchedPaginationData?.searchedLimit]);

	useEffect(() => {
		handleGetUser();
	}, []);

	useEffect(() => {
		if (user?.id) {
			handleGetLoggedInUserPosts();
		}
	}, [user?.id]);

	const handleGetAllPosts = useCallback(async () => {
		try {
			await dispatch(
				searchPosts({
					populate: 'userId',
					limit: searchedPaginationData?.searchedLimit,
					sort: '-createdAt',
				}),
			);
		} catch (error) {
			throw new Error(error as string);
		}
	}, [dispatch, searchedPaginationData?.searchedLimit]);

	const handleGetPostById = async (id: string) => {
		try {
			await dispatch(getSocialFeedPostById(id));
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const handleGetLoggedInUserPosts = async () => {
		try {
			await dispatch(getAllSocialFeedPostsByLoggedInUser());
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const handleGetUser = async () => {
		try {
			await dispatch(getUser());
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const handleOnScroll = () => {
		if (postListRef.current) {
			const { scrollTop, clientHeight, scrollHeight } = postListRef.current;
			if (scrollHeight - scrollTop === clientHeight) {
				dispatch(
					appHomeActions.setPostLimit(
						Number(searchedPaginationData?.searchedLimit) + 10,
					),
				);
			}
		}
	};

	return (
		<div>
			{/* Layout */}
			<Box className={styles['home-container']}>
				{/* POSTS */}
				<div
					className={styles['post-container']}
					ref={postListRef}
					onScroll={handleOnScroll}
				>
					{allSearchedPosts?.map((post: any) => (
						<PostCard
							key={post?.id}
							post={post}
							handleGetAllPosts={handleGetAllPosts}
							handleGetSinglePost={handleGetPostById}
						/>
					))}
					{loadingStatus === 'loading' && <Loaders.Page />}
					{searchedPaginationData?.searchedTotal ===
						allSearchedPosts?.length && (
							<Box
								my={'2rem'}
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								You've reached the end of the feed!
							</Box>
						)}
				</div>
				{/* RIGHT PANE */}
				<Box width={'40%'} position="relative">
					<Box position="absolute" width={'100%'}>
						<RightPane setShowAddPostModal={setShowAddPostModal} />
					</Box>
				</Box>
			</Box>
			<Suspense fallback={<Loaders.Page />}>
				<AddPostModal
					userId={user?.id}
					isOpen={showAddPostModal}
					toggleModal={() => setShowAddPostModal(!showAddPostModal)}
					handleGetAllPosts={handleGetAllPosts}
					handleGetPostById={handleGetLoggedInUserPosts}
				/>
			</Suspense>
		</div>
	);
}

export default AppHome;
