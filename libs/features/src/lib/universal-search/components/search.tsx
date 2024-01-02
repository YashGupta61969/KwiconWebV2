import { Icons } from '@kwicon/commons';
import { MediaImage, SelectBox } from '@kwicon/components';
import { Box, Button, Paper, Paragraph } from '@kwicon/kwicon-ui';
import { format } from 'date-fns';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MenuListProps } from 'react-select';
import { useTheme } from 'styled-components';
import { searchUniversalPosts } from '../../app-home/thunk-apis/search-posts';
import { AppDispatch } from '../../app-store/app-store';
import { getOnboardingState } from '../../onboarding/slices/onboarding.slice';
import { getAllAdvisors } from '../../onboarding/thunk-apis/get-all-advisors';
import { getOnboardingCategories } from '../../onboarding/thunk-apis/get-onboarding-categories';
import { getSubCategoriesByCategories } from '../../onboarding/thunk-apis/get-subcategories-by-categories';
import { getUniversalSearchState } from '../slices/universal-search.slice';
import { searchAdvisors } from '../thunk-apis/search-advisors';

export interface TopicOption extends PostOption {
	name: string;
	profession: string;
	role: string;
	category: string;
	profilePicture: string;
}

export const topicOptions: readonly TopicOption[] = [];

export interface PeopleOption {
	name: string;
	profession: string;
	profilePicture: string;
	role: string;
	category: string;
}

export interface PostOption extends PeopleOption {
	title: string;
	content: string;
	userId: any;
}

export interface GroupedOption {
	readonly label: string;
	readonly options:
		| readonly TopicOption[]
		| readonly PeopleOption[]
		| readonly PostOption[]
		| readonly any[];
}

const groupStyles = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	color: '#464B80',
	fontSize: 16,
	fontWeight: 700,
	marginTop: 16,
	marginBottom: 16,
};

const formatGroupLabel = (data: GroupedOption) => (
	<div style={groupStyles}>
		<span>{data.label}</span>
	</div>
);

const topicStyles = {
	fontSize: 14,
	color: 'black',
	paddingTop: 4,
	paddingBottom: 4,
};

const FormatOptionLabel = (data: TopicOption | PeopleOption | PostOption) => {
	return (
		<>
			{data?.category && <div style={topicStyles}>{data?.name}</div>}
			{data?.role && (
				<div
					style={{
						borderRadius: 8,
						borderWidth: 1,
					}}
				>
					<Box
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'flex-start',
							gap: 10,
						}}
					>
						<div style={{ marginRight: 10 }}>
							<MediaImage
								mediaId={data?.profilePicture}
								avatarProps={{
									type: 'image',
									text: data?.name,
									size: 'small',
								}}
							/>
						</div>
						<div>
							<div style={{ color: 'black', fontSize: 14, fontWeight: 700 }}>
								{data?.name}
							</div>
							<div style={{ color: '#4F4F4F', fontSize: 12 }}>
								{data?.profession}
							</div>
						</div>
					</Box>
				</div>
			)}
			{data?.title && data?.content ? (
				<Paper mt={'0.5rem'} showTransition bg="transparent" p={0}>
					<Box mb={'1rem'}>
						<Box
							style={{
								fontWeight: 700,
								fontSize: '1.25rem',
							}}
						>
							{data?.title?.length > 50
								? data?.title?.slice(0, 50) + '...'
								: data?.title}
						</Box>
						<Box
							mt={'0.3125rem'}
							style={{
								fontSize: '0.875rem',
								color: 'rgba(0, 0, 0, 0.6)',
							}}
						>
							{data?.userId?.name ?? 'Unknown'},{' '}
							{format(new Date(data?.createdAt), 'MMM dd, yyyy')}
						</Box>
					</Box>
					<Paragraph
						fs={'0.875rem'}
						color="rgba(0, 0, 0, 0.6)"
						style={{
							margin: 0,
							wordWrap: 'break-word',
							whiteSpace: 'pre-wrap',
						}}
					>
						{data?.content?.slice(0, 100)}...
					</Paragraph>
				</Paper>
			) : null}
			{/* Load More Button */}
		</>
	);
};

export function Search() {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const selectRef = useRef(null);
	const theme = useTheme();

	const { onboardingCategories, subCategoryList, advisors } =
		useSelector(getOnboardingState);
	const { universalSearchedPosts } = useSelector(getUniversalSearchState);

	const [searchText, setSearchText] = useState<string>('');

	useEffect(() => {
		handleGetCategories();
		handleGetAllAdvisors();
		handleGetAllPost();
	}, []);

	const groupedOptions = useMemo(() => {
		if (
			subCategoryList !== undefined &&
			advisors !== undefined &&
			universalSearchedPosts !== undefined
		) {
			if (subCategoryList && advisors && universalSearchedPosts) {
				return [
					{
						label: 'PEOPLES',
						options: advisors?.map(item => {
							return { ...item, value: item.name };
						}),
					},
					{
						label: 'TOPICS',
						options: subCategoryList?.map(item => {
							return { ...item, value: item.name, label: item.name };
						}),
					},
					{
						label: 'POSTS',
						options: universalSearchedPosts?.map(item => {
							return { ...item, value: item.id, label: item.title };
						}),
					},
				];
			}
		}
	}, [subCategoryList, advisors]);
	// set the categories to the local state
	useEffect(() => {
		if (
			onboardingCategories?.categoryList !== undefined &&
			onboardingCategories?.categoryList !== null
		) {
			if (onboardingCategories?.categoryList.length > 0) {
				handleGetSubCategoriesByCategories([
					...onboardingCategories.categoryList,
					'custom category',
				]);
			}
		}
	}, [onboardingCategories.categoryList]);

	//* -- Handlers -- *//
	// get the categories from the api
	const handleGetCategories = useCallback(async () => {
		try {
			await dispatch(getOnboardingCategories());
		} catch (error) {
			throw new Error(error as string);
		}
	}, [dispatch]);

	const handleGetSubCategoriesByCategories = useCallback(
		async (categories: string[]) => {
			try {
				await dispatch(getSubCategoriesByCategories(categories));
			} catch (error) {
				throw new Error(error as string);
			}
		},
		[dispatch],
	);

	const handleSearchAdvisors = useCallback(
		async (keyword: string) => {
			try {
				navigate('/search-results');
				setSearchText('');
				await dispatch(searchAdvisors({ keyword, page: 1, limit: 10 }));
			} catch (error) {
				throw new Error(error as string);
			}
		},
		[dispatch, setSearchText, navigate],
	);

	const handleGetAllPost = useCallback(async () => {
		try {
			await dispatch(
				searchUniversalPosts({
					limit: 200,
					populate: 'userId',
					sort: '-createdAt',
				}),
			);
		} catch (error) {
			throw new Error(error as string);
		}
	}, [dispatch]);

	const handleSearchPosts = useCallback(
		async (keyword: string) => {
			try {
				navigate('/search-results');
				await dispatch(
					searchUniversalPosts({
						keyword,
						populate: 'userId',
					}),
				);
			} catch (error) {
				throw new Error(error as string);
			}
		},
		[dispatch, navigate],
	);

	// handle get all advisors
	const handleGetAllAdvisors = async () => {
		try {
			await dispatch(getAllAdvisors());
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const handleOnChange = (option: any) => {
		if (!option) {
			option = {
				target: selectRef,
				value: '',
			};
		} else {
			handleSearchAdvisors(option.name);
			handleSearchPosts(option.title);
		}
	};

	const CustomMenu = ({
		innerRef,
		innerProps,
		children,
		options,
	}: MenuListProps) => {
		// check if the search text is on the option's value, label or in category or not.

		const filteredOptions: any = useMemo(
			() =>
				options.reduce((acc: any, curr: any) => {
					const filtered = curr.options.filter((item: any) => {
						if (item?.label) {
							return item.label
								.toLowerCase()
								.includes(searchText.toLowerCase());
						} else if (item?.name) {
							return item.name.toLowerCase().includes(searchText.toLowerCase());
						} else if (item?.category) {
							return item.category
								.toLowerCase()
								.includes(searchText.toLowerCase());
						} else {
							return false;
						}
					});
					if (filtered.length > 0) {
						acc.push({
							label: curr.label,
							options: filtered,
						});
					}
					return acc;
				}, []),
			[options],
		);

		return (
			<div
				ref={innerRef}
				{...innerProps}
				style={{
					background: theme.palettes.colors.white as string,
					borderRadius: theme.borderRadius.regular as string,
					marginTop: '0.5rem',
					boxShadow:
						'0px 4px 15px 0px rgba(28, 28, 35, 0.03), 0px 1px 5px 0px rgba(28, 28, 35, 0.15)',
				}}
			>
				{children}
				{searchText !== '' && filteredOptions?.length !== 0 ? (
					<Box
						width={'100%'}
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Button
							variant="text"
							color="primary"
							style={{
								fontSize: 12,
							}}
							onClick={() => {
								handleSearchAdvisors(searchText);
								handleSearchPosts(searchText);
							}}
						>
							See all results
						</Button>
					</Box>
				) : null}
			</div>
		);
	};

	return (
		<SelectBox
			placeholder="Search advisors by name, profession, expertise"
			options={groupedOptions && groupedOptions}
			components={{
				IndicatorSeparator: () => null,
				DropdownIndicator: () => (
					<Icons.SearchIcon style={{ padding: '10px' }} />
				),
				Menu: CustomMenu,
			}}
			ref={selectRef}
			variant="select"
			onInputChange={value => {
				setSearchText(value);
			}}
			formatGroupLabel={formatGroupLabel}
			formatOptionLabel={FormatOptionLabel}
			onChange={handleOnChange}
			noOptionMessage="No results found"
			value={searchText}
			menuIsOpen={searchText !== ''}
		/>
	);
}

export default Search;
