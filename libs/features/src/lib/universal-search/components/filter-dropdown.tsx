import {
	Box,
	ButtonDropdown,
	Chip,
	DropdownItem,
	FormElements,
	Icon,
	IconButton,
} from '@kwicon/kwicon-ui';
import { Icons } from '@kwicon/commons';
import { useTheme } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppDispatch } from '../../app-store/app-store';
import { searchAdvisors } from '../thunk-apis/search-advisors';
import { getUniversalSearchState } from '../slices/universal-search.slice';
// import { getOnboardingState } from '../../onboarding/slices/onboarding.slice';

interface FilterDropdownProps {
	limit: number;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ limit }) => {
	const theme = useTheme();
	const dispatch = useDispatch<AppDispatch>();

	const { searchedKeyword, currentPage, searchedAdvisors } = useSelector(
		getUniversalSearchState,
	);
	// const { advisors } = useSelector(getOnboardingState);

	const [location, setLocation] = useState('');

	// const [advisorInterests, setAdvisorInterests] = useState<string[]>([]);
	// const [selectedAdvisorInterest, setSelectedAdvisorInterest] = useState<
	// 	string[]
	// >([]);

	const [advisorProfessions, setAdvisorProfessions] = useState<string[]>([]);
	const [selectedAdvisorProfession, setSelectedAdvisorProfession] = useState<
		string[]
	>([]);

	// useEffect(() => {
	// 	if (searchedAdvisors && searchedAdvisors?.length > 0) {
	// 		// const interests = searchedAdvisors
	// 		// 	.map((advisor: any) => advisor?.specialization)
	// 		// 	?.filter((spec: any) => spec?.length > 0)
	// 		// 	?.flat(); // flattening array of arrays

	// 		// // filtering out the duplicate interests according to the id
	// 		// const filteredInterests = interests?.filter(
	// 		// 	(interest: any, index: number) =>
	// 		// 		interests?.findIndex((item: any) => item?.id === interest?.id) ===
	// 		// 		index,
	// 		// );

	// 		// setAdvisorInterests(filteredInterests);

	// 	}
	// }, [searchedAdvisors]);

	// useEffect(() => {
	//   if (advisors && advisors?.length > 0) {

	//   }
	// }, []);

	useEffect(() => {
		if (searchedAdvisors && searchedAdvisors?.length > 0) {
			const professions = searchedAdvisors
				?.filter((advisor: any) => advisor?.profession?.length > 0)
				?.map((advisor: any) => advisor?.profession);

			const removedDuplicate = [...new Set(professions)];

			setAdvisorProfessions(removedDuplicate as string[]);
		}
	}, [searchedAdvisors]);

	useEffect(() => {
		if (
			// selectedAdvisorInterest.length > 0 ||
			selectedAdvisorProfession.length > 0
		) {
			dispatch(
				searchAdvisors({
					keyword: searchedKeyword as string,
					page: currentPage,
					limit: limit,
					// interests: selectedAdvisorInterest,
					profession: selectedAdvisorProfession,
				}),
			);
		} else {
			dispatch(
				searchAdvisors({
					keyword: searchedKeyword as string,
					page: currentPage,
					limit: limit,
					// interests: selectedAdvisorInterest,
					// profession: selectedAdvisorProfession,
				}),
			);
		}
	}, [
		// selectedAdvisorInterest,
		searchedKeyword,
		currentPage,
		limit,
		dispatch,
		selectedAdvisorProfession,
	]);

	const handleSearchLocation = async () => {
		if (location) {
			setLocation('');
			await dispatch(
				searchAdvisors({
					keyword: searchedKeyword as string,
					page: currentPage,
					limit: limit,
					location: location.split(),
					// interests: selectedAdvisorInterest,
					profession: selectedAdvisorProfession,
				}),
			);
		} else {
			dispatch(
				searchAdvisors({
					keyword: searchedKeyword as string,
					page: currentPage,
					limit: limit,
					// interests: selectedAdvisorInterest,
					profession: selectedAdvisorProfession,
				}),
			);
		}
	};

	// const handleSelectOrDeselectAdvisorInterest = (interestId: string) => {
	// 	if (selectedAdvisorInterest.includes(interestId)) {
	// 		setSelectedAdvisorInterest(
	// 			selectedAdvisorInterest.filter(
	// 				(interest: string) => interest !== interestId,
	// 			),
	// 		);
	// 	} else {
	// 		setSelectedAdvisorInterest([...selectedAdvisorInterest, interestId]);
	// 	}
	// };

	const handleSelectOrDeselectAdvisorProfession = (profession: string) => {
		if (selectedAdvisorProfession.includes(profession)) {
			setSelectedAdvisorProfession(
				selectedAdvisorProfession.filter((prof: string) => prof !== profession),
			);
		} else {
			setSelectedAdvisorProfession([...selectedAdvisorProfession, profession]);
		}
	};

	return (
		<ButtonDropdown
			withElementOnClose={false}
			content={
				<IconButton>
					<Icon component={Icons.FilterIcon} />
				</IconButton>
			}
			dropdownWrapperStyle={{
				overflow: 'hidden',
			}}
		>
			<DropdownItem withHoverEffect={false} width="20vw">
				<Box>
					{/* FILTER BY */}
					<Box
						style={{
							fontSize: '1.25rem',
							fontWeight: 600,
						}}
					>
						Location
					</Box>
					{/* FILTERS */}

					{/* FILTER LOCATION */}
					<Box mt={'0.5rem'}>
						<FormElements.Input
							onChange={e => setLocation(e.target.value)}
							endAdornment={
								<IconButton bg="transparent" onClick={handleSearchLocation}>
									<Icon
										height="16px"
										width="16px"
										component={Icons.SearchIcon}
									/>
								</IconButton>
							}
							value={location}
							placeholder="Type town/city"
							p={'0.125rem 0.25rem'}
						/>
					</Box>

					{/* Filter Profession */}
					<Box
						mt={'1rem'}
						style={{
							fontSize: '1.25rem',
							fontWeight: 600,
						}}
					>
						Profession
					</Box>
					<Box
						mt={'0.5rem'}
						style={{
							display: 'flex',
							gap: '0.5rem',
							flexWrap: 'wrap' as const,
						}}
					>
						{advisorProfessions?.map((profession: string) => (
							<Chip
								style={{
									display: 'flex',
									gap: '0.25rem',
									alignItems: 'center',
									background: selectedAdvisorProfession.includes(profession)
										? theme.palettes.colors.lightBlue[2]
										: '',
								}}
								onClick={() =>
									handleSelectOrDeselectAdvisorProfession(profession)
								}
								cursor="pointer"
								fs={'0.75rem'}
								p={'0.25rem'}
							>
								{profession}
							</Chip>
						))}
					</Box>
					{/* Filter Interest */}
					{/* <Box
						mt={'1rem'}
						style={{
							fontSize: '1.25rem',
							fontWeight: 600,
						}}
					>
						Interests
					</Box> */}
					{/* <Box
						mt={'0.5rem'}
						style={{
							display: 'flex',
							gap: '0.5rem',
							flexWrap: 'wrap' as const,
						}}
					>
						{advisorInterests?.map((interest: any) => (
							<Chip
								style={{
									display: 'flex',
									gap: '0.25rem',
									alignItems: 'center',
									background: selectedAdvisorInterest.includes(interest?.id)
										? theme.palettes.colors.lightBlue[2]
										: '',
								}}
								onClick={() =>
									handleSelectOrDeselectAdvisorInterest(interest?.id)
								}
								cursor="pointer"
								fs={'0.75rem'}
								p={'0.25rem'}
							>
								{interest.name}
							</Chip>
						))}
					</Box> */}
				</Box>
			</DropdownItem>
		</ButtonDropdown>
	);
};
