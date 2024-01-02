import { Icons, getYearMonth, routePaths } from '@kwicon/commons';
import { Box, IconButton, Paragraph } from '@kwicon/kwicon-ui';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { IExperience } from '../interfaces/user-profile-interfaces';
import styles from '../user.module.css';

interface ExperienceCardProps extends IExperience {
	isAdditional: boolean;
	isEditable: boolean;
}

export function ExperienceCard(props: ExperienceCardProps) {
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
							bg={'#F0F1FF'}
							size="lg"
							style={{
								border: `0.06rem solid rgba(40, 53, 187, 0.08)`,
							}}
						>
							{<Icons.ExperienceIcon />}
						</IconButton>
					</Box>
					<Box>
						<Paragraph
							type="p2"
							fs={'0.9rem'}
							color={theme.palettes.colors.black as string}
							className={styles['user-detail__title']}
						>
							{props.role}
						</Paragraph>
						{/* add custom text colour */}
						<Paragraph
							type="p2"
							fs={'0.9rem'}
							color={' #828282'}
							style={{ margin: 0 }}
						>
							{props.organization}, {props.location}
						</Paragraph>
						<Paragraph
							type="p2"
							fs={'0.9rem'}
							color={' #828282'}
							style={{ margin: 0 }}
						>
							{getYearMonth(props.startDate as string)} -{' '}
							{props.isCurrentlyWorking
								? 'Present'
								: getYearMonth(props.endDate as string)}
						</Paragraph>

						{props.isAdditional && (
							<Box mt={'1rem'}>
								<Paragraph
									type="p2"
									fs={'0.9rem'}
									color={' #828282'}
									style={{ margin: 0 }}
								>
									<Box
										as="span"
										style={{
											fontWeight: 700,
										}}
									>
										Description:
									</Box>{' '}
									{props.description}
								</Paragraph>
								<Box>
									{(props.skillSet?.length as number) > 0 && (
										<Box
											mt={'1rem'}
											style={{
												fontSize: '0.9rem',
												fontWeight: 700,
											}}
										>
											<Box
												style={{
													margin: '0',
													marginTop: '0.2rem',
												}}
												color="#4F4F4F"
											>
												Skills acquired:
											</Box>
											<Box
												style={{ display: 'flex', flexWrap: 'wrap' }}
												mt={'0.5rem'}
											>
												{props.skillSet?.map((skill: any, index: number) => (
													<Box key={index} color="#828282">
														{skill.name}
														{index !==
														(props?.skillSet?.length as number) - 1 ? (
															<span>,&nbsp;</span>
														) : (
															'.'
														)}
													</Box>
												))}
											</Box>
										</Box>
									)}
								</Box>
							</Box>
						)}
					</Box>
				</Box>
			</Box>
			{props.isEditable && (
				<Box>
					<Link
						to={`${routePaths.user.experiences.updateExperience}/${props.id}`}
					>
						{<Icons.PenIcon />}
					</Link>
				</Box>
			)}
		</Box>
	);
}
