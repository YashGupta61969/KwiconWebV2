/* eslint-disable react/jsx-no-useless-fragment */
import { Box, Breadcrumb, Heading, Loaders, TabBar } from '@kwicon/kwicon-ui';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddPostButton } from '../app-home/components/add-post-button';
import { PostCard } from '../app-home/components/post-card';
import { getAppHomeState } from '../app-home/slices/app-home.slice';
import { getAllSocialFeedPostsByLoggedInUser } from '../app-home/thunk-apis/get-all-posts-by-logged-user';
import { getSocialFeedPostById } from '../app-home/thunk-apis/get-social-feed-post-by-id';
import { searchPosts } from '../app-home/thunk-apis/search-posts';
import { AppDispatch } from '../app-store/app-store';
import { getUserState } from '../user-profile/slices/user.slice';

const AddPostModal = lazy(
	() => import('../app-home/components/add-post-modal'),
);

export function MyPosts() {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const [selected, setSelected] = useState(0);
	const { loggedInUserPosts } = useSelector(getAppHomeState);
	const { user } = useSelector(getUserState);
	const [showAddPostModal, setShowAddPostModal] = useState(false);

	useEffect(() => {
		if (user?.id) {
			handleGetLoggedInUserPosts();
		}
	}, [user?.id]);

	const handleGetLoggedInUserPosts = async () => {
		try {
			await dispatch(getAllSocialFeedPostsByLoggedInUser());
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const tabs = [
		{
			value: 0,
			label: `Post (${
				loggedInUserPosts?.filter(post => post?.status === 'published')
					?.length ?? 0
			})`,
		},
		{
			value: 1,
			label: `Draft (${
				loggedInUserPosts?.filter(post => post?.status === 'draft')?.length ?? 0
			})`,
		},
	];

	const handleGetAllPosts = async () => {
		try {
			await dispatch(
				searchPosts({
					limit: 10,
					populate: 'userId',
				}),
			);
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const handleGetPostById = async (id: string) => {
		try {
			await dispatch(getSocialFeedPostById(id));
		} catch (error) {
			throw new Error(error as string);
		}
	};

	return (
		<div>
			<Breadcrumb elements={['my-posts']} navigate={navigate} />

			{/* MAIN */}
			<main
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					padding: 0,
					gap: '2rem',
				}}
			>
				<Box mt="2rem">
					<Heading fw={700} fs={'1.75rem'}>
						My Posts
					</Heading>

					{/* TABS */}
					<Box
						mt="1rem"
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							gap: '2rem',
							alignItems: 'flex-end',
						}}
					>
						<Box width={'60%'}>
							<TabBar
								tabs={tabs}
								selected={selected}
								setSelected={setSelected}
							/>
						</Box>
						<Box mt={'2rem'} width={'30%'}>
							<AddPostButton onClick={() => setShowAddPostModal(true)} />
						</Box>
					</Box>

					<Box
						my={'2rem'}
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '1rem',
							marginBottom: '2rem',
							width: '60%',
						}}
					>
						{selected === 0 ? (
							<>
								{loggedInUserPosts &&
								loggedInUserPosts?.filter(post => post?.status === 'published')
									?.length > 0 ? (
									<>
										{loggedInUserPosts
											?.filter(post => post?.status === 'published')
											?.reverse()
											?.map(post => (
												<PostCard
													post={post}
													key={post?.id}
													handleGetAllPosts={handleGetAllPosts}
													handleGetSinglePost={handleGetPostById}
													handleGetLoggedInUserPosts={
														handleGetLoggedInUserPosts
													}
													showMenu={true}
												/>
											))}
									</>
								) : (
									<Box>
										<Heading fs={'1.25rem'}>No posts found</Heading>
									</Box>
								)}
							</>
						) : (
							<>
								{loggedInUserPosts &&
								loggedInUserPosts?.filter(post => post?.status === 'draft')
									?.length > 0 ? (
									<Box>
										{loggedInUserPosts
											?.filter(post => post?.status === 'draft')
											?.reverse()
											?.map(post => (
												<PostCard
													post={post}
													key={post?.id}
													handleGetAllPosts={handleGetAllPosts}
													handleGetSinglePost={handleGetPostById}
													handleGetLoggedInUserPosts={
														handleGetLoggedInUserPosts
													}
													showMenu={true}
													withInteractionButtons={false}
												/>
											))}
									</Box>
								) : (
									<Box>
										<Heading fs={'1.25rem'}>No draft found</Heading>
									</Box>
								)}
							</>
						)}
					</Box>
				</Box>
			</main>
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

export default MyPosts;
