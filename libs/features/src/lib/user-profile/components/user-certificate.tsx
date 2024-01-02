import { Icons, routePaths } from '@kwicon/commons';
import { Box, Heading, Paragraph } from '@kwicon/kwicon-ui';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { ICertificate } from '../interfaces/user-profile-interfaces';
import styles from '../user.module.css';
import { CertificateCard } from './certificate-card';

/* eslint-disable-next-line */

export interface UserCertificateProps {
	programs: ICertificate[] | null | undefined;
	isEditable?: boolean;
	showMessage?: boolean;
}

export function UserCertificate(props: UserCertificateProps) {
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
						Certifications
					</Heading>
					{props.showMessage && (
						<Paragraph
							type="p2"
							fs={'0.8rem'}
							className={styles['user-detail__title']}
						>
							Mention any certifications or seminars you attended
						</Paragraph>
					)}
				</Box>
				{props.isEditable && (
					<Link
						to={routePaths.user.certificate.addCertificate}
						style={{ padding: '0.8rem' }}
					>
						<Icons.PlusIcon />
					</Link>
				)}
			</Box>

			{props.programs && props.programs.length > 0 && (
				<>
					<Box>
						{[...(props.programs as ICertificate[])]
							.reverse()
							.slice(0, 3)
							.map((certificate: ICertificate, index: number) => (
								<CertificateCard
									key={index}
									id={certificate.id}
									title={certificate.title}
									conductedBy={certificate.conductedBy}
									location={certificate.location}
									description={certificate.description}
									startDate={certificate.startDate}
									endDate={certificate.endDate}
									isAdditional={false}
									isEditable={props.isEditable}
								/>
							))}
					</Box>
					{props.programs.length > 3 && (
						<Box py={'1rem'}>
							<Link
								to={
									props.isEditable
										? routePaths.user.certificate.root
										: routePaths.user.publicProfile.certificates
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
								See all {props.programs.slice(4, props.programs.length).length}{' '}
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
