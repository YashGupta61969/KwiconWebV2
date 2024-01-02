import { Icons } from '@kwicon/commons';
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
	Paragraph,
} from '@kwicon/kwicon-ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';

export interface SearchedUserProps {
	advisor: any;
	acceptedRequestsId: any;
	handleChatClick: any;
	handleUnfollowUser: any;
}

const SearchedUser = ({
	advisor,
	acceptedRequestsId,
	handleChatClick,
	handleUnfollowUser,
}: SearchedUserProps) => {
	// Local State
	const [showMoreSpecialization, setShowMoreSpecialization] = useState(false);
	const toggleShowMoreSpecialization = () =>
		setShowMoreSpecialization(!showMoreSpecialization);

	// hooks
	const theme = useTheme();
	const navigate = useNavigate();

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
					width: '80%',
					gap: '1rem',
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
					{advisor.specialization && (
						<Box
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								alignItems: 'center',
								gap: '0.6rem',
								marginTop: '1rem',
							}}
						>
							{advisor.specialization
								.slice(
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
								// <Paragraph
								// 	fs={'0.8rem'}
								// 	fw={'700'}
								// 	color={theme.palettes.colors.darkBlue[0]}
								// >
								// 	+{advisor.specialization.length - 5} more
								// </Paragraph>
								<span
									onClick={toggleShowMoreSpecialization}
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
				{!acceptedRequestsId.includes(advisor?.id) ? (
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
						onClick={() =>
							navigate(`/profile/${advisor?.name}`, {
								state: {
									advisor,
								},
							})
						}
					>
						<Icon color="#fff" component={Icons.OpenEyeIcon} width="1rem" />
						<Box>View Profile</Box>
					</Button>
				) : (
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
						onClick={() =>
							handleChatClick(
								advisor?.quickbloxUserId,
								advisor?.id,
								advisor?.profilePicture,
								advisor?.profession,
							)
						}
					>
						<Icons.ChatIcon />
						<Box>Chat</Box>
					</Button>
				)}

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
					{acceptedRequestsId.includes(advisor?.id) && (
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
					)}
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

export default SearchedUser;
