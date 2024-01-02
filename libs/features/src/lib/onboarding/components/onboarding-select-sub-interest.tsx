import { Box, Chip } from '@kwicon/kwicon-ui';
import { Icons } from '@kwicon/commons';
import { useTheme } from 'styled-components';
import styles from '../onboarding.module.css';
import { ICategory } from '@kwicon/commons';

export interface OnBoardingSelectSubInterestProps {
	sortedCategories: ICategory[] | undefined | null;
	handleSelectedSubCategories: (subCategory: string) => void;
	selectedSubCategories: string[] | undefined;
	createdCategories:
		| { value: string; label: string; category?: string }[]
		| undefined;
	handleRemoveCreatableOptions: (value: string) => void;
}

export const OnBoardingSelectSubInterest = ({
	sortedCategories,
	handleSelectedSubCategories,
	selectedSubCategories,
	createdCategories,
	handleRemoveCreatableOptions,
}: OnBoardingSelectSubInterestProps) => {
	const theme = useTheme();

	return (
		<Box
			as="section"
			width={'100%'}
			mt={'0.5rem'}
			className={styles['onboarding-container__content']}
		>
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
							fontWeight: selectedSubCategories?.includes(item?.value)
								? 600
								: 400,
						}}
						key={index}
						color={theme.palettes.colors.primary as string}
						borderColor={theme.palettes.colors.secondary as string}
					>
						{item?.label}
						<Icons.CrossIcon />
					</Chip>
				))}
			</Box>

			{sortedCategories
				?.filter(item => item?.category !== 'custom category')
				?.map((item: any, index) => (
					<Box key={index}>
						<Box
							style={{
								fontSize: '1.25rem',
								fontWeight: 700,
							}}
							mt={'1.5rem'}
							mb={'1rem'}
						>
							{item?.category}
						</Box>
						<Box
							style={{
								display: 'flex',
								flexWrap: 'wrap' as const,
								gap: '0.75rem',
								marginTop: '1rem',
							}}
						>
							{item.subCategories?.map((subItem: any, index: number) => (
								<Chip
									onClick={() => handleSelectedSubCategories(subItem?.id)}
									showTransition
									style={{
										cursor: 'pointer',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										gap: '0.5rem',
										fontWeight: selectedSubCategories?.includes(subItem?.id)
											? 600
											: 400,
									}}
									key={index}
									color={
										selectedSubCategories?.includes(subItem?.id)
											? (theme.palettes.colors.primary as string)
											: theme.palettes.colors.darkBlue[0]
									}
									borderColor={
										selectedSubCategories?.includes(subItem?.id)
											? (theme.palettes.colors.secondary as string)
											: theme.palettes.colors.lightBlue[2]
									}
								>
									{subItem?.name}
									{selectedSubCategories?.includes(subItem?.id) && (
										<Icons.CrossIcon />
									)}
								</Chip>
							))}
						</Box>
					</Box>
				))}
		</Box>
	);
};

export default OnBoardingSelectSubInterest;
