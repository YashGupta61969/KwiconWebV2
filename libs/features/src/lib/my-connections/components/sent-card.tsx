import { MediaImage } from '@kwicon/components';
import { Box, Button, Chip, Icon, Paper } from '@kwicon/kwicon-ui';
import { useTheme } from 'styled-components';
import { Icons } from '@kwicon/commons';

export interface SentCardProps {
	awaiting: any;
	handleWithdraw: (id: string, connectId: string) => void;
}

export const SentCard: React.FC<SentCardProps> = ({
	awaiting,
	handleWithdraw,
}) => {
	const theme = useTheme();

	return (
		<Paper bg="white">
			{awaiting?.to?.isActive ? (
				<>
					<Box
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'flex-start',
						}}
					>
						<Box
							style={{
								display: 'flex',
								gap: '1.5rem',
								alignItems: 'center',
							}}
						>
							<MediaImage
								mediaId={awaiting?.to?.profilePicture}
								avatarProps={{
									type: 'image',
									size: 'medium',
									text: awaiting?.to?.name,
								}}
							/>
							<Box>
								<Box
									style={{
										fontSize: '1rem',
										fontWeight: 'bold',
									}}
								>
									{awaiting?.to?.name}
								</Box>
								<Box
									mt={'0.5rem'}
									style={{
										textTransform: 'capitalize' as const,
										color: '#4F4F4F',
									}}
								>
									{awaiting?.to?.role}
								</Box>
							</Box>
						</Box>
						{/* BUTTONS */}
						<Box>
							<Box
								style={{
									display: 'flex',
									gap: '1rem',
								}}
							>
								<Button
									variant="secondary"
									size="medium"
									onClick={() => handleWithdraw(awaiting?.to?.id, awaiting?.id)}
								>
									Withdraw
								</Button>
							</Box>
						</Box>
					</Box>

					<Box
						mt={'0.75rem'}
						style={{
							display: 'flex',
							flexWrap: 'wrap' as const,
							gap: '0.5rem',
						}}
					>
						{awaiting?.interests?.length > 5 ? (
							<Box
								mt={'0.5rem'}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '0.5rem',
								}}
							>
								{awaiting?.interests
									?.slice(0, 5)
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
								<Box
									style={{
										fontSize: '0.75rem',
										fontWeight: 'bold',
									}}
									color={theme.palettes.colors.darkBlue[0]}
								>{`+ ${awaiting?.interests?.length - 5} more`}</Box>
							</Box>
						) : (
							// eslint-disable-next-line react/jsx-no-useless-fragment
							<>
								{awaiting?.interests.map((item: any, index: number) => (
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
				</>
			) : (
				<Box>
					<Box
						style={{
							display: 'flex',
							gap: '0.75rem',
							alignItems: 'center',
						}}
					>
						<Box
							width={'3rem'}
							height={'3rem'}
							bg="rgba(240, 241, 255, 0.5)"
							borderRadius="50%"
							border="1px solid rgba(40, 53, 187, 0.15)"
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Icon
								component={Icons.BlockedIcon}
								color="rgba(40, 53, 187, 0.15)"
								height="1.25rem"
								width="1.25rem"
							/>
						</Box>
						<Box>
							<Box
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '0.5rem',
								}}
							>
								<Box
									style={{
										fontWeight: 600,
										color: 'rgba(70, 75, 128, 0.6)',
									}}
								>
									Deactivated User
								</Box>
							</Box>
							<Box
								mt={'0.3125rem'}
								style={{
									color: '#828282',
									fontSize: '12px',
								}}
							>
								This user is no longer on Kwicon. The invite will be removed in
								3 days automatically
							</Box>
						</Box>
					</Box>
				</Box>
			)}
		</Paper>
	);
};
