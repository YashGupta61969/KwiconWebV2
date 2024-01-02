import { Icons, getYearMonth, routePaths } from '@kwicon/commons';
import { Box, IconButton, Paragraph } from '@kwicon/kwicon-ui';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { ICertificate } from '../interfaces/user-profile-interfaces';
import styles from '../user.module.css';

interface CertificateCardProps extends ICertificate {
	isAdditional: boolean;
	isEditable: boolean;
}

export function CertificateCard(props: CertificateCardProps) {
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
							{<Icons.CertificateIcon />}
						</IconButton>
					</Box>
					<Box>
						<Paragraph
							type="p2"
							fs={'0.9rem'}
							color={theme.palettes.colors.black as string}
							className={styles['user-detail__title']}
						>
							{props.title}
						</Paragraph>
						{/* add custom text colour */}
						<Paragraph
							type="p2"
							fs={'0.9rem'}
							color={' #828282'}
							style={{ margin: 0 }}
						>
							{props.conductedBy}, {props.location}
						</Paragraph>
						<Paragraph
							type="p2"
							fs={'0.9rem'}
							color={' #828282'}
							style={{ margin: 0 }}
						>
							{getYearMonth(props.startDate as string)} -{' '}
							{getYearMonth(props.endDate as string)}
						</Paragraph>

						{props.isAdditional && (
							<>
								<Paragraph
									type="p2"
									fs={'0.9rem'}
									color={' #828282'}
									style={{ margin: 0 }}
								>
									{props.description}
								</Paragraph>
								<Box>
									{(props.skillSet?.length as number) > 0 && (
										<>
											<Paragraph
												fs={'0.9rem'}
												fw={'700'}
												style={{ margin: '0', marginTop: '0.2rem' }}
												color="#4F4F4F"
											>
												Skills acquired:
											</Paragraph>
											<Box style={{ display: 'flex', flexWrap: 'wrap' }}>
												{props.skillSet?.map((skill: any, index: number) => (
													<Paragraph key={index} fs={'0.9rem'} color="#828282">
														{skill.name}
														{index !==
														(props?.skillSet?.length as number) - 1 ? (
															<span>,&nbsp;</span>
														) : (
															'.'
														)}
													</Paragraph>
												))}
											</Box>
										</>
									)}
								</Box>
							</>
						)}
					</Box>
				</Box>
			</Box>
			{props.isEditable && (
				<Box>
					<Link
						to={`${routePaths.user.certificate.editCertificate}/${props.id}`}
						style={{ padding: '0.7rem' }}
					>
						{<Icons.PenIcon />}
					</Link>
				</Box>
			)}
		</Box>
	);
}
