import { Icons, routePaths } from '@kwicon/commons';
import { Box, Heading, Paragraph } from '@kwicon/kwicon-ui';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { IEducation } from '../interfaces/user-profile-interfaces';
import styles from '../user.module.css';
import { EducationCard } from './education-card';

/* eslint-disable-next-line */

export interface UserEducationProps {
	educations: IEducation[] | null | undefined;
	isEditable?: boolean;
	showMessage?: boolean;
}

export function UserEducation(props: UserEducationProps) {
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
						Education
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
					<Link
						to={routePaths.user.education.addEducation}
						style={{ padding: '0.8rem' }}
					>
						<Icons.PlusIcon />
					</Link>
				)}
			</Box>

			{props.educations && props.educations.length > 0 && (
				<>
					<Box>
						{[...(props.educations as IEducation[])]
							.reverse()
							.slice(0, 4)
							.map((edu: IEducation, index: number) => (
								<EducationCard
									key={index}
									id={edu.id}
									degree={edu.degree}
									school={edu.school}
									location={edu.location}
									fieldOfStudy={edu.fieldOfStudy}
									description={edu.description}
									startDate={edu.startDate}
									endDate={edu.endDate}
									skillSet={edu.skillSet}
									isCurrentlyStudying={edu.isCurrentlyStudying}
									isAdditional={false}
									isEditable={props.isEditable}
								/>
							))}
					</Box>
					{props.educations.length > 4 && (
						<Box py={'1rem'}>
							<Link
								to={
									props.isEditable
										? routePaths.user.education.root
										: routePaths.user.publicProfile.educations
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
								{props.educations.slice(4, props.educations.length).length}{' '}
								Qualifications
								<Icons.RightArrowIcon />
							</Link>
						</Box>
					)}
				</>
			)}
		</Box>
	);
}
