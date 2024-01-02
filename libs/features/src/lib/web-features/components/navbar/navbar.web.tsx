import {
	Icons,
	Images,
	envKeys,
	routePaths,
	useExternalNavigate,
	useMediaQuery,
} from '@kwicon/commons';
import { Box, Button, Container, Divider } from '@kwicon/kwicon-ui';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Drawer from '../side-drawer/side-drawer';
import styles from './navbar.module.css';

export const Navbar: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { pathname } = location;

	const smallScreen = useMediaQuery('(max-width: 768px)');
	const exnavigate = useExternalNavigate();

	const [showMobileNav, setShowMobileNav] = useState<boolean>(false);

	return (
		<Container width={'100%'}>
			<Box
				className={smallScreen ? styles['wrapper-small'] : styles['wrapper']}
			>
				{/* -- Logo -- */}
				<Box
					onClick={() => navigate(routePaths.webRoutes.root.home)}
					style={{
						cursor: 'pointer',
					}}
				>
					<img
						height={'100%'}
						width={'145px'}
						src={Images.KwiconLogoType}
						alt="Kwicon"
					/>
				</Box>
				{/* -- Nav Items -- */}
				{!smallScreen ? (
					<>
						<Box
							style={{
								//* Nav items styles
								width: '100%',
								height: '100%',
							}}
						>
							{/* --HOME-- */}
							<Box
								style={{
									//* Navbox styles
									width: '100%',
									height: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									gap: '2.5rem',
								}}
							>
								<Link
									to={routePaths.webRoutes.root.home}
									className={
										pathname === routePaths.webRoutes.root.home
											? styles['active-styles']
											: styles['inactive-styles']
									}
									style={{
										fontSize: '1.25rem',
									}}
								>
									Home{' '}
									<div className={styles['active-bar-wrapper']}>
										{pathname === routePaths.webRoutes.root.home && (
											<div className={styles['active-bar']}>&nbsp;</div>
										)}
									</div>
								</Link>
								<Link
									to={routePaths.webRoutes.root.team}
									className={
										pathname === routePaths.webRoutes.root.team
											? styles['active-styles']
											: styles['inactive-styles']
									}
									style={{
										fontSize: '1.25rem',
									}}
								>
									Team
									<div className={styles['active-bar-wrapper']}>
										{pathname === routePaths.webRoutes.root.team && (
											<div className={styles['active-bar']}>&nbsp;</div>
										)}
									</div>
								</Link>
								<Link
									to={routePaths.webRoutes.root.about}
									className={
										pathname === routePaths.webRoutes.root.about
											? styles['active-styles']
											: styles['inactive-styles']
									}
									style={{
										fontSize: '1.25rem',
									}}
								>
									About{' '}
									<div className={styles['active-bar-wrapper']}>
										{pathname === routePaths.webRoutes.root.about && (
											<div className={styles['active-bar']}>&nbsp;</div>
										)}
									</div>
								</Link>
								<Link
									to={routePaths.webRoutes.root.contact}
									className={
										pathname === routePaths.webRoutes.root.contact
											? styles['active-styles']
											: styles['inactive-styles']
									}
									style={{
										fontSize: '1.25rem',
									}}
								>
									Contact{' '}
									<div className={styles['active-bar-wrapper']}>
										{pathname === routePaths.webRoutes.root.contact && (
											<div className={styles['active-bar']}>&nbsp;</div>
										)}
									</div>
								</Link>
							</Box>
							{/* --Login & Join Us-- */}
						</Box>
						<Box
							style={{
								// * Login and join us
								width: '100%',
								height: '100%',
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'center',
								gap: '1.5rem',
							}}
						>
							<Button
								variant="unstyled"
								style={{
									borderRadius: '2.5rem',
									border: '2px solid #000',
									padding: '0.5rem 2.5rem',
									color: '#000',
								}}
								onClick={() => exnavigate(envKeys.APP_URL as string)}
							>
								Login
							</Button>
							<Button
								variant="unstyled"
								style={{
									borderRadius: '2.5rem',
									backgroundColor: '#000',
									padding: '0.5rem 2.5rem',
									border: '2px solid #000',
									color: '#fff',
								}}
								onClick={() => exnavigate(envKeys.APP_URL as string)}
							>
								Join Us
							</Button>
						</Box>
					</>
				) : (
					<>
						<Button
							onClick={() => setShowMobileNav(!showMobileNav)}
							variant="unstyled"
						>
							<Icons.ListIcon />
						</Button>
						<Drawer
							isOpen={showMobileNav}
							withButton={false}
							// onClose={() => setShowMobileNav(!showMobileNav)}
							direction="left"
						>
							<Container>
								{/* HEAD */}
								<Box
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<img src={Images.KwiconLogoType} alt="Kwicon" width={'40%'} />
									<Button
										onClick={() => setShowMobileNav(!showMobileNav)}
										variant="tertiary"
										style={{
											padding: '0.5rem',
										}}
									>
										<IoClose />
									</Button>
								</Box>
								<Divider
									style={{
										marginTop: '0.75rem',
									}}
									height="1px"
									orientation="horizontal"
									width="100%"
								/>
								{/* NAV ITEMS */}
								<Box
									style={{
										//* Nav items styles
										width: '100%',
										height: '100%',
										marginTop: '1.5rem',
									}}
								>
									{/* --HOME-- */}
									<Box
										style={{
											//* Navbox styles
											width: '100%',
											height: '100%',
											display: 'flex',
											justifyContent: 'flex-start',
											flexDirection: 'column' as const,
											gap: '1.5rem',
										}}
									>
										<Link
											onClick={() => setShowMobileNav(!showMobileNav)}
											to={routePaths.webRoutes.root.home}
											style={{
												fontSize: '1.25rem',
											}}
										>
											Home{' '}
										</Link>
										<Link
											onClick={() => setShowMobileNav(!showMobileNav)}
											to={routePaths.webRoutes.root.team}
											style={{
												fontSize: '1.25rem',
											}}
										>
											Team
										</Link>
										<Link
											onClick={() => setShowMobileNav(!showMobileNav)}
											to={routePaths.webRoutes.root.about}
											style={{
												fontSize: '1.25rem',
											}}
										>
											About{' '}
										</Link>
										<Link
											onClick={() => setShowMobileNav(!showMobileNav)}
											to={routePaths.webRoutes.root.contact}
											style={{
												fontSize: '1.25rem',
											}}
										>
											Contact{' '}
										</Link>
									</Box>
								</Box>
								{/* LOGIN JOIN US */}
								<Box
									style={{
										// * Login and join us
										marginTop: '1.5rem',
										width: '100%',
										height: '100%',
										display: 'flex',
										justifyContent: 'flex-start',
										// flexDirection: 'column' as const,
										alignItems: 'center',
										gap: '1rem',
									}}
								>
									<Button
										variant="unstyled"
										size="small"
										width="100%"
										style={{
											borderRadius: '2.5rem',
											border: '1px solid #000',
											color: '#000',
										}}
									>
										Login
									</Button>
									<Button
										variant="unstyled"
										size="small"
										style={{
											borderRadius: '2.5rem',
											backgroundColor: '#000',
											width: '100%',
											border: '1px solid #000',
											color: '#fff',
										}}
									>
										Join Us
									</Button>
								</Box>
							</Container>
						</Drawer>
					</>
				)}
			</Box>
		</Container>
	);
};
