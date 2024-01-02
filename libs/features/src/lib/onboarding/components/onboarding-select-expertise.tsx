import { ICategory, Icons } from '@kwicon/commons';
import { SelectBox } from '@kwicon/components';
import { Box, Chip, Heading, Paragraph } from '@kwicon/kwicon-ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import styles from '../onboarding.module.css';
import {
	getOnboardingState,
	onboardingActions,
} from '../slices/onboarding.slice';
import { addCategory } from '../thunk-apis/add-category';
import { getOnboardingCategories } from '../thunk-apis/get-onboarding-categories';
import { getSubCategoriesByCategories } from '../thunk-apis/get-subcategories-by-categories';
import { thunkString } from '../thunk-apis/thunk-string';
import { OnboardingExpertiseMessageBox } from './onboarding-expertise-messagebox';

export function OnboardingSelectExpertise() {
	const dispatch = useDispatch<AppDispatch>();
	const theme = useTheme();
	const selectRef = useRef(null);

	//* REDUX STATES
	const { onboardingCategories, subCategoryList, user, onboardingUserData } =
		useSelector(getOnboardingState);

	//* LOCAL STATES
	const [options, setOptions] = useState<
		{
			value: string;
			label: string;
			category: string;
		}[]
	>([]);
	const [createLoader, setCreateLoader] = useState<boolean>(false);
	const [createdCategories, setCreatedCategories] = useState<
		{
			value: string;
			label: string;
		}[]
	>([]);
	const [selectedSubCategories, setSelectedSubCategories] = useState<
		ICategory[] | undefined
	>([]);

	//* EFFECTS
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
			const optionForSelectBox = subCategoryList.map((item: any) => ({
				value: item.id,
				label: item.name,
				category: item.category,
			}));

			setOptions(optionForSelectBox);
		}
	}, [subCategoryList, setOptions]);

	useEffect(() => {
		if (selectedSubCategories && selectedSubCategories?.length > 0) {
			const selected = selectedSubCategories.map((item: any) => {
				return item.value;
			});
			dispatch(onboardingActions.setOnboardingExpertise(selected));
		}
	}, [selectedSubCategories, dispatch]);

	useEffect(() => {
		if (user !== undefined && user?.specialization?.length > 0) {
			const uniqueSubCategories = user.specialization
				?.map((item: any) => item?.id)
				.filter(
					(value: string, index: number, self: any) =>
						self.indexOf(value) === index,
				);
			// @ts-ignore
			setSelectedSubCategories(
				options?.filter(item => uniqueSubCategories?.includes(item.value)),
			);
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
			const isOptionAlreadySelected = prev?.find(
				(item: any) => item.value === option.value,
			);

			if (isOptionAlreadySelected) {
				return prev?.filter((item: any) => item.value !== option.value);
			}

			return [...(prev as ICategory[]), option];
		});

		// if the expertise already exists on redux store then remove it from the store
		const isOptionAlreadySelected = onboardingUserData?.expertise?.includes(
			option.value,
		);
		if (isOptionAlreadySelected) {
			const newExpertise = onboardingUserData?.expertise?.filter(
				(item: any) => item !== option.value,
			);
			dispatch(onboardingActions.setOnboardingExpertise(newExpertise));
		}

		if (option) {
			// clear the input value
			option.target.value = '';
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

	// remove selected options from the selectedSubCategories array
	const handleRemoveSelectedOptions = (value: string) => {
		setSelectedSubCategories(prev => {
			if (prev !== undefined) {
				const newCategories = prev.filter((item: any) => item.value !== value);
				return newCategories;
			}
			return [];
		});

		// remove the expertise from the redux store
		const newExpertise = onboardingUserData?.expertise?.filter(
			(item: any) => item !== value,
		);
		dispatch(onboardingActions.setOnboardingExpertise(newExpertise));
	};

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
								Expertise!
							</span>
						</Heading>
						<Paragraph type="p1" lh={1}>
							What do you want to talk about?
						</Paragraph>
					</Box>
					<Box width={'30%'}>
						<SelectBox
							variant="creatable"
							handleCreate={handleCreateOption}
							ref={selectRef}
							options={options}
							onChange={handleOnChangeOptions}
							placeholder="Search topics"
							isLoading={createLoader}
						/>
					</Box>
				</Box>
			</Box>
			{/* CONTENT */}
			<Box
				as="section"
				width={'100%'}
				mt={'0.5rem'}
				className={styles['onboarding-container__content']}
			>
				{createdCategories?.length === 0 &&
				selectedSubCategories?.length === 0 ? (
					<OnboardingExpertiseMessageBox />
				) : (
					<Box
						my={'2rem'}
						style={{
							display: 'flex',
							flexWrap: 'wrap' as const,
							gap: '0.75rem',
							marginTop: '1rem',
						}}
					>
						{createdCategories?.map((item: any, index: number) => (
							<Chip
								onClick={() => handleRemoveCreatableOptions(item?.value)}
								showTransition
								style={{
									cursor: 'pointer',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									gap: '0.5rem',
									fontWeight: 600,
								}}
								key={index}
								color={theme.palettes.colors.primary as string}
								borderColor={theme.palettes.colors.secondary as string}
							>
								{item?.label}
								<Icons.CrossIcon />
							</Chip>
						))}

						{/* SORTED ONES */}
						{selectedSubCategories
							?.filter((item: any) => item.label !== undefined)
							?.map((item: any, index: number) => (
								<Chip
									onClick={() => handleRemoveSelectedOptions(item?.value)}
									showTransition
									style={{
										cursor: 'pointer',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										gap: '0.5rem',
										fontWeight: 600,
									}}
									key={index}
									color={theme.palettes.colors.primary as string}
									borderColor={theme.palettes.colors.secondary as string}
								>
									{item.label}
									<Icons.CrossIcon />
								</Chip>
							))}
					</Box>
				)}
			</Box>
		</Box>
	);
}
