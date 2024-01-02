import { Paper, Box, IconButton, Chip } from '@kwicon/kwicon-ui';
import { MediaImage } from '@kwicon/components';
import { Icons, useExternalNavigate } from '@kwicon/commons';
import { useTheme } from 'styled-components';
import { useState } from 'react';

export interface ProfileCardProps {
	mediaId: string;
	advisor: any;
	showLinkedin?: boolean;
	showConnections?: boolean;
	showExpertise?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
	mediaId,
	advisor,
	showLinkedin = true,
	showConnections = true,
	showExpertise = false,
}) => {
	const exnavigate = useExternalNavigate();
	const theme = useTheme();

	const [showMoreSpecialization, setShowMoreSpecialization] = useState(false);

	return (
		<Paper
			bg="white"
			style={{
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<Box
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '0.75rem',
				}}
			>
				<Box>
					<MediaImage
						mediaId={mediaId}
						avatarProps={{
							type: 'image',
							size: 'medium',
						}}
					/>
				</Box>
				<Box>
					<Box
						style={{
							fontSize: '1rem',
							fontWeight: 'bold',
						}}
					>
						{advisor?.name}
					</Box>
					<Box
						color={'#4F4F4F'}
						style={{
							fontSize: '0.875rem',
							textTransform: 'capitalize' as const,
							fontWeight: '400',
						}}
					>
						{`${advisor?.role} | ${advisor?.profession}`}
					</Box>
					{showConnections && (
						<Box
							mt={'0.5rem'}
							color={'#4F4F4F'}
							style={{
								fontSize: '0.875rem',
								textTransform: 'capitalize' as const,
								fontWeight: '400',
							}}
						>
							{`${
								advisor?.connections?.seeker?.length ??
								0 + advisor?.connections?.advisor?.length
							} connections`}
						</Box>
					)}
					{showExpertise && (
						<Box
							mt={'0.75rem'}
							style={{
								display: 'flex',
								flexWrap: 'wrap' as const,
								gap: '0.5rem',
							}}
						>
							{advisor?.specialization?.length > 5 ? (
								<Box
									style={{
										display: 'flex',
										flexWrap: 'wrap' as const,
										gap: '0.5rem',
									}}
								>
									{advisor?.specialization
										?.slice(
											0,
											showMoreSpecialization
												? advisor?.specialization.length
												: 5,
										)
										?.map((item: any, index: number) => (
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
									{advisor.specialization.length > 5 && (
										<span
											onClick={() =>
												setShowMoreSpecialization(!showMoreSpecialization)
											}
											style={{
												marginTop: '0.25rem',
												fontSize: '0.8rem',
												fontWeight: 700,
												color: theme.palettes.colors.primary,
												cursor: 'pointer',
											}}
										>
											{showMoreSpecialization
												? 'Show less'
												: `+${advisor.specialization.length - 5} more`}
										</span>
									)}
								</Box>
							) : (
								// eslint-disable-next-line react/jsx-no-useless-fragment
								<>
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
								</>
							)}
						</Box>
					)}
				</Box>
			</Box>
			{showLinkedin && (
				<Box>
					<IconButton
						style={{
							padding: '0',
							backgroundColor: 'transparent',
						}}
						onClick={() => exnavigate(advisor?.linkedInURL)}
					>
						<Icons.LinkedInIcon />
					</IconButton>
				</Box>
			)}
		</Paper>
	);
};
