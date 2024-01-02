import { Icons, routePaths, useGetMedia, useLogout } from '@kwicon/commons';
import {
	Avatar,
	Box,
	Button,
	ButtonDropdown,
	DropdownItem,
	Heading,
	Modal,
	Paragraph,
} from '@kwicon/kwicon-ui';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { AppDispatch } from '../../app-store/app-store';
import { getUser } from '../../onboarding/thunk-apis/get-user';
import { getUserState } from '../slices/user.slice';

export function ProfileAvatar() {
	const theme = useTheme();

	const { logOut: handleLogout } = useLogout();

	// Local State
	const [isLogoutShow, setIsLogoutShow] = useState<boolean>(false);

	// redux store
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector(getUserState);
	const { name, role } = user || {}; // destructure user object

	//* Getting the user
	useEffect(() => {
		handleGetUser();
	}, []);

	// get media hook
	const { media, mediaLoader } = useGetMedia(user?.profilePicture as string);

	// get user function
	const handleGetUser = async () => {
		try {
			await dispatch(getUser());
		} catch (error) {
			throw new Error(error as string);
		}
	};

	/*
    Handlers
  */
	const toggoleModal = () => {
		setIsLogoutShow(!isLogoutShow);
	};

	// // logout handler
	// const handleLogout = () => {
	// 	cookies.deleteAll();
	// 	logout({
	// 		clientId: envKeys.AUTH0_CLIENT_ID,
	// 		logoutParams: {
	// 			returnTo: window.location.origin,
	// 		},
	// 	});
	// 	navigate(routePaths.auth.login);
	// };

	return (
		<Box>
			<ButtonDropdown
				cursor="pointer"
				dropdownWrapperStyle={{
					overflow: 'hidden',
					width: '14rem',
					maxHeight: '17rem',
					marginTop: '0.7rem',
					gap: '0rem',
				}}
				content={
					<Box
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '1rem',
							// margin: 0,
						}}
					>
						<Box m={'0'}>
							<Avatar
								loading={mediaLoader}
								size={'small'}
								type={media ? 'image' : 'text'}
								src={media && media}
								text={name ? name : ''}
							/>
						</Box>
						<Box>
							<Paragraph style={{ margin: '0' }} fs={'0.8rem'} fw={'700'}>
								{name}
							</Paragraph>
							<Paragraph
								style={{ margin: '0' }}
								fs={'0.8rem'}
								color={'#828282'}
							>
								{role}
							</Paragraph>
						</Box>
					</Box>
				}
			>
				<DropdownItem style={{ padding: '0 0.5rem', margin: 0 }}>
					<Link to={routePaths.user.root} style={{ width: '100%' }}>
						<Box style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
							<Icons.ProfileIcon />
							<Paragraph fs={'1rem'} color={theme.palettes.colors.darkBlue[0]}>
								My Profile
							</Paragraph>
						</Box>
					</Link>
				</DropdownItem>
				<DropdownItem style={{ padding: '0 0.5rem' }}>
					<Link to={routePaths.posts.myPosts} style={{ width: '100%' }}>
						<Box style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
							<Icons.PostIcon />
							<Paragraph fs={'1rem'} color={theme.palettes.colors.darkBlue[0]}>
								My Posts
							</Paragraph>
						</Box>
					</Link>
				</DropdownItem>
				<DropdownItem style={{ padding: '0 0.5rem' }}>
					<Link to={routePaths.settings.root} style={{ width: '100%' }}>
						<Box style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
							<Icons.GearIcon />
							<Paragraph fs={'1rem'} color={theme.palettes.colors.darkBlue[0]}>
								Settings
							</Paragraph>
						</Box>
					</Link>
				</DropdownItem>
				<DropdownItem style={{ padding: '0 0.5rem' }}>
					<Box
						onClick={toggoleModal}
						style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
					>
						<Icons.LogoutIcon />
						<Paragraph fs={'1rem'} color={theme.palettes.colors.darkBlue[0]}>
							Logout
						</Paragraph>
					</Box>
				</DropdownItem>
			</ButtonDropdown>

			{/* Logout Modal */}
			<Modal
				isOpen={isLogoutShow}
				toggleModal={toggoleModal}
				overlayColor="rgba(0, 0, 0, 0.25)"
			>
				<Heading fs={'1.125rem'} fw={'700'}>
					Logging Out?
				</Heading>
				<Paragraph fs={'0.875rem'} color="#101010">
					Are you sure you want to log out?
				</Paragraph>
				<Box style={{ display: 'flex', gap: '0.5rem' }}>
					<Button
						onClick={toggoleModal}
						variant="tertiary"
						style={{
							padding: '0.5rem 1rem',
							color: theme.palettes.colors.primary as string,
						}}
					>
						No, not now!
					</Button>
					<Button
						onClick={handleLogout}
						variant="tertiary"
						style={{
							padding: '0.5rem 1rem',
							color: theme.palettes.colors.primary as string,
						}}
					>
						Yes, Logout
					</Button>
				</Box>
			</Modal>
		</Box>
	);
}
