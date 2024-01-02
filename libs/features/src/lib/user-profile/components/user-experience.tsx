import { Icons, routePaths } from '@kwicon/commons';
import { Box, Heading, Paragraph } from '@kwicon/kwicon-ui';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { IExperience } from '../interfaces/user-profile-interfaces';
import styles from '../user.module.css';
import { ExperienceCard } from './experience-card';

export interface UserExperienceProps {
	experience: IExperience[] | null | undefined;
	isEditable?: boolean;
	showMessage?: boolean;
}

export function UserExperience(props: UserExperienceProps) {
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
						Experience
					</Heading>
					{props.showMessage && (
						<Paragraph
							type="p2"
							fs={'0.8rem'}
							className={styles['user-detail__title']}
						>
							Add your academic journey
						</Paragraph>
					)}
				</Box>
				{props.isEditable && (
					<Link to={routePaths.user.experiences.addExperience}>
						<Icons.PlusIcon />
					</Link>
				)}
			</Box>

			{props.experience && props.experience.length > 0 && (
				<>
					<Box>
						{[...(props.experience as IExperience[])]
							.reverse()
							.slice(0, 4)
							.map((exp: IExperience, index: number) => (
								<ExperienceCard
									key={index}
									id={exp.id}
									description={exp.description}
									role={exp.role}
									location={exp.location}
									organization={exp.organization}
									isCurrentlyWorking={exp.isCurrentlyWorking}
									startDate={exp.startDate}
									endDate={exp.endDate}
									skillSet={exp.skillSet}
									isAdditional={false}
									isEditable={props.isEditable}
								/>
							))}
					</Box>
					{props.experience.length > 4 && (
						<Box py={'1rem'}>
							<Link
								to={
									props.isEditable
										? routePaths.user.experiences.root
										: routePaths.user.publicProfile.experience
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
								{props.experience.slice(4, props.experience.length).length}{' '}
								Experiences
								<Icons.RightArrowIcon />
							</Link>
						</Box>
					)}
				</>
			)}
		</Box>
	);
}
