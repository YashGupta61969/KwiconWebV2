import {
	ICategory,
	IInterest,
	Icons,
	routePaths,
	sortSubCategories,
	useRefScrollTop,
} from '@kwicon/commons';
import { SelectBox } from '@kwicon/components';
import {
	Box,
	Breadcrumb,
	Button,
	Chip,
	Heading,
	Loaders,
	Paragraph,
} from '@kwicon/kwicon-ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import OnBoardingSelectSubInterest from '../../onboarding/components/onboarding-select-sub-interest';
import {
	getOnboardingState,
	onboardingActions,
} from '../../onboarding/slices/onboarding.slice';
import { addCategory } from '../../onboarding/thunk-apis/add-category';
import { getOnboardingCategories } from '../../onboarding/thunk-apis/get-onboarding-categories';
import { getSubCategoriesByCategories } from '../../onboarding/thunk-apis/get-subcategories-by-categories';
import { getUser } from '../../onboarding/thunk-apis/get-user';
import { setUserProfileForm } from '../../onboarding/thunk-apis/set-user-profile-form';
import { thunkString } from '../../onboarding/thunk-apis/thunk-string';
import { getUserState } from '../slices/user.slice';

export function UserInterests() {
	// hooks
	const theme = useTheme();
	const navigate = useNavigate();
	const refToTop = useRefScrollTop();

	// redux store
	const dispatch = useDispatch<AppDispatch>();

	/*
    COPY FROM MOOEN
  */
	//* Redux store
	const { onboardingCategories, subCategoryList, onboardingUserData } =
		useSelector(getOnboardingState);
	const { user, loadingStatus } = useSelector(getUserState);
	const selectRef = useRef(null);

	// local states
	// const [categories, setCategories] = useState<{
	// 	categoryList: string[] | undefined | null;
	// }>({
	// 	categoryList: [],
	// });
	// const [selectedCategories, setSelectedCategories] = useState<
	// 	string[] | undefined
	// >([]);

	//* Getting the user
	useEffect(() => {
		handleGetUser();
	}, []);

	// get user function
	const handleGetUser = async () => {
		try {
			await dispatch(getUser());
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const [userInterests, setUserInterests] = useState<
		| {
				id: string;
				name: string;
				category: string;
				schoolId: string;
		  }[]
		| null
		| undefined
	>([]);

	const [selectedSubCategories, setSelectedSubCategories] = useState<
		string[] | undefined
	>([]);
	const [createdCategories, setCreatedCategories] = useState<
		{
			value: string;
			label: string;
		}[]
	>([]);
	// const [showSubInterests, setShowSubInterests] = useState(false);
	const [sortedCategories, setSortedCategories] = useState<
		ICategory[] | undefined
	>([]);
	const [options, setOptions] = useState<
		{
			value: string;
			label: string;
			category: string;
		}[]
	>([]);
	const [createLoader, setCreateLoader] = useState<boolean>(false);

	// getting the categories from the api
	useEffect(() => {
		handleGetCategories();

		return () => {
			// cleanup
			dispatch(onboardingActions.resetOnboardingCategories());
		};
	}, [dispatch]);

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

	// sort the categories
	useEffect(() => {
		//? sorting the duplicate subcategories by its category and place the names in the array of respective category
		// TODO: have to work with the any type
		if (
			subCategoryList !== null &&
			subCategoryList !== undefined &&
			subCategoryList.length > 0
		) {
			const sortedData = sortSubCategories(subCategoryList);

			const optionForSelectBox = subCategoryList.map((item: any) => ({
				value: item.id,
				label: item.name,
				category: item.category,
			}));

			setSortedCategories(sortedData);
			setOptions(optionForSelectBox);
		}
	}, [subCategoryList, setSortedCategories, setOptions]);

	// if there's already some selected categories from the user state then set them to the setSelectedCategories
	useEffect(() => {
		if (user !== undefined && (user?.interests?.length as number) > 0) {
			// const uniqueCategories = user.interests
			// 	.map((item: any) => item.category)
			// 	.filter(
			// 		(value: string, index: number, self: any) =>
			// 			self.indexOf(value) === index,
			// 	);

			const uniqueSubCategories = user.interests
				?.map((item: any) => item?.id)
				.filter(
					(value: string, index: number, self: any) =>
						self.indexOf(value) === index,
				);

			// setSelectedCategories(uniqueCategories);
			setSelectedSubCategories(uniqueSubCategories);
		}
	}, [user]);

	useEffect(() => {
		if (selectedSubCategories && selectedSubCategories?.length > 0) {
			dispatch(onboardingActions.setOnboardingInterests(selectedSubCategories));
		}
	}, [selectedSubCategories, dispatch]);

	// user sorted categories
	useEffect(() => {
		const filteredCategories = subCategoryList?.filter(cat =>
			selectedSubCategories?.includes(cat.id),
		);
		setUserInterests(filteredCategories as IInterest[]);
	}, [selectedSubCategories, subCategoryList]);

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

	// handle on change options
	const handleOnChangeOptions = (option: any) => {
		// add the selected value in the selectedSubCategories array but if the value is already in the array then remove it from the array.
		if (!option) {
			option = {
				target: selectRef,
				value: '',
			};
		}

		setSelectedSubCategories(prev => {
			if (prev !== undefined) {
				const isCategorySelected = prev.includes(option.value);
				if (isCategorySelected) {
					const newCategories = prev.filter(item => item !== option.value);
					return newCategories;
				} else {
					return [...prev, option.value];
				}
			}
			return [];
		});

		if (option) {
			// clear the input value
			option.target.value = '';
		}
	};

	// handle create option
	const handleCreateOption = async (inputValue: string) => {
		try {
			setCreateLoader(true);
			const newOption = {
				value: inputValue,
				label: inputValue,
				category: '',
			};

			const response = await dispatch(addCategory(inputValue));

			if (response.type === `${thunkString.addCategory}/fulfilled`) {
				setOptions(prev => {
					return [...prev, newOption];
				});

				setCreatedCategories(prev => {
					return [...prev, newOption];
				});
			}
		} catch (error) {
			throw new Error(error as string);
		} finally {
			setCreateLoader(false);
		}
	};

	// handle select sub categories
	const handleSelectSubCategories = (value: string) => {
		setSelectedSubCategories(prev => {
			if (prev !== undefined) {
				const isCategorySelected = prev.includes(value);
				if (isCategorySelected) {
					const newCategories = prev.filter(item => item !== value);
					return newCategories;
				} else {
					return [...prev, value];
				}
			}
			return [];
		});

		// if value in onboardingUserData.interests then remove it from the array with the help of filter & setOnboardingInterests
		const isSubCategorySelected = onboardingUserData.interests?.includes(value);
		if (isSubCategorySelected) {
			const newSubCategories = onboardingUserData.interests?.filter(
				item => item !== value,
			);
			dispatch(onboardingActions.setOnboardingInterests(newSubCategories));
		}
	};

	// remove creatable options from the createdCategories array
	const handleRemoveCreatableOptions = (value: string) => {
		setCreatedCategories(prev => {
			if (prev !== undefined) {
				const newCategories = prev.filter(item => item.value !== value);
				return newCategories;
			}
			return [];
		});
	};

	// update interest handler
	const updateInterestHanlder = async () => {
		// if there's no selectedSubCategories then show a error toast
		if (selectedSubCategories?.length === 0) {
			toast.error('Please select at least one interest!');
			return;
		}
		const response = await dispatch(
			setUserProfileForm({ interests: selectedSubCategories }),
		);
		if (response.type === `${thunkString.setUserProfileForm}/fulfilled`) {
			toast.success('Interest has been updated!');
			navigate(routePaths.user.root);
		}
	};

	// Show the loadings
	if (loadingStatus === 'loading') {
		return <Loaders.Page />;
	}

	return (
		<div ref={refToTop}>
			<Box pb={'4rem'}>
				<Breadcrumb navigate={navigate} />
				<Box
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Heading fs={'1.75rem'} fw={'600'}>
						My Profile
					</Heading>
					<Box style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
						<Link
							to={routePaths.user.root}
							style={{
								borderRadius: theme.borderRadius.regular,
								background: theme.palettes.colors.white as string,
								padding: '0.6rem 1rem',
								border: `1px solid ${theme.palettes.colors.lightBlue[2]}`,
							}}
						>
							Cancel
						</Link>
						<Button
							onClick={updateInterestHanlder}
							size="medium"
							borderRadius={theme.borderRadius.regular}
						>
							Save Changes
						</Button>
					</Box>
				</Box>

				<Box
					as="section"
					width={'100%'}
					bg={theme.palettes.colors.white as string}
					p={'1rem'}
				>
					{/* -- TOP section -- */}
					<Box as="section" mt={'2rem'}>
						<Box
							as="article"
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Box>
								<Paragraph
									type="p1"
									color={theme.palettes.colors.black as string}
								>
									Add topics that you are willing to explore.
								</Paragraph>
							</Box>
							<Box width={'50%'}>
								<SelectBox
									variant="creatable"
									handleCreate={handleCreateOption}
									ref={selectRef}
									options={options}
									onChange={handleOnChangeOptions}
									placeholder="Search interests"
									isLoading={createLoader}
								/>
							</Box>
						</Box>
					</Box>

					<Box
						style={{
							background: theme.palettes.colors.white as string,
						}}
					>
						{(userInterests?.length as number) > 0 && (
							<Box>
								<Box
									style={{
										fontSize: '1.25rem',
										fontWeight: 700,
									}}
									mt={'1.5rem'}
									mb={'1rem'}
								>
									My Interests ({userInterests?.length})
								</Box>
								<Box style={{ marginBottom: '3rem' }}>
									<Box
										style={{
											display: 'flex',
											flexWrap: 'wrap' as const,
											gap: '0.75rem',
											marginTop: '1rem',
										}}
									>
										{userInterests?.map((item: IInterest, index: number) => (
											<Chip
												key={index}
												onClick={() => handleSelectSubCategories(item?.id)}
												showTransition
												style={{
													cursor: 'pointer',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													gap: '0.5rem',
													fontWeight: 400,
												}}
												color={theme.palettes.colors.darkBlue[0]}
												borderColor={theme.palettes.colors.lightBlue[2]}
											>
												{item.name}
												<Icons.CrossIcon />
											</Chip>
										))}
									</Box>
								</Box>
							</Box>
						)}
					</Box>

					<Box
						style={{
							color: theme.palettes.colors.black as string,
							fontSize: '1rem',
							paddingBottom: '-2.5rem',
							background: theme.palettes.colors.white as string,
						}}
					>
						Few areas you may be interested in.
					</Box>

					{/* -- Content section */}
					<OnBoardingSelectSubInterest
						sortedCategories={sortedCategories}
						handleSelectedSubCategories={handleSelectSubCategories}
						selectedSubCategories={selectedSubCategories}
						createdCategories={createdCategories}
						handleRemoveCreatableOptions={handleRemoveCreatableOptions}
					/>
				</Box>
			</Box>
		</div>
	);
}
