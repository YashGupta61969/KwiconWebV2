import { Icons, routePaths } from '@kwicon/commons';
import { Box, Chip, Heading, Paragraph } from '@kwicon/kwicon-ui';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import styles from '../user.module.css';

/* eslint-disable-next-line */
export interface UserInterestProps {
	interests:
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

export function UserInterest(props: UserInterestProps) {
	const [isReadMore, setIsReadMore] = useState<boolean>(true);
	const theme = useTheme();

	return (
		<Box
			bg={theme.palettes.colors.white as string}
			p={'0.5rem 1rem'}
			mt={'1rem'}
		>
			<Box style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Box>
					<Heading
						fs={'1rem'}
						fw={'700'}
						className={styles['user-detail__title']}
					>
						{props.interests && props.interests.length > 0
							? props.interests.length
							: 0}{' '}
						Interests
					</Heading>
					{props.showMessage && (
						<Paragraph
							type="p2"
							fs={'0.8rem'}
							className={styles['user-detail__title']}
						>
							Add topics you are passionate or interested to learn
						</Paragraph>
					)}
				</Box>
				{props.isEditable && (
					<Link to={routePaths.user.interests}>
						<Icons.PenIcon />
					</Link>
				)}
			</Box>

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
				{props.interests &&
					props.interests
						?.slice(0, isReadMore ? 20 : props.interests.length)
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
			{props.interests && props.interests.length > 20 && (
				<Paragraph
					ta="right"
					fs={'0.8rem'}
					fw={'700'}
					color={theme.palettes.colors.darkBlue[0]}
				>
					{isReadMore
						? `+ ${props.interests && props.interests?.length - 20} more`
						: 'Show less'}
				</Paragraph>
			)}
		</Box>
	);
}
