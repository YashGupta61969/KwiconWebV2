//* Sorting the sub categories based on the selected categories
type SubCategory = {
	name: string;
	id: string;
	category: string;
};

export interface ICategory {
	category: string;
	subCategories: { name: string; id: string }[];
}

export interface IInterest {
	name: string;
	id: string;
	category: string;
	schoolId: string;
}

/**
 * @description Sort sub categories based on the selected categories. This is currently used in the onboarding page.
 *
 * @param subCategoryListArray
 * @returns  { category: string; subCategories: { name: string; id: string }[] }[]
 *
 * @example
 * const subCategories = [
 *   { name: 'Sub Category 1', id: '1', category: 'Category 1' },
 *  { name: 'Sub Category 2', id: '2', category: 'Category 1' },
 * { name: 'Sub Category 3', id: '3', category: 'Category 2' },
 * { name: 'Sub Category 4', id: '4', category: 'Category 2' },
 * { name: 'Sub Category 5', id: '5', category: 'Category 3' },
 * { name: 'Sub Category 6', id: '6', category: 'Category 3' },
 * ];
 *
 * const sortedSubCategories = sortSubCategories(subCategories);
 */
export function sortSubCategories(
	subCategoryListArray: SubCategory[],
): ICategory[] {
	const categories: { [category: string]: { name: string; id: string }[] } = {};

	for (const { category, name, id } of subCategoryListArray) {
		if (!(category in categories)) {
			categories[category] = [{ name, id }];
		} else {
			categories[category].push({ name, id });
		}
	}

	const sortedData: ICategory[] = Object.entries(categories).map(
		([category, subCategories]) => {
			return { category, subCategories };
		},
	);

	sortedData.sort((a, b) => a.category.localeCompare(b.category));

	return sortedData;
}

export default sortSubCategories;
