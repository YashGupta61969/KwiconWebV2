import { ICategory, sortSubCategories } from '@kwicon/commons';
import { SelectBox } from '@kwicon/components';
import { Box, Heading, Paragraph } from '@kwicon/kwicon-ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import {
	getOnboardingState,
	onboardingActions,
} from '../slices/onboarding.slice';
import { addCategory } from '../thunk-apis/add-category';
import { getOnboardingCategories } from '../thunk-apis/get-onboarding-categories';
import { getSubCategoriesByCategories } from '../thunk-apis/get-subcategories-by-categories';
import { thunkString } from '../thunk-apis/thunk-string';
import OnBoardingSelectSubInterest from './onboarding-select-sub-interest';

export interface OnBoardingSelectInterestProps {
	handlePreviousStep?: () => void;
	handleNextStep?: () => void;
}

export function OnBoardingSelectInterest() {
	const dispatch = useDispatch<AppDispatch>();
	//* Redux store
	const { onboardingCategories, subCategoryList, user, onboardingUserData } =
		useSelector(getOnboardingState);

	const theme = useTheme();
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
		if (user !== undefined && user?.interests?.length > 0) {
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

			// set the selected subcategories to the redux store
			dispatch(onboardingActions.setSelectSubCategoryIds(uniqueSubCategories));
		}
	}, [user]);

	useEffect(() => {
		if (selectedSubCategories && selectedSubCategories?.length > 0) {
			dispatch(onboardingActions.setOnboardingInterests(selectedSubCategories));
		}
	}, [selectedSubCategories, dispatch]);

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

	//? We are not using these below functions for now
	// handle selected categories
	// const handleSelectedCategories = useCallback((category: string) => {
	// 	// adding selected property to the category
	// 	setSelectedCategories(prev => {
	// 		if (prev !== undefined) {
	// 			const isCategorySelected = prev.includes(category);

	// 			if (isCategorySelected) {
	// 				const newCategories = prev.filter(item => item !== category);

	// 				return newCategories;
	// 			} else {
	// 				return [...prev, category];
	// 			}
	// 		}

	// 		return [];
	// 	});
	// }, []);

	// const handleAddCategories = useCallback(async () => {
	// 	if (selectedCategories !== undefined) {
	// 		dispatch(
	// 			onboardingActions.setSelectOnboardingCategories(selectedCategories),
	// 		);
	// 		try {
	// 			const response = await dispatch(
	// 				getSubCategoriesByCategories(selectedCategories),
	// 			);
	// 			if (
	// 				response.type ===
	// 				`${thunkString.getSubCategoriesByCategories}/fulfilled`
	// 			) {
	// 				setShowSubInterests(true);
	// 			}
	// 		} catch (error) {
	// 			throw new Error(error as string);
	// 		}
	// 	}
	// }, [dispatch, selectedCategories, setShowSubInterests]);

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

	// const handlePrevious = () => {
	// 	if (showSubInterests) {
	// 		setShowSubInterests(false);
	// 	} else {
	// 		handlePreviousStep();
	// 	}
	// };

	// const handleNext = () => {
	// 	if (selectedSubCategories?.length === 0) {
	// 		handleNextStep();
	// 	} else {
	// 		handleAddSubCategories();
	// 	}
	// };

	return (
		<Box as="section" width={'100%'}>
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
						<Heading type="h2" lh={0.5}>
							Choose your{' '}
							<span
								style={{
									color: theme.palettes.colors.primary as string,
									fontWeight: 700,
								}}
							>
								Interests!
							</span>
						</Heading>
						<Paragraph type="p1" lh={1}>
							Let&apos;s narrow down to what makes you curious
						</Paragraph>
					</Box>
					<Box width={'30%'}>
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
			{/* -- Content section */}
			<OnBoardingSelectSubInterest
				sortedCategories={sortedCategories}
				handleSelectedSubCategories={handleSelectSubCategories}
				selectedSubCategories={selectedSubCategories}
				createdCategories={createdCategories}
				handleRemoveCreatableOptions={handleRemoveCreatableOptions}
			/>
			{/* Footer */}
			{/* <Box
				boxShadow={theme.shadows.regular}
				className={styles['onboarding-container__footer']}
			>
				<Container
					py={'1.5rem'}
					style={{
						justifyContent: 'space-between',
					}}
					className={styles['onboarding-container__footer-inner']}
				>
					<Button
						style={{
							borderRadius: '2.5rem',
						}}
						onClick={handlePrevious}
						width={'20%'}
						variant="tertiary"
					>
						Previous
					</Button>
					<Button
						onClick={handleNext}
						width={'20%'}
						variant="primary"
						loading={loadingStatus === 'loading' ? true : false}
					>
						Next
					</Button>
				</Container>
			</Box> */}
		</Box>
	);
}

//? we don't need this function anymore
// color generator
// const generateColor = (index: number) => {
// 	const colors = [
// 		'#FFDBDB',
// 		'#FFE8D2',
// 		'#FDFECE',
// 		'#E5FFF0',
// 		'#DFF5FF',
// 		'#FAE5FF',
// 		'#E9DFFF',
// 	];

// 	const color = colors[index % colors.length];

// 	return color;
// };

export default OnBoardingSelectInterest;
