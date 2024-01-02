import { Icons, routePaths } from '@kwicon/commons';
import { Box, Chip, Heading, Paragraph } from '@kwicon/kwicon-ui';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import styles from '../user.module.css';

/* eslint-disable-next-line */
export interface UserExpertiseProps {
	expertise:
		| {
				id: string;
				name: string;
				category: string;
		  }[]
		| null
		| undefined;
	isEditable?: boolean;
	showMessage?: boolean;
}

export function UserExpertise(props: UserExpertiseProps) {
	const [isReadMore, setIsReadMore] = useState<boolean>(true);

	const theme = useTheme();

	return (
		<Box bg={theme.palettes.colors.white as string} p={'1rem'} mt={'1rem'}>
			<Box style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Box>
					<Heading
						fs={'1rem'}
						fw={'700'}
						className={styles['user-detail__title']}
					>
						{props.expertise && props.expertise.length} Expertise
					</Heading>
					{props.showMessage && (
						<Paragraph
							type="p2"
							fs={'0.8rem'}
							className={styles['user-detail__title']}
						>
							Add topics you can give advice on
						</Paragraph>
					)}
				</Box>
				{props.isEditable && (
					<Link to={routePaths.user.expertise}>
						<Icons.PenIcon />
					</Link>
				)}
			</Box>

			{props.expertise && props.expertise.length > 0 && (
				<>
					<Box
						onClick={() => setIsReadMore(!isReadMore)}
						style={{
							display: 'flex',
							flexWrap: 'wrap' as const,
							gap: '0.2rem',
						}}
						cursor="pointer"
						mt={'1rem'}
					>
						{props.expertise
							?.slice(0, isReadMore ? 20 : props.expertise.length)
							.map(
								(
									item: { id: string; name: string; category: string },
									index: number,
								) => (
									<Chip
										key={index}
										borderColor={theme.palettes.colors.white as string}
										color={theme.palettes.colors.darkBlue[0]}
										fs={'0.7rem'}
									>
										{item.name}
									</Chip>
								),
							)}
					</Box>
					{props.expertise && props.expertise.length > 20 && (
						<Paragraph
							ta="right"
							fs={'0.8rem'}
							fw={'700'}
							color={theme.palettes.colors.darkBlue[0]}
						>
							{isReadMore
								? `+ ${props.expertise && props.expertise?.length - 20} more`
								: 'Show less'}
						</Paragraph>
					)}
				</>
			)}
		</Box>
	);
}
