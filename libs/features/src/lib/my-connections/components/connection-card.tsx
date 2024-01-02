import { useTheme } from 'styled-components';
import { MediaImage } from '@kwicon/components';
import {
	Box,
	Button,
	ButtonDropdown,
	Chip,
	DropdownItem,
	Heading,
	Icon,
	IconButton,
	Paper,
	Paragraph,
} from '@kwicon/kwicon-ui';
import { Icons, routePaths } from '@kwicon/commons';
import { useNavigate } from 'react-router-dom';
import { unfollowUser } from '../../user-profile/thunk-apis/unfollow-user';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app-store/app-store';
import { getUser } from '../../onboarding/thunk-apis/get-user';
import { getConnections } from '../../user-profile/thunk-apis/get-connections';
import { toast } from 'react-toastify';
import { thunkString } from '../../user-profile/thunk-apis/thunk-string';
import { createThread } from '../../azure-commmunication/thunk-apis/azure';

export interface ConnectionCardProps {
	connection: any;
	fetchConnection: () => void;
}

export const ConnectionCard: React.FC<ConnectionCardProps> = ({
	connection: advisor,
	fetchConnection,
}) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector(state => state.user)
	const [showMoreSpecialization, setShowMoreSpecialization] = useState(false);

	useEffect(() => {
		// get all connection requests
		handleGetUser();
	}, []);

	const handleGetUser = async () => {
		try {
			await dispatch(getUser());
			dispatch(
				getConnections({
					type: 'advisor',
					limit: 100,
				}),
			);
			dispatch(
				getConnections({
					type: 'seeker',
					limit: 100,
				}),
			);
		} catch (error) {
			throw new Error(error as string);
		}
	};

	const handleUnfollowUser = async (id: string, name: string) => {
		try {
			const response = await dispatch(
				unfollowUser({
					userId: id,
				}),
			);
			if (response.type === `${thunkString.unfollowUser}/fulfilled`) {
				handleGetUser();
				fetchConnection();
				toast.success(`${name} unfollowed successfully!`);
			}
		} catch (error) {
			throw new Error(error as string);
		} finally {
			handleGetUser();
			fetchConnection();
		}
	};

	const handleChatClick = async (advisorId:string) => {
		await dispatch(createThread([advisorId, user.id]))
		navigate(routePaths.chat.root);
	}

	return (
		<Box
			key={advisor?.id}
			bg={theme.palettes.colors.white as string}
			p={'1rem 1rem'}
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'start',
				marginTop: '1rem',
			}}
		>
			<Box
				style={{
					display: 'flex',
					flexDirection: 'row',
					gap: '16px',
					width: '80%',
				}}
			>
				<Box>
					<MediaImage
						mediaId={advisor?.profilePicture}
						avatarProps={{
							type: 'image',
							text: advisor?.name,
							size: 'medium',
							textAvatarStyle: {
								height: '74px',
								width: '74px',
								fontSize: '1.5rem',
							},
						}}
					/>
				</Box>
				<Box
					style={{
						display: 'flex',
						flexDirection: 'column' as const,
					}}
				>
					<Heading fs={'0.9rem'} fw={'700'} style={{ margin: 0 }}>
						{advisor?.name}
					</Heading>
					<Paragraph type="p2" fs={'0.9rem'} style={{ margin: 0 }}>
						{advisor?.profession}{' '}
						{advisor?.profession && advisor?.addressId?.city && '|'}{' '}
						{advisor?.addressId?.city}
					</Paragraph>
					{advisor?.specialization && (
						<Box
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								alignItems: 'center',
								gap: '0.6rem',
								marginTop: '1rem',
							}}
						>
							{advisor?.specialization
								?.slice(
									0,
									showMoreSpecialization ? advisor?.specialization.length : 5,
								)
								.map((spec: any, index: number) => (
									<Chip
										key={index}
										fs={'12px'}
										style={{
											padding: '2px 4px',
										}}
									>
										{spec?.name}
									</Chip>
								))}

							{advisor.specialization.length > 5 && (
								<span
									onClick={() =>
										setShowMoreSpecialization(!showMoreSpecialization)
									}
									style={{
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
					)}
				</Box>
			</Box>
			<Box style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
				<Button
					mt={'1rem'}
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '0.5rem',
						backgroundColor: '#7581FF',
						color: '#fff',
						fontSize: '1rem',
					}}
					onClick={() => {
						handleChatClick(advisor?.id)
						// handleChatClick(
						// 	advisor?.quickbloxUserId,
						// 	advisor?.id,
						// 	advisor?.profilePicture,
						// 	advisor?.profession,
						// )
					}
					}
				>
					<Icons.ChatIcon />
					<Box>Chat</Box>
				</Button>

				<ButtonDropdown
					style={{
						marginTop: '1.3rem',
					}}
					dropdownWrapperStyle={{
						overflow: 'hidden',
						width: '10rem',
					}}
					content={
						<IconButton bg={theme.palettes.colors.lightGray[0] as string}>
							<Icons.ThreeDotsIcon />
						</IconButton>
					}
				>
					<DropdownItem
						style={{
							display: 'flex',
							gap: '0.5rem',
						}}
						onClick={() =>
							navigate(`/profile/${advisor?.name}`, {
								state: {
									advisor,
								},
							})
						}
					>
						<IconButton>
							<Icons.OpenEyeIcon />
						</IconButton>
						<Box
							color={theme.palettes.colors.darkBlue[0]}
							style={{
								fontSize: '0.8rem',
								fontWeight: '700',
							}}
						>
							View Profile
						</Box>
					</DropdownItem>
					<DropdownItem
						style={{
							display: 'flex',
							gap: '0.5rem',
						}}
						onClick={() => handleUnfollowUser(advisor?.id, advisor?.name)}
					>
						<IconButton>
							<Icon
								component={Icons.DismissCircle}
								color={theme.palettes.colors.primary as string}
							/>
						</IconButton>
						<Box
							color={theme.palettes.colors.darkBlue[0]}
							style={{
								fontSize: '0.8rem',
								fontWeight: '700',
							}}
						>
							Unfollow
						</Box>
					</DropdownItem>
					<DropdownItem
						style={{
							display: 'flex',
							gap: '0.5rem',
						}}
					>
						<IconButton>
							<Icons.ErrorCircleIcon />
						</IconButton>
						<Box
							color={theme.palettes.error[1]}
							style={{
								fontSize: '0.8rem',
								fontWeight: '700',
							}}
						>
							Report User
						</Box>
					</DropdownItem>
				</ButtonDropdown>
			</Box>
		</Box>
	);
};
