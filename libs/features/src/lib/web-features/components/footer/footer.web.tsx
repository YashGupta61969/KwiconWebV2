import { Box, Button, Container, Grid, GridItem } from '@kwicon/kwicon-ui';
import { Icons, Images, routePaths, useMediaQuery } from '@kwicon/commons';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
	const smallScreen = useMediaQuery('(max-width: 768px)');

	return (
		<Box
			style={{
				position: 'relative' as const,
				height: !smallScreen ? '35vh' : '60vh',
				display: 'flex',
				// justifyContent: 'center',
				alignItems: 'center',
				width: '100vw',
				backgroundImage: `url(${Images.FooterFrame})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			{/* Footer Content */}
			<Box width={'100%'}>
				<Container>
					<Grid columns={!smallScreen ? 3 : 1} width={'100%'}>
						{/* LEFT PANE */}
						<GridItem>
							<Box width={'225px'}>
								<img width={'100%'} src={Images.KwiconLogoType} alt="Kwicon" />
								{/* SOCIAL LINKS */}
								{!smallScreen && (
									<Box
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}
										mx={'0.2rem'}
									>
										<a
											href="https://www.linkedin.com/in/kwicon-edutech-647673269/"
											target="_blank"
											rel="noreferrer noopener"
										>
											<Button
												//* LinkedIN
												variant="unstyled"
												style={{
													padding: 0,
												}}
											>
												<Icons.LinkedInWeb />
											</Button>
										</a>
										<a
											href="https://twitter.com/Kwicon_EduTech"
											target="_blank"
											rel="noreferrer noopener"
										>
											<Button
												//* Twitter
												variant="unstyled"
												style={{
													padding: 0,
												}}
											>
												<Icons.TwitterWeb />
											</Button>
										</a>
										<a
											href="https://www.youtube.com/@kwiconedutech"
											target="_blank"
											rel="noreferrer noopener"
										>
											<Button
												//* YT
												variant="unstyled"
												style={{
													padding: 0,
												}}
											>
												<Icons.YtWeb />
											</Button>
										</a>
										<a
											href="https://www.facebook.com/profile.php?id=100090607077466"
											target="_blank"
											rel="noreferrer noopener"
										>
											<Button
												//* Facebook
												variant="unstyled"
												style={{
													padding: 0,
												}}
											>
												<Icons.FbWeb />
											</Button>
										</a>
										<a
											href="https://www.instagram.com/kwicon.edutech/"
											target="_blank"
											rel="noreferrer noopener"
										>
											<Button
												//* Instagram
												variant="unstyled"
												style={{
													padding: 0,
												}}
											>
												<Icons.InstaWeb />
											</Button>
										</a>
									</Box>
								)}
							</Box>
						</GridItem>
						<GridItem
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							{/* MIDDLE PANE */}
							<Box
								style={{
									display: 'flex',
									flexDirection: 'column' as const,
									gap: '1rem',
									color: 'rgba(0, 0, 0)',
								}}
							>
								<Link to={routePaths.webRoutes.root.home}>Home</Link>
								<Link to={routePaths.webRoutes.root.about}>About</Link>
								<Link to={routePaths.webRoutes.root.advisory}>Advisory</Link>
								<Link to={routePaths.webRoutes.root.contact}>Contact Us</Link>
							</Box>
							<Box
								style={{
									display: 'flex',
									flexDirection: 'column' as const,
									gap: '1rem',
									color: 'rgba(0, 0, 0)',
								}}
							>
								<Link to={routePaths.webRoutes.root.privacyPolicy}>
									Privacy Policy
								</Link>
								<Link to={routePaths.webRoutes.root.termsOfUse}>
									Terms of Use
								</Link>
								<Link to={routePaths.webRoutes.root.pricing}>Pricing</Link>
							</Box>
						</GridItem>
						{/* RIGHT PANE */}
						<GridItem>
							{!smallScreen ? (
								<>
									<Box
										mt={'2rem'}
										style={{
											display: 'flex',
											justifyContent: 'flex-end',
										}}
									>
										<img
											width={'35%'}
											height={'35%'}
											src={Images.AppleDownloadSvg}
											alt="download on Apple"
										/>
									</Box>
									<Box
										style={{
											display: 'flex',
											justifyContent: 'flex-end',
											marginRight: '-0.9rem',
										}}
									>
										<img
											width={'40%'}
											height={'35%'}
											src={Images.GoogleDownloadSvg}
											alt="download on Apple"
										/>
									</Box>
								</>
							) : (
								<Box
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										marginTop: '2rem',
									}}
								>
									<img
										width={'35%'}
										height={'35%'}
										src={Images.AppleDownloadSvg}
										alt="download on Apple"
									/>

									<img
										width={'40%'}
										height={'35%'}
										src={Images.GoogleDownloadSvg}
										alt="download on Apple"
									/>
								</Box>
							)}
						</GridItem>
					</Grid>
					{smallScreen && (
						<Box
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								gap: '1.5rem',
							}}
							mt={'2rem'}
						>
							<a
								href="https://www.linkedin.com/in/kwicon-edutech-647673269/"
								target="_blank"
								rel="noreferrer noopener"
							>
								<Button
									//* LinkedIN
									variant="unstyled"
									style={{
										padding: 0,
									}}
								>
									<Icons.LinkedInWeb />
								</Button>
							</a>
							<a
								href="https://twitter.com/Kwicon_EduTech"
								target="_blank"
								rel="noreferrer noopener"
							>
								<Button
									//* Twitter
									variant="unstyled"
									style={{
										padding: 0,
									}}
								>
									<Icons.TwitterWeb />
								</Button>
							</a>
							<a
								href="https://www.youtube.com/@kwiconedutech"
								target="_blank"
								rel="noreferrer noopener"
							>
								<Button
									//* YT
									variant="unstyled"
									style={{
										padding: 0,
									}}
								>
									<Icons.YtWeb />
								</Button>
							</a>
							<a
								href="https://www.facebook.com/profile.php?id=100090607077466"
								target="_blank"
								rel="noreferrer noopener"
							>
								<Button
									//* Facebook
									variant="unstyled"
									style={{
										padding: 0,
									}}
								>
									<Icons.FbWeb />
								</Button>
							</a>
							<a
								href="https://www.instagram.com/kwicon.edutech/"
								target="_blank"
								rel="noreferrer noopener"
							>
								<Button
									//* Instagram
									variant="unstyled"
									style={{
										padding: 0,
									}}
								>
									<Icons.InstaWeb />
								</Button>
							</a>
						</Box>
					)}
				</Container>
			</Box>
			{/* COPYRIGHT */}
			<Box
				style={{
					position: 'absolute' as const,
					bottom: 0,
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					color: 'rgba(0, 0, 0, 0.6)',
					fontSize: '0.75rem',
					background: 'rgba(0, 0, 0, 0.05)',
				}}
				py={'0.5rem'}
			>
				&copy; Kwicon Solutions Pvt.Ltd. {new Date().getFullYear()}
			</Box>
		</Box>
	);
};
