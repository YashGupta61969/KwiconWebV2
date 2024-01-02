import { Box, Breadcrumb, Heading, Loaders } from '@kwicon/kwicon-ui';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from '../../app-store/app-store';
import { PostCard } from '../components/post-card';
import { getAppHomeState } from '../slices/app-home.slice';
import { getSocialFeedPostById } from '../thunk-apis/get-social-feed-post-by-id';
import { searchPosts } from '../thunk-apis/search-posts';

export const ViewPost = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { singlePost, singlePostLoading } = useSelector(getAppHomeState);
	const { postId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (postId) {
			handleGetPostById(postId);
		}
	}, [postId]);

	const handleGetPostById = async (id: string) => {
		try {
			await dispatch(getSocialFeedPostById(id));
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const handleGetAllPosts = async () => {
		try {
			await dispatch(
				searchPosts({
					limit: 50,
					populate: 'userId',
				}),
			);
		} catch (error) {
			throw new Error(error as string);
		}
	};

	return singlePostLoading === 'loading' ? (
		<Loaders.Page />
	) : (
		<Box>
			<Breadcrumb
				navigate={navigate}
				elements={[
					singlePost?.title?.length > 50
						? singlePost?.title?.slice(0, 50)
						: singlePost?.title,
				]}
			/>

			{/* MAIN  */}
			{singlePost?.id && (
				<Box width={'60%'} mb={'2rem'}>
					<Heading type="h3">
						{singlePost?.title?.length > 50
							? `${singlePost?.title?.slice(0, 50)}...`
							: singlePost?.title}
					</Heading>

					{/* CONTENT PAPER */}
					<Box mt={'1rem'}>
						<PostCard
							post={singlePost}
							handleGetSinglePost={handleGetPostById}
							handleGetAllPosts={handleGetAllPosts}
						/>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default ViewPost;
