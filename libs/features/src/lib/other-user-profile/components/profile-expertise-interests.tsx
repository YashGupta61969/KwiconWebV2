import { Box, Chip, Paper } from '@kwicon/kwicon-ui';

export interface ProfileExpertiseInterestsProps {
	advisor: any;
	title: string;
}

export const ProfileExpertiseInterests: React.FC<
	ProfileExpertiseInterestsProps
> = ({ advisor, title }) => {
	return (
		<Paper bg="white">
			<Box
				style={{
					fontSize: '1rem',
					fontWeight: 'bold',
				}}
			>
				{advisor?.specialization?.length} {title}
			</Box>
			<Box
				mt={'1rem'}
				style={{
					display: 'flex',
					flexWrap: 'wrap' as const,
					gap: '0.5rem',
				}}
			>
				{advisor?.specialization?.map((item: any, index: number) => (
					<Chip
						key={index}
						fs={'0.75rem'}
						style={{
							padding: '4px 8px',
						}}
					>
						{item?.name}
					</Chip>
				))}
			</Box>
		</Paper>
	);
};
