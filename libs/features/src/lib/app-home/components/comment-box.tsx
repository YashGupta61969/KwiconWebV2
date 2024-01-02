import { useTheme } from 'styled-components';
import { Icons } from '@kwicon/commons';
import { MediaImage } from '@kwicon/components';
import {
	Avatar,
	Box,
	Button,
	ButtonDropdown,
	Chip,
	DropdownItem,
	FormElements,
	Icon,
	IconButton,
	Paper,
	Paragraph,
} from '@kwicon/kwicon-ui';
import { formatDistanceToNow } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserState } from '../../user-profile/slices/user.slice';
import { AppDispatch } from '../../app-store/app-store';
import { thunkString } from '../thunk-apis/thunk-string';
import { addComment } from '../thunk-apis/add-comment';
import { handleCommentUpvote } from '../thunk-apis/handle-comment-upvote';
import { deleteComment } from '../thunk-apis/delete-comment';
import { RiErrorWarningLine } from 'react-icons/ri';

interface CommentBoxProps {
	comment: any;
	postId: string;
	commentId: string;
	handleGetAllComments: (id: string) => void;
	handleGetSinglePost: (id: string) => void;
	handleGetAllPosts: () => void | undefined;
	handleGetLoggedInUserPosts: (id: string) => void | undefined;
	showReply?: boolean;
	isReply?: boolean;
	removedBy?: string;
}

export const CommentBox: React.FC<CommentBoxProps> = ({
	comment,
	postId,
	commentId,
	handleGetAllComments,
	handleGetSinglePost,
	handleGetAllPosts,
	handleGetLoggedInUserPosts,
	showReply = true,
	isReply = false,
	removedBy,
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector(getUserState);
	const theme = useTheme();
	const [reply, setReply] = useState('');
	const [toggleReply, setToggleReply] = useState(false);
	const [isUserUpvoted, setIsUserUpvoted] = useState(false);
	const [showPrevReplies, setShowPrevReplies] = useState(false);

	useEffect(() => {
		// check if user has upvoted the post
		if (comment?.upvote?.length > 0) {
			const isUpvoted = comment?.upvote?.find(
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
	}, [comment?.upvote, user?.id, user]);

	const handleReplyComment = useCallback(async () => {
		const payload = {
			postId: postId,
			commentId: commentId,
			modelType: 'SocialFeedPostComment',
			comment: reply,
		};

		try {
			const response = await dispatch(addComment(payload));

			if (response.type === `${thunkString.addComment}/fulfilled`) {
				setReply('');
			}
		} catch (error) {
			throw new Error(error as string);
		} finally {
			handleGetAllComments(postId);
			handleGetSinglePost(postId);
			handleGetAllPosts && handleGetAllPosts();
			handleGetLoggedInUserPosts && handleGetLoggedInUserPosts(user?.id);
		}
	}, [
		commentId,
		dispatch,
		postId,
		reply,
		user?.id,
		handleGetAllPosts,
		handleGetLoggedInUserPosts,
		handleGetSinglePost,
		handleGetAllComments,
	]);

	const handleUpvoteComment = useCallback(async () => {
		try {
			await dispatch(
				handleCommentUpvote({
					id: commentId,
					isUpvote: isUserUpvoted ? false : true,
					isReply: isReply,
				}),
			);
		} catch (error) {
			throw new Error(error as string);
		} finally {
			handleGetSinglePost(postId);
			handleGetAllPosts && handleGetAllPosts();
			handleGetLoggedInUserPosts && handleGetLoggedInUserPosts(user?.id);
			handleGetAllComments(postId);
		}
	}, [
		commentId,
		dispatch,
		handleGetAllComments,
		handleGetAllPosts,
		handleGetLoggedInUserPosts,
		handleGetSinglePost,
		isReply,
		isUserUpvoted,
		postId,
		user?.id,
	]);

	const handleDeleteComment = useCallback(async () => {
		try {
			await dispatch(
				deleteComment({
					commentId: comment?.id,
					postId: postId,
				}),
			);
		} catch (error) {
			throw new Error(error as string);
		} finally {
			handleGetSinglePost(postId);
			handleGetAllPosts && handleGetAllPosts();
			handleGetLoggedInUserPosts && handleGetLoggedInUserPosts(user?.id);
			handleGetAllComments(postId);
		}
	}, [
		comment?.id,
		dispatch,
		handleGetAllComments,
		handleGetAllPosts,
		handleGetLoggedInUserPosts,
		handleGetSinglePost,
		postId,
		user?.id,
	]);

	return (
		<Paper withBorder>
			{removedBy !== 'user' && (
				// eslint-disable-next-line react/jsx-no-useless-fragment
				<>
					{comment?.commenterId?.isActive ? (
						<Box
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<Box
								style={{
									display: 'flex',
									gap: '0.75rem',
									alignItems: 'center',
								}}
							>
								<MediaImage
									mediaId={comment?.commenterId?.profilePicture}
									avatarProps={{
										size: 'small',
										type: 'image',
										text: comment?.commenterId?.name,
									}}
								/>
								<Box>
									<Box
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '0.5rem',
										}}
									>
										<Box
											style={{
												fontWeight: 600,
											}}
										>
											{comment?.commenterId?.name}
										</Box>
										{comment?.isAuthor && (
											<Chip
												fs="0.75rem"
												style={{
													padding: '0.125rem 0.25rem',
												}}
											>
												Author
											</Chip>
										)}
									</Box>
									<Box
										mt={'0.3125rem'}
										style={{
											color: '#4F4F4F',
											fontSize: '12px',
										}}
									>
										{comment?.commenterId?.profession ?? 'Unknown'}
									</Box>
								</Box>
							</Box>
							{comment?.commenterId?.id === user?.id && (
								<ButtonDropdown
									content={
										<IconButton bg="transparent">
											<Icons.ThreeDotsIcon />
										</IconButton>
									}
									dropdownWrapperStyle={{
										width: 'max-content',
										overflow: 'hidden',
									}}
								>
									<DropdownItem
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '0.5rem',
										}}
										onClick={handleDeleteComment}
									>
										<Icon
											component={Icons.DeleteIcon}
											color={theme.palettes.error[1]}
										/>
										<Box color={theme.palettes.error[1]}>Delete</Box>
									</DropdownItem>
								</ButtonDropdown>
							)}
						</Box>
					) : (
						<Box
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<Box
								style={{
									display: 'flex',
									gap: '0.75rem',
									alignItems: 'center',
								}}
							>
								<Box
									width={'2.5rem'}
									height={'2.5rem'}
									bg="rgba(240, 241, 255, 0.5)"
									borderRadius="50%"
									border="1px solid rgba(40, 53, 187, 0.15)"
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Icon
										component={Icons.BlockedIcon}
										color="rgba(40, 53, 187, 0.15)"
										height="1.25rem"
										width="1.25rem"
									/>
								</Box>
								<Box>
									<Box
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '0.5rem',
										}}
									>
										<Box
											style={{
												fontWeight: 600,
												color: 'rgba(70, 75, 128, 0.6)',
											}}
										>
											Deactivated User
										</Box>
										{comment?.isAuthor && (
											<Chip
												fs="0.75rem"
												style={{
													padding: '0.125rem 0.25rem',
												}}
											>
												Author
											</Chip>
										)}
									</Box>
									<Box
										mt={'0.3125rem'}
										style={{
											color: '#828282',
											fontSize: '12px',
										}}
									>
										No longer on Kwicon
									</Box>
								</Box>
							</Box>
							{comment?.commenterId === user?.id && (
								<ButtonDropdown
									content={
										<IconButton bg="transparent">
											<Icons.ThreeDotsIcon />
										</IconButton>
									}
									dropdownWrapperStyle={{
										width: 'max-content',
										overflow: 'hidden',
									}}
								>
									<DropdownItem
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '0.5rem',
										}}
										onClick={handleDeleteComment}
									>
										<Icon
											component={Icons.DeleteIcon}
											color={theme.palettes.error[1]}
										/>
										<Box color={theme.palettes.error[1]}>Delete</Box>
									</DropdownItem>
								</ButtonDropdown>
							)}
						</Box>
					)}
				</>
			)}
			{removedBy !== 'user' ? (
				<Paragraph type="p2" fs={'0.875rem'}>
					{comment?.comment}
				</Paragraph>
			) : (
				<Box
					my={'0.5rem'}
					style={{
						display: 'flex',
						gap: '0.5rem',
						alignItems: 'center',
					}}
				>
					<RiErrorWarningLine size={20} color={theme.palettes.error[1]} />
					<Box color="rgba(70, 75, 128, 0.6)">
						This comment has been removed by the user.
					</Box>
				</Box>
			)}
			<Box
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Box
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '1rem',
					}}
				>
					<Box
						ml={'-0.5rem'}
						style={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<IconButton
							disabled={removedBy === 'user'}
							bg="transparent"
							onClick={handleUpvoteComment}
						>
							<Icon
								color={
									removedBy !== 'user'
										? isUserUpvoted
											? (theme.palettes.colors.primary as string)
											: theme.palettes.colors.lightGray[3]
										: 'rgba(40, 53, 187, 0.15)'
								}
								component={Icons.UpvoteIcon}
							/>
						</IconButton>

						<Box
							mt={'5px'}
							color={theme.palettes.colors.lightGray[3]}
							style={{
								fontSize: '0.875rem',
								fontWeight: '500',
							}}
						>
							{comment?.upvote?.length > 0 ? comment?.upvote?.length : 0}
						</Box>
					</Box>
					{showReply && (
						<Box
							mt={'0.3125rem'}
							style={{
								display: 'flex',
								gap: '0.3125rem',
								alignItems: 'center',
							}}
						>
							{removedBy !== 'user' && (
								<Button
									variant="text"
									style={{
										padding: 0,
										fontSize: '0.875rem',
									}}
									onClick={() => setToggleReply(!toggleReply)}
								>
									Reply
								</Button>
							)}
							<Box
								color="#464B80"
								style={{
									fontSize: '0.875rem',
								}}
							>
								<Box
									as="span"
									style={{
										fontWeight: 600,
										color: '#4F4F4F',
									}}
								>
									| &nbsp; {comment?.replies?.length ?? 0}
								</Box>
								&nbsp; Replies
							</Box>
						</Box>
					)}
				</Box>
				<Box
					style={{
						color: 'rgba(70, 75, 128, 0.4)',
						fontSize: '0.75rem',
					}}
				>
					{formatDistanceToNow(new Date(comment?.createdAt), {
						addSuffix: true,
					})}
				</Box>
			</Box>
			{toggleReply && (
				<Box
					mt={'1rem'}
					style={{
						display: 'flex',
						gap: '0.5rem',
					}}
					// wrapper
				>
					<Box>
						<MediaImage
							mediaId={user?.profilePicture}
							avatarProps={{
								size: 'small',
								type: 'image',
								text: user?.name,
							}}
						/>
					</Box>
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
							value={reply}
							placeholder="Write a reply"
							onChange={e => setReply(e.target.value)}
						/>
						<Button
							onClick={handleReplyComment}
							variant="unstyled"
							disabled={reply.length === 0}
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
			<Box>
				{comment?.replies?.length > 0 && (
					<Box
						mt={'0.5rem'}
						style={{
							display: 'flex',
							flexDirection: 'column' as const,
							gap: '0.5rem',
						}}
					>
						{comment?.replies?.length > 1 && (
							<Box mt={'0.5rem'}>
								<Button
									style={{
										color: 'rgba(70, 75, 128, 1)',
										fontSize: '0.875rem',
									}}
									variant="text"
									onClick={() => setShowPrevReplies(!showPrevReplies)}
								>
									{showPrevReplies ? 'Hide' : 'Show'} Previous Replies
								</Button>
							</Box>
						)}
						{
							// when show previous reply is true then show all the replies, else show only the latest reply by created at
							showPrevReplies
								? comment?.replies?.map((reply: any) => (
										<CommentBox
											removedBy={reply?.removedBy}
											key={reply?.id}
											comment={reply}
											postId={postId}
											showReply={false}
											commentId={reply?.id}
											handleGetAllComments={handleGetAllComments}
											handleGetSinglePost={handleGetSinglePost}
											handleGetAllPosts={handleGetAllPosts}
											handleGetLoggedInUserPosts={handleGetLoggedInUserPosts}
											isReply={true}
										/>
								  ))
								: comment?.replies
										?.slice(-1)
										?.map((reply: any) => (
											<CommentBox
												removedBy={reply?.removedBy}
												key={reply?.id}
												comment={reply}
												postId={postId}
												showReply={false}
												commentId={reply?.id}
												handleGetAllComments={handleGetAllComments}
												handleGetSinglePost={handleGetSinglePost}
												handleGetAllPosts={handleGetAllPosts}
												handleGetLoggedInUserPosts={handleGetLoggedInUserPosts}
												isReply={true}
											/>
										))
						}
					</Box>
				)}
			</Box>
		</Paper>
	);
};
