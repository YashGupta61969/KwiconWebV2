import { Icons, getYearMonth, routePaths } from '@kwicon/commons';
import { Box, IconButton, Paragraph } from '@kwicon/kwicon-ui';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { IAchievement } from '../interfaces/user-profile-interfaces';
import styles from '../user.module.css';

interface EducationCardProps extends IAchievement {
	isAdditional: boolean;
	isEditable: boolean;
}

export function AchievementCard(props: EducationCardProps) {
	const theme = useTheme();
	return (
		<Box
			style={{
				borderBottom: `0.06rem solid ${theme.palettes.colors.primaryBg}`,
			}}
			py={'1.5rem'}
			className={styles['education__item']}
		>
			<Box>
				<Box style={{ display: 'flex', gap: '1rem' }}>
					{/* // add custom bg colour code */}
					<Box width={'38px'}>
						<IconButton
							bg={'#FFF8EB'}
							size="lg"
							style={{
								border: `0.06rem solid rgba(40, 53, 187, 0.08)`,
							}}
						>
							{<Icons.AchivementIcon />}
						</IconButton>
					</Box>
					<Box>
						<Paragraph
							type="p2"
							fs={'0.9rem'}
							color={theme.palettes.colors.black as string}
							className={styles['user-detail__title']}
						>
							{props.awardName}
						</Paragraph>
						{/* add custom text colour */}
						<Paragraph
							type="p2"
							fs={'0.9rem'}
							color={' #828282'}
							style={{ margin: 0 }}
						>
							{props.givenBy}
						</Paragraph>
						<Paragraph
							type="p2"
							fs={'0.9rem'}
							color={' #828282'}
							style={{ margin: 0 }}
						>
							{getYearMonth(props.date as string)}
						</Paragraph>
						<Box mt={'1rem'}>
							{props.isAdditional && (
								<Box
									color={' #828282'}
									style={{ margin: 0, fontSize: '0.9rem' }}
								>
									<Box
										as="span"
										style={{
											fontSize: '0.9rem',
											fontWeight: 700,
										}}
									>
										Description:{' '}
									</Box>
									{props.description}
								</Box>
							)}
						</Box>
					</Box>
				</Box>
			</Box>
			{props.isEditable && (
				<Box>
					<Link
						to={`${routePaths.user.achievement.updateAchievement}/${props.id}`}
						style={{ padding: '0.7rem' }}
					>
						{<Icons.PenIcon />}
					</Link>
				</Box>
			)}
		</Box>
	);
}
