import {
	Paper,
	Box,
	Button,
	Icon,
	Chip,
	Modal,
	FormElements,
} from '@kwicon/kwicon-ui';
import { MediaImage } from '@kwicon/components';
import { Icons } from '@kwicon/commons';
import { useTheme } from 'styled-components';
import { BsCheck2 } from 'react-icons/bs';
import { formatDistance } from 'date-fns';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styles from '../my-connections.module.css';

export interface ReceivedCardProps {
	awaiting: any;
	handleAcceptConnectionRequest: (
		id: string,
		type: string,
		fromUserId: string,
		data?: any,
	) => void;
}

export const ReceivedCard: React.FC<ReceivedCardProps> = ({
	awaiting,
	handleAcceptConnectionRequest,
}) => {
	const theme = useTheme();
	const [showModal, setShowModal] = useState(false);

	const {
		formState: { errors: error },
		handleSubmit,
		control,
	} = useForm({
		defaultValues: {
			reason: '',
		},
	});

	const handleOnSubmit = (data: any) => {
		handleAcceptConnectionRequest(
			awaiting?.id,
			'reject',
			awaiting?.from?.id,
			data,
		);
		setShowModal(false);
	};

	return (
		<Paper bg="white">
			{awaiting?.from?.isActive ? (
				<>
					{/* TOP */}
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
								mediaId={awaiting?.from?.profilePicture}
								avatarProps={{
									type: 'image',
									size: 'medium',
									text: awaiting?.from?.name,
								}}
							/>
							<Box>
								<Box
									style={{
										fontSize: '1rem',
										fontWeight: 'bold',
									}}
								>
									{awaiting?.from?.name}
								</Box>
								<Box
									mt={'0.5rem'}
									style={{
										textTransform: 'capitalize' as const,
										color: '#4F4F4F',
									}}
								>
									{awaiting?.from?.role}
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
									style={{
										borderRadius: '0.5rem',
										color: theme.palettes.colors.darkBlue[0],
										padding: '0.2rem 1.2rem',
										background: '#F9F9F9',
										gap: '0.5rem',
									}}
									size="medium"
									onClick={() => setShowModal(true)}
								>
									<Box
										style={{
											marginTop: '0.2rem',
										}}
									>
										<Icon
											component={Icons.CrossIcon}
											height="1rem"
											width="1rem"
											color={theme.palettes.error[1]}
										/>
									</Box>
									<Box>Ignore</Box>
								</Button>
								<Button
									variant="secondary"
									style={{
										borderRadius: '0.5rem',
										background: '#5CD568',
										gap: '0.5rem',
										color: 'white',
										padding: '0.2rem 1rem',
									}}
									size="medium"
									onClick={() =>
										handleAcceptConnectionRequest(
											awaiting?.id,
											'accept',
											awaiting?.from?.id,
										)
									}
								>
									<Box mt={'0.5rem'}>
										<BsCheck2 fontSize={24} color="white" />
									</Box>
									<Box>Connect</Box>
								</Button>
							</Box>
							<Box
								mt={'0.5rem'}
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
									fontSize: '0.75rem',
									color: '#4F4F4F',
								}}
							>
								<Box>
									Received{' '}
									{formatDistance(new Date(awaiting?.createdAt), new Date(), {
										addSuffix: true,
									})}
								</Box>
							</Box>
						</Box>
					</Box>

					{/* EAGER TO LEARN ABOUT */}
					<Box mt={'1rem'}>
						<Box
							style={{
								fontSize: '0.875rem',
							}}
						>
							Eager to learn about:
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
					</Box>

					{/* ABOUT */}
					<Box color="#828282" mt={'1rem'}>
						{awaiting?.query}
					</Box>

					{/* MODAL */}
					<Modal
						isOpen={showModal}
						modalContentStyle={{
							width: '50%',
							borderRadius: '0.5rem',
							padding: '1.5rem 2rem',
						}}
					>
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
									mediaId={awaiting?.from?.profilePicture}
									avatarProps={{
										type: 'image',
										size: 'medium',
										text: awaiting?.from?.name,
									}}
								/>
								<Box>
									<Box
										style={{
											fontSize: '1rem',
											fontWeight: 'bold',
										}}
									>
										{awaiting?.from?.name}
									</Box>
									<Box
										mt={'0.5rem'}
										style={{
											textTransform: 'capitalize' as const,
											color: '#4F4F4F',
										}}
									>
										{awaiting?.from?.role}
									</Box>
								</Box>
							</Box>
							<Box
								mt={'0.5rem'}
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
									fontSize: '0.75rem',
									color: '#4F4F4F',
								}}
							>
								<Box>
									Received{' '}
									{formatDistance(new Date(awaiting?.createdAt), new Date(), {
										addSuffix: true,
									})}
								</Box>
							</Box>
						</Box>

						{/* EAGER TO LEARN ABOUT */}
						<Box mt={'1rem'}>
							<Box
								style={{
									fontSize: '0.875rem',
								}}
							>
								Eager to learn about:
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
						</Box>

						{/* ABOUT */}
						<Box color="#828282" mt={'1rem'}>
							{awaiting?.query}
						</Box>

						{/* REASON FORM */}
						<Box
							id="decline-form"
							mt={'1rem'}
							as="form"
							onSubmit={handleSubmit(handleOnSubmit)}
						>
							<Box
								mt={'1rem'}
								style={{
									display: 'flex',
									flexDirection: 'column' as const,
									gap: '0.5rem',
								}}
							>
								<Box
									style={{
										display: 'flex',
										justifyContent: 'space-between',
									}}
								>
									<FormElements.Label withAsterisk>Reason</FormElements.Label>{' '}
									{/* Error Box */}
									{error.reason?.message ? (
										<Box
											style={{
												fontSize: '0.875rem',
											}}
											color={theme.palettes.error[1]}
										>
											{error.reason?.message}
										</Box>
									) : null}
								</Box>
								<Controller
									name="reason"
									control={control}
									render={({ field: { name, onChange, value, onBlur } }) => (
										<Box
											bg={
												error.reason?.message
													? theme.palettes.error[2]
													: theme.palettes.colors.lightGray[0]
											}
											borderRadius={theme.borderRadius.regular}
											p={'0.75rem'}
										>
											<textarea
												className={styles.textarea}
												value={value}
												onChange={onChange}
												onBlur={onBlur}
												name={name}
												placeholder="Tell us why do you wish to not connect."
												rows={10}
											/>
										</Box>
									)}
									rules={{
										required: 'Reason is required',
									}}
								/>
							</Box>

							{/* SUBMIT BUTTON */}
							<Box
								mt={'1rem'}
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<Box
									style={{
										fontSize: '0.75rem',
										color: '#4F4F4F',
									}}
								>
									Once declined, {awaiting?.from?.name} cannot send you a
									request for the next 7 days.
								</Box>
								<Box
									style={{
										display: 'flex',
										gap: '1rem',
									}}
								>
									<Button
										variant="secondary"
										style={{
											color: theme.palettes.colors.darkBlue[0],
											padding: '0.5rem 1rem',
										}}
										size="medium"
										onClick={() => setShowModal(false)}
									>
										Cancel
									</Button>
									<Button
										form="decline-form"
										type={'submit'}
										variant="primary"
										size="medium"
										style={{
											padding: '0.5rem 1rem',
										}}
									>
										Decline Invitation
									</Button>
								</Box>
							</Box>
						</Box>
					</Modal>
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
