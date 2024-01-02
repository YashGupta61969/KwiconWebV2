import { Icons, routePaths } from '@kwicon/commons';
import { Box, Heading, Paragraph } from '@kwicon/kwicon-ui';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { IAchievement } from '../interfaces/user-profile-interfaces';
import styles from '../user.module.css';
import { AchievementCard } from './achievement-card';

/* eslint-disable-next-line */

export interface UserAchievementProps {
	recognitions: IAchievement[] | null | undefined;
	isEditable?: boolean;
	showMessage?: boolean;
}

export function UserAchievement(props: UserAchievementProps) {
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
						Achievements
					</Heading>
					{props.showMessage && (
						<Paragraph
							type="p2"
							fs={'0.8rem'}
							className={styles['user-detail__title']}
						>
							Add your personal and professional achievements
						</Paragraph>
					)}
				</Box>
				{props.isEditable && (
					<Link
						to={routePaths.user.achievement.addAchievement}
						style={{ padding: '0.8rem' }}
					>
						<Icons.PlusIcon />
					</Link>
				)}
			</Box>

			{props.recognitions && props.recognitions.length > 0 && (
				<>
					<Box>
						{[...(props.recognitions as IAchievement[])]
							.reverse()
							.slice(0, 3)
							.map((achiev: IAchievement, index: number) => (
								<AchievementCard
									key={index}
									id={achiev.id}
									awardName={achiev.awardName}
									givenBy={achiev.givenBy}
									date={achiev.date}
									description={achiev.description}
									isAdditional={false}
									isEditable={props.isEditable}
								/>
							))}
					</Box>

					{props.recognitions && props.recognitions.length > 3 && (
						<Box py={'1rem'}>
							<Link
								to={
									props.isEditable
										? routePaths.user.achievement.root
										: routePaths.user.publicProfile.achievements
								}
								style={{
									color: theme.palettes.colors.primary as string,
									fontWeight: 700,
									display: 'flex',
									alignItems: 'center',
									gap: '0.5rem',
									marginLeft: '3.8rem',
								}}
							>
								See all{' '}
								{props.recognitions.slice(4, props.recognitions.length).length}{' '}
								Achievements
								<Icons.RightArrowIcon />
							</Link>
						</Box>
					)}
				</>
			)}
		</Box>
	);
}
