/* eslint-disable react/jsx-no-useless-fragment */
import { Icons } from '@kwicon/commons';
import { ImageSlider } from '@kwicon/components';
import {
	Box,
	Button,
	ButtonDropdown,
	Chip,
	DropdownItem,
	FormElements,
	Heading,
	Icon,
	IconButton,
	Loaders,
	Paper,
} from '@kwicon/kwicon-ui';
import { format } from 'date-fns';
import {
	Suspense,
	lazy,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import { getUser } from '../../onboarding/thunk-apis/get-user';
import { getUserState } from '../../user-profile/slices/user.slice';
import styles from '../app-home.module.css';
import { addComment } from '../thunk-apis/add-comment';
import { deletePost } from '../thunk-apis/delete-post';
import { getComments } from '../thunk-apis/get-comments';
import { handleSocialFeedPostUpvote } from '../thunk-apis/handle-upvote';
import { thunkString } from '../thunk-apis/thunk-string';
import { CommentBox } from './comment-box';

export interface PostCardProps {
	post: any;
	handleGetAllPosts?: () => void;
	handleGetLoggedInUserPosts?: () => void;
	handleGetSinglePost: (id: string) => void;
	withShowMore?: boolean;
	showMenu?: boolean;
	withInteractionButtons?: boolean;
}

const AddPostModal = lazy(() => import('./add-post-modal'));
const ShareModal = lazy(() => import('./share-modal'));

export const PostCard: React.FC<PostCardProps> = ({
	post,
	handleGetAllPosts,
	withShowMore = true,
	handleGetSinglePost,
	handleGetLoggedInUserPosts,
	showMenu,
	withInteractionButtons = true,
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const theme = useTheme();
	const location = useLocation();

	const [showMore, setShowMore] = useState(false);
	const { user } = useSelector(getUserState);
	const [comments, setComments] = useState<any[]>([]);
	const [multimedia, setMultimedia] = useState<any>(null);
	const [toggleCommentBox, setToggleCommentBox] = useState(false);
	const [comment, setComment] = useState('');
	const [showPreviousComments, setShowPreviousComments] = useState(false);

	const navigate = useNavigate();

	const [isUserUpvoted, setIsUserUpvoted] = useState(false);
	const [showAddPostModal, setShowAddPostModal] = useState(false);
	const [showWholePostTitle, setShowWholePostTitle] = useState(false);
	const [showShareModal, setShowShareModal] = useState(false);

	// post state
	const [upvoteCount, setUpvoteCount] = useState<number | null>(null);

	useEffect(() => {
		if (post?.id) {
			handleGetUser();
		}
	}, [post?.id]);

	useEffect(() => {
		// check if user has upvoted the post
		if (post?.upvote?.length > 0) {
			const isUpvoted = post?.upvote?.find(
				(upvote: any) => upvote?.from === user?.id,
			);
			if (isUpvoted) {
				setIsUserUpvoted(true);
			} else {
				setIsUserUpvoted(false);
			}
		} else {
			setIsUserUpvoted(false);
		}
	}, [post?.upvote, user?.id]);

	// set upvote count for post
	useEffect(() => {
		if (post?.upvote) {
			setUpvoteCount(post?.upvote?.length);
		}
	}, [post?.upvote]);

	useEffect(() => {
		if (post?.multimedia?.length > 0) {
			// check if the multimedia array is an array of strings or an array of objects
			if (typeof post?.multimedia?.[0] === 'string') {
				setMultimedia(post?.multimedia);
			} else {
				setMultimedia(post?.multimedia?.map((media: any) => media?.id));
			}
		}

		if (post?.multimedia?.length === 0) {
			setMultimedia(null);
		}
	}, [post?.multimedia, post?.multimedia?.length]);

	useEffect(() => {
		if (post?.commentCount > 0) {
			handleGetComments(post?.id);
		}
	}, [post?.id, post?.commentCount, post?.comment?.length]);

	useEffect(() => {
		if (location?.pathname === '/') {
			setShowWholePostTitle(false);
		} else {
			setShowWholePostTitle(true);
		}
	}, [location?.pathname]);

	const handleGetUser = async () => {
		try {
			await dispatch(getUser());
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const renderContent = useMemo(
		() => () => {
			const content = post?.content;
			const hasLink = /(http:\/\/|https:\/\/)([^\s]+)/g.test(content);
			const hasHashtag = /#\w+/g.test(content);

			if (hasLink || hasHashtag) {
				return (
					<Box>
						<div
							dangerouslySetInnerHTML={{
								__html: (showMore
									? content?.slice(0, content?.length)
									: content?.slice(0, 200) +
									  (content?.length > 200 ? '...' : '')
								)
									?.replace(
										/(http:\/\/|https:\/\/)([^\s]+)/g,
										`<a href="$&" target="_blank" rel="noopener noreferrer" style="color: blue;">$&</a>`,
									)
									?.replace(
										/#(\w+)/g,
										`<span style="color: ${theme.palettes.colors.primary}; cursor: pointer">#$1</span>`,
									),
							}}
						/>
					</Box>
				);
			} else {
				return (
					<Box
						style={{
							wordBreak: 'break-word',
							display: 'inline-block',
						}}
					>
						{showMore ? content : content?.slice(0, 200) + '...'}
					</Box>
				);
			}
		},
		[post?.content, showMore],
	);

	const handleUpvote = useCallback(async () => {
		try {
			if (!isUserUpvoted) {
				setUpvoteCount((upvoteCount as number) + 1);
				setIsUserUpvoted(true);

				const result = await dispatch(
					handleSocialFeedPostUpvote({
						id: post?.id,
						isUpvote: isUserUpvoted ? false : true,
					}),
				);

				if (
					result.type === `${thunkString.handleSocialFeedPostUpvote}/rejected`
				) {
					setUpvoteCount((upvoteCount as number) - 1);
					setIsUserUpvoted(false);
				}
			} else {
				setUpvoteCount((upvoteCount as number) - 1);
				setIsUserUpvoted(false);

				const result = await dispatch(
					handleSocialFeedPostUpvote({
						id: post?.id,
						isUpvote: isUserUpvoted ? false : true,
					}),
				);

				if (
					result.type === `${thunkString.handleSocialFeedPostUpvote}/rejected`
				) {
					setUpvoteCount((upvoteCount as number) + 1);
					setIsUserUpvoted(true);
				}
			}
		} catch (error) {
			throw new Error(error as string);
		} finally {
			handleGetSinglePost(post?.id);
			handleGetAllPosts && handleGetAllPosts();
			handleGetLoggedInUserPosts && handleGetLoggedInUserPosts(user?.id);
		}
	}, [
		dispatch,
		handleGetAllPosts,
		handleGetLoggedInUserPosts,
		handleGetSinglePost,
		isUserUpvoted,
		post?.id,
		setUpvoteCount,
		upvoteCount,
		user?.id,
	]);

	const handleShowMore = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			e.stopPropagation();
			setShowMore(!showMore);
		},
		[showMore],
	);

	const handleShowLess = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			e.stopPropagation();
			setShowMore(!showMore);
		},
		[showMore],
	);

	const renderShowMoreButton = useCallback(() => {
		if (post?.content?.length > 200) {
			return (
				<Box
					style={{
						color: theme.palettes.colors.primary as string,
						fontSize: '0.875rem',
						fontWeight: 'bold',
						cursor: 'pointer',
					}}
					onClick={handleShowMore}
				>
					Read more
				</Box>
			);
		} else {
			return null;
		}
	}, [post?.content?.length, handleShowMore, theme.palettes.colors.primary]);

	const renderShowLessButton = useCallback(() => {
		if (post?.content?.length > 200) {
			return (
				<Box
					style={{
						color: theme.palettes.colors.primary as string,
						fontSize: '0.875rem',
						fontWeight: 'bold',
						cursor: 'pointer',
					}}
					onClick={handleShowLess}
				>
					Read less
				</Box>
			);
		} else {
			return null;
		}
	}, [handleShowLess, post?.content?.length, theme.palettes.colors.primary]);

	const handleDeleteSocialFeedPost = async (postId: string) => {
		try {
			const response = await dispatch(
				deletePost({
					socialFeedPostId: postId,
				}),
			);
			if (response.type === `${thunkString.deleteSocialFeedPosts}/fulfilled`) {
				toast.success('Post deleted successfully');
				handleGetLoggedInUserPosts && handleGetLoggedInUserPosts();
			}
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const handleGetComments = async (id: string) => {
		try {
			const response = await dispatch(
				getComments({
					postOrParentCommentId: id,
					sortField: 'createdAt',
					sortOrder: '-1',
				}),
			);
			if (response.type === `${thunkString.getComments}/fulfilled`) {
				setComments(response.payload);
			} else {
				setComments([]);
			}
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const handleAddComment = async () => {
		const payload = {
			postId: post?.id,
			modelType: 'SocialFeedPost',
			comment: comment,
		};

		try {
			const response = await dispatch(addComment(payload));

			if (response.type === `${thunkString.addComment}/fulfilled`) {
				toast.success('Comment added successfully');
				setComment('');
			}
		} catch (error) {
			throw new Error(error as string);
		} finally {
			handleGetSinglePost(post?.id);
			handleGetAllPosts && handleGetAllPosts();
			handleGetLoggedInUserPosts && handleGetLoggedInUserPosts();
		}
	};

	const renderContentSection = useMemo(
		() => () => {
			return (
				<Box
					style={{
						fontSize: '0.875rem',
						fontWeight: '400',
						lineHeight: '1.5rem',
						color: theme.palettes.colors.lightGray[3],
						whiteSpace: 'pre-wrap' as const,
					}}
				>
					{renderContent()}

					{/* Read more */}
					<Box
						style={{
							display: 'flex',
							justifyContent: 'end',
							marginBottom: '1rem',
						}}
					>
						{withShowMore && (
							<>{showMore ? renderShowLessButton() : renderShowMoreButton()}</>
						)}
					</Box>

					{/* Multimedia */}
					<Box
						mt={'0.5rem'}
						mx={'-1rem'}
						style={{
							display: 'flex',
							flexWrap: 'wrap' as const,
							gap: '0.5rem',
						}}
					>
						{multimedia?.length > 0 && <ImageSlider images={multimedia} />}
					</Box>
					{/* {post?.status === 'published' ? ( */}
					{withInteractionButtons && (
						<Box
							mt={'1rem'}
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<Box
								style={{
									display: 'flex',
									gap: '0.5rem',
								}}
							>
								<Box
									style={{
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<IconButton bg="transparent" onClick={handleUpvote}>
										{isUserUpvoted ? (
											<Icon component={Icons.UpvoteFillIcon} />
										) : (
											<Icon component={Icons.UpvoteIcon} />
										)}
									</IconButton>
									<Box
										mt={'5px'}
										color={theme.palettes.colors.lightGray[3]}
										style={{
											fontSize: '0.75rem',
											fontWeight: '500',
										}}
									>
										{/* {post?.upvote?.length > 0 ? post?.upvote?.length : 0} */}
										{upvoteCount}
									</Box>
								</Box>
								<Box
									style={{
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<IconButton
										bg="transparent"
										onClick={() => setToggleCommentBox(!toggleCommentBox)}
									>
										<Icon
											component={Icons.CommentIcon}
											color={
												post?.commentCount > 0
													? (theme.palettes.colors.primary as string)
													: theme.palettes.colors.lightGray[3]
											}
										/>
									</IconButton>
									<Box
										mt={'5px'}
										color={theme.palettes.colors.lightGray[3]}
										style={{
											fontSize: '0.75rem',
											fontWeight: '500',
										}}
									>
										{post?.commentCount}
									</Box>
								</Box>
								<Box>
									<IconButton
										bg="transparent"
										onClick={() => setShowShareModal(!showShareModal)}
									>
										<Icon
											component={Icons.ShareIcon}
											color={theme.palettes.colors.lightGray[3]}
										/>
									</IconButton>
								</Box>
							</Box>
							{/* {withShowMore && (
								<>
									{showMore ? renderShowLessButton() : renderShowMoreButton()}
								</>
							)} */}
						</Box>
					)}
					{/* ) : (
						<Box
							width={'100%'}
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
							}}
						>
							{withShowMore && (
								<>
									{showMore ? renderShowLessButton() : renderShowMoreButton()}
								</>
							)}
						</Box>
					)} */}
				</Box>
			);
		},
		[
			handleUpvote,
			isUserUpvoted,
			multimedia,
			post?.commentCount,
			renderContent,
			renderShowLessButton,
			renderShowMoreButton,
			showMore,
			theme.palettes.colors.lightGray,
			theme.palettes.colors.primary,
			upvoteCount,
			withShowMore,
			showShareModal,
			toggleCommentBox,
		],
	);

	return (
		<Paper withShadow>
			{/* Header part */}
			<Box
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Heading
					style={{
						wordBreak: 'break-word',
						display: 'inline-block',
					}}
					onClick={() => {
						if (withShowMore) {
							navigate(`/posts/${post?.id}`);
						} else {
							return;
						}
					}}
					type="h4"
					className={withShowMore ? styles['post-heading'] : ''}
				>
					{showWholePostTitle
						? post?.title
						: post?.title?.length > 50
						? post?.title?.slice(0, 50) + '...'
						: post?.title}
				</Heading>

				{showMenu && (
					<ButtonDropdown
						dropdownWrapperStyle={{
							overflow: 'hidden',
							width: '10rem',
						}}
						content={
							<IconButton bg="transparent">
								<Icons.ThreeDotsIcon />
							</IconButton>
						}
					>
						<DropdownItem
							style={{
								display: 'flex',
								gap: '0.5rem',
							}}
							onClick={() => setShowAddPostModal(true)}
						>
							<Icons.PenIcon />
							<Box
								color={theme.palettes.colors.darkBlue[0]}
								style={{
									fontSize: '0.8rem',
									fontWeight: '700',
								}}
							>
								Edit Post
							</Box>
						</DropdownItem>
						<DropdownItem
							style={{
								display: 'flex',
								gap: '0.5rem',
							}}
							onClick={() => handleDeleteSocialFeedPost(post?.id)}
						>
							<Icons.DeleteIcon />
							<Box
								color={theme.palettes.colors.darkBlue[0]}
								style={{
									fontSize: '0.8rem',
									fontWeight: '700',
								}}
							>
								Delete Post
							</Box>
						</DropdownItem>
					</ButtonDropdown>
				)}
			</Box>
			{/* AUTHOR */}
			<Box mt={'-5px'}>
				<Box
					style={{
						fontSize: '0.875rem',
					}}
					color={theme.palettes.colors.lightGray[2]}
				>
					{`${
						post?.userId?.isActive
							? post?.userId?.name ?? 'Unknown'
							: 'Deactivated User'
					}, ${format(new Date(post?.createdAt), 'dd MMM, yyyy')}`}
				</Box>
			</Box>
			{/* CONTENT */}
			<Box mt={'1rem'}>
				<Box>{renderContentSection()}</Box>
			</Box>
			{/* TAGS */}
			{post?.tags?.length > 0 && (
				<Box
					mt={'1rem'}
					style={{
						display: 'flex',
						gap: '0.5rem',
						flexWrap: 'wrap' as const,
					}}
				>
					{post?.tags?.map((tag: any, index: number) => (
						<Chip
							style={{
								padding: '0.25rem 0.5rem',
							}}
							key={index}
							fs={'0.75rem'}
						>
							{tag}
						</Chip>
					))}
				</Box>
			)}
			{toggleCommentBox && (
				<Box
					mt={'1rem'}
					// wrapper
				>
					<Box
						width={'100%'}
						style={{
							display: 'flex',
							gap: '0.5rem',
							alignItems: 'center',
						}}
					>
						<FormElements.Input
							width={'100%'}
							value={comment}
							placeholder="Share your thoughts 🗯️"
							onChange={e => setComment(e.target.value)}
						/>
						<Button
							onClick={handleAddComment}
							variant="unstyled"
							disabled={comment.length === 0}
							height="2.5rem"
							width="2.5rem"
							style={{
								backgroundColor: theme.palettes.colors.secondary as string,
								borderRadius: '50%',
							}}
						>
							<Icons.SendIcon />
						</Button>
					</Box>
				</Box>
			)}
			{toggleCommentBox && comments?.length > 0 && (
				<Box
					mt={'1rem'}
					style={{
						display: 'flex',
						flexDirection: 'column' as const,
						gap: '1rem',
					}}
				>
					{showPreviousComments
						? comments?.map((comment: any) => (
								<CommentBox
									removedBy={comment?.removedBy}
									postId={post?.id}
									comment={comment}
									key={comment?.id}
									commentId={comment?.id}
									handleGetAllComments={handleGetComments}
									handleGetSinglePost={handleGetSinglePost}
									handleGetAllPosts={handleGetAllPosts}
									handleGetLoggedInUserPosts={handleGetLoggedInUserPosts}
									// handleUpvoteComment={handleUpvoteComment}
								/>
						  ))
						: comments?.slice(0, 1)?.map((comment: any) => (
								<CommentBox
									removedBy={comment?.removedBy}
									postId={post?.id}
									comment={comment}
									key={comment?.id}
									commentId={comment?.id}
									handleGetAllComments={handleGetComments}
									handleGetSinglePost={handleGetSinglePost}
									handleGetAllPosts={handleGetAllPosts}
									handleGetLoggedInUserPosts={handleGetLoggedInUserPosts}
									// handleUpvoteComment={handleUpvoteComment}
								/>
						  ))}
					{comments?.length > 1 && (
						<Box mt={'0.3125rem'}>
							<Button
								style={{
									color: 'rgba(70, 75, 128, 1)',
									fontSize: '0.875rem',
								}}
								variant="text"
								onClick={() => setShowPreviousComments(!showPreviousComments)}
							>
								{showPreviousComments ? 'Hide' : 'Show'} All Comments
							</Button>
						</Box>
					)}
				</Box>
			)}
			<Suspense fallback={<Loaders.Page />}>
				<AddPostModal
					userId={user?.id}
					isOpen={showAddPostModal}
					toggleModal={() => setShowAddPostModal(!showAddPostModal)}
					handleGetAllPosts={handleGetAllPosts}
					handleGetPostById={handleGetLoggedInUserPosts}
					handleGetLoggedInUserPosts={handleGetLoggedInUserPosts}
					isEdit={true}
					post={post}
				/>
			</Suspense>
			<Suspense fallback={<Loaders.Page />}>
				<ShareModal
					isOpen={showShareModal}
					toggleModal={() => setShowShareModal(!showShareModal)}
					postId={post?.id}
				/>
			</Suspense>
		</Paper>
	);
};

export default PostCard;
