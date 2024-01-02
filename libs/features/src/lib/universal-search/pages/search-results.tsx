import {
	Box,
	Breadcrumb,
	Heading,
	Loaders,
	PaginationFooter,
	TabBar,
} from '@kwicon/kwicon-ui';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PostCard } from '../../app-home/components/post-card';
import { getSocialFeedPostById } from '../../app-home/thunk-apis/get-social-feed-post-by-id';
import { searchUniversalPosts } from '../../app-home/thunk-apis/search-posts';
import { AppDispatch } from '../../app-store/app-store';
import { getUser } from '../../onboarding/thunk-apis/get-user';
import {
	createDialogQB,
	getChatsQB,
} from '../../quickblox/thunk-apis/quickblox';
import { getUserState } from '../../user-profile/slices/user.slice';
import { getConnections } from '../../user-profile/thunk-apis/get-connections';
import { thunkString } from '../../user-profile/thunk-apis/thunk-string';
import { unfollowUser } from '../../user-profile/thunk-apis/unfollow-user';
import SearchedUser from '../components/searched-user';
import { getUniversalSearchState } from '../slices/universal-search.slice';
import { searchAdvisors } from '../thunk-apis/search-advisors';
import { FilterDropdown } from '../components/filter-dropdown';

export function SearchResults() {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const {
		searchedAdvisors,
		totalRecords,
		totalPages,
		currentPage,
		searchedKeyword,
		universalSearchedPosts,
		uniSearchedPaginationData,
		loadingStatus,
	} = useSelector(getUniversalSearchState);
	const { user } = useSelector(getUserState);

	const [limit, setLimit] = useState(10);
	const [postLimit, setPostLimit] = useState(10);

	const [acceptedRequestsId, setAcceptedRequestsId] = useState([]);

	const [selected, setSelected] = useState(0);

	useEffect(() => {
		if (searchedKeyword) {
			dispatch(
				searchAdvisors({
					keyword: searchedKeyword,
					page: currentPage,
					limit,
				}),
			);

			dispatch(
				searchUniversalPosts({
					keyword: searchedKeyword,
					page: uniSearchedPaginationData?.searchedCurrentPage,
					limit: postLimit,
					populate: 'userId',
				}),
			);
		}
	}, [limit, searchedKeyword, dispatch, postLimit]);

	useEffect(() => {
		// get all connection requests
		handleGetUser();
	}, []);

	// useEffect(() => {
	// 	if (state?.selected !== undefined && state?.selected !== null) {
	// 		setSelected(state?.selected);
	// 	}
	// }, [state?.selected]);

	const handleGetUser = async () => {
		try {
			await dispatch(getUser());
			dispatch(
				getConnections({
					type: 'advisor',
					limit: 100,
				}),
			);
			dispatch(
				getConnections({
					type: 'seeker',
					limit: 100,
				}),
			);
		} catch (error) {
			throw new Error(error as string);
		}
	};

	// set the received requests according to the search results
	useEffect(() => {
		if (user?.connections?.advisor) {
			if (user?.connections?.advisor?.length > 0) {
				const connectorsId = user?.connections?.advisor?.map(
					(connection: any) => connection?.id,
				);

				if (connectorsId?.length > 0) {
					// check if the requests ids are in the searched advisors ids
					const filteredRequestsId = connectorsId?.filter((id: string) => {
						return searchedAdvisors?.some((advisor: any) => advisor.id === id);
					});

					setAcceptedRequestsId(filteredRequestsId);
				}
			}
		}
	}, [user?.connections?.advisor, searchedAdvisors]);

	const handlePrevPageClick = async () => {
		if (currentPage === 1) return;
		await dispatch(
			searchAdvisors({
				keyword: searchedKeyword,
				page: currentPage - 1,
				limit,
			}),
		);
	};
	const handlePrevPageClickPost = async () => {
		if (uniSearchedPaginationData?.searchedCurrentPage === 1) return;
		await dispatch(
			searchUniversalPosts({
				keyword: searchedKeyword,
				page: Number(uniSearchedPaginationData?.searchedCurrentPage) - 1,
				limit: postLimit,
				populate: 'userId',
			}),
		);
	};

	const handleNextPageClick = async () => {
		if (currentPage === totalPages) return;
		await dispatch(
			searchAdvisors({
				keyword: searchedKeyword,
				page: currentPage + 1,
				limit,
			}),
		);
	};

	const handleNextPageClickPost = async () => {
		if (
			uniSearchedPaginationData?.searchedCurrentPage ===
			uniSearchedPaginationData?.searchedTotalPages
		)
			return;
		await dispatch(
			searchUniversalPosts({
				keyword: searchedKeyword,
				page: Number(uniSearchedPaginationData?.searchedCurrentPage) + 1,
				limit: postLimit,
				populate: 'userId',
			}),
		);
	};

	const handlePrevStateClick = async () => {
		await dispatch(
			searchAdvisors({ keyword: searchedKeyword, page: 1, limit }),
		);
	};

	const handlePrevStateClickPost = async () => {
		await dispatch(
			searchUniversalPosts({
				keyword: searchedKeyword,
				page: 1,
				limit: postLimit,
				populate: 'userId',
			}),
		);
	};

	const handleNextStateClick = async () => {
		await dispatch(
			searchAdvisors({ keyword: searchedKeyword, page: totalPages, limit }),
		);
	};

	const handleNextStateClickPost = async () => {
		await dispatch(
			searchAdvisors({
				keyword: searchedKeyword,
				page: uniSearchedPaginationData?.searchedTotalPages,
				limit: postLimit,
			}),
		);
	};

	const handleUnfollowUser = async (id: string, name: string) => {
		try {
			const response = await dispatch(
				unfollowUser({
					userId: id,
				}),
			);
			if (response.type === `${thunkString.unfollowUser}/fulfilled`) {
				handleGetUser();
				toast.success(`${name} unfollowed successfully!`);
			}
		} catch (error) {
			throw new Error(error as string);
		} finally {
			handleGetUser();
		}
	};

	const handleChatClick = async (
		QBUserId: number,
		userId: string,
		photoId: string,
		profession: string,
	) => {
		const response = await dispatch(
			createDialogQB({
				type: 3,
				occupants_ids: [QBUserId],
				data: {
					class_name: 'kwiconCustomData',
					userId,
					photoId,
					profession,
				},
			}),
		);

		dispatch(
			getChatsQB({
				chat_dialog_id: response?.payload._id,
				sort_asc: 'date_sent',
				limit: 100,
			}),
		);

		navigate('/chat');
	};

	const handleSearchPosts = useCallback(async () => {
		try {
			await dispatch(
				searchUniversalPosts({
					keyword: searchedKeyword as string,
					limit: postLimit,
					populate: 'userId',
				}),
			);
		} catch (error) {
			throw new Error(error as string);
		}
	}, [dispatch, postLimit, searchedKeyword]);

	const handleGetPostById = async (id: string) => {
		try {
			await dispatch(getSocialFeedPostById(id));
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const tabs = [
		{
			value: 0,
			label: `Advisors (${searchedAdvisors?.length ?? 0})`,
			disabled: searchedAdvisors?.length === 0,
		},
		{
			value: 1,
			label: `Posts (${universalSearchedPosts?.length ?? 0})`,
			disabled: universalSearchedPosts?.length === 0,
		},
	];

	return (
		<Box>
			<Box width={'100%'}>
				<Breadcrumb navigate={navigate} />
			</Box>
			<Box
				as={'div'}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Heading fs={'1.75rem'} fw={'700'}>
					Search Results
				</Heading>
			</Box>
			{/* TAB BAR */}
			<section
				style={{
					marginTop: '2rem',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Box width={'50%'}>
					<TabBar tabs={tabs} selected={selected} setSelected={setSelected} />
				</Box>
				{selected === 0 && (
					<Box>
						<FilterDropdown limit={limit} />
					</Box>
				)}
			</section>
			{selected === 0 ? (
				loadingStatus !== 'loading' ? (
					<Box mt={'2rem'}>
						{searchedAdvisors?.map((advisor: any) => {
							return (
								<SearchedUser
									advisor={advisor}
									acceptedRequestsId={acceptedRequestsId}
									handleChatClick={handleChatClick}
									handleUnfollowUser={handleUnfollowUser}
								/>
							);
						})}
						{searchedAdvisors && (
							<PaginationFooter
								currentPage={currentPage}
								limit={limit}
								setLimit={setLimit}
								totalRecords={totalRecords}
								dataLength={searchedAdvisors.length}
								onPrevPageClick={handlePrevPageClick}
								onNextPageClick={handleNextPageClick}
								onPrevStateClick={handlePrevStateClick}
								onNextStateClick={handleNextStateClick}
							/>
						)}
					</Box>
				) : (
					<Loaders.Page />
				)
			) : (
				<Box my={'2rem'}>
					<Box
						width={'60%'}
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '1rem',
						}}
					>
						{universalSearchedPosts?.map((post: any, index: number) => (
							<PostCard
								post={post}
								key={index}
								handleGetAllPosts={handleSearchPosts}
								handleGetSinglePost={handleGetPostById}
							/>
						))}
						{universalSearchedPosts && (
							<PaginationFooter
								currentPage={
									uniSearchedPaginationData?.searchedCurrentPage as number
								}
								limit={postLimit}
								setLimit={setPostLimit}
								totalRecords={
									uniSearchedPaginationData?.searchedTotal as number
								}
								dataLength={universalSearchedPosts?.length}
								onPrevPageClick={handlePrevPageClickPost}
								onNextPageClick={handleNextPageClickPost}
								onPrevStateClick={handlePrevStateClickPost}
								onNextStateClick={handleNextStateClickPost}
							/>
						)}
					</Box>
				</Box>
			)}
		</Box>
	);
}

// export default UserProfile;
