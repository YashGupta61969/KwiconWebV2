import { Box, Button, Container } from '@kwicon/kwicon-ui';
import {
	Images,
	envKeys,
	useExternalNavigate,
	useMediaQuery,
} from '@kwicon/commons';

export function Home() {
	const smallScreen = useMediaQuery('(max-width: 768px)');
	const exnavigate = useExternalNavigate();

	return (
		<Container
			position="relative"
			style={{
				height: '100vh',
				width: '100%',
			}}
		>
			{/* -- BLOB RIGHT */}
			<Box
				style={{
					opacity: 0.5,
					position: 'absolute' as const,
					right: 0,
					marginTop: !smallScreen ? '4rem' : '',
				}}
			>
				<img
					width={'90%'}
					height={'100%'}
					src={Images.BiscuitBlogSvg}
					alt="blog right"
				/>
			</Box>
			{/* --SCHOOL GIRL SVG */}
			{!smallScreen && (
				<Box
					style={{
						position: 'absolute' as const,
						left: '5%',
						top: '11%',
					}}
				>
					<img
						width={'90%'}
						height={'100%'}
						src={Images.SchoolGirlSvg}
						alt="blog right"
					/>
				</Box>
			)}
			{/* --BLOB LEFT__ */}
			<Box
				style={{
					opacity: 0.7,
					position: 'absolute' as const,
					left: 0,
					top: !smallScreen ? '35%' : '28%',
				}}
			>
				<img
					width={'90%'}
					height={'100%'}
					src={Images.GrapeBlobSvg}
					alt="blog left"
				/>
			</Box>
			{/* --SCHOOL BOYS SVG__ */}
			<Box
				style={{
					position: 'absolute' as const,
					left: '5%',
					top: !smallScreen ? '45%' : '55%',
					zIndex: 1,
				}}
			>
				<img
					width={!smallScreen ? '100%' : '40%'}
					height={!smallScreen ? '100%' : '40%'}
					src={Images.SchoolBoysSvg}
					alt="School Boys"
				/>
			</Box>
			{/* --BLOB MIDDLE-- */}
			<Box
				style={{
					opacity: 0.5,
					position: 'absolute' as const,
					left: !smallScreen ? '9%' : '5%',
					top: !smallScreen ? '72%' : '65%',
				}}
			>
				<img
					width={!smallScreen ? '100%' : '25%'}
					height={!smallScreen ? '100%' : '25%'}
					src={Images.CyanBlobSvg}
					alt="blog middle"
				/>
			</Box>
			{/* --GRADUATE STUDENT SVG-- */}
			{!smallScreen ? (
				<Box
					style={{
						position: 'absolute' as const,
						right: '7%',
						top: '50%',
						// marginRight: !smallScreen ? '0' : '1rem',
					}}
				>
					<img
						width={!smallScreen ? '100%' : '110%'}
						height={!smallScreen ? '100%' : '110%'}
						src={Images.GraduateSvg}
						alt="Graduate Student"
					/>
				</Box>
			) : (
				<Box
					style={{
						position: 'absolute' as const,
						left: '60%',
						top: '55%',
						marginRight: '1rem',
					}}
				>
					<img
						width={!smallScreen ? '100%' : '110%'}
						height={!smallScreen ? '100%' : '110%'}
						src={Images.GraduateSvg}
						alt="Graduate Student"
					/>
				</Box>
			)}

			{/* --CONNECTOR LINE-- */}
			{!smallScreen ? (
				<Box
					style={{
						position: 'absolute' as const,
						right: '37%',
						top: '75%',
					}}
				>
					<img
						width={'100%'}
						height={'100%'}
						src={Images.VectorSvg}
						alt="Connector Line"
					/>
				</Box>
			) : (
				<Box
					style={{
						position: 'absolute' as const,
						left: '15%',
						top: '65%',
						zIndex: -1,
					}}
				>
					<img
						width={'100%'}
						height={'100%'}
						src={Images.VectorSmallSvg}
						alt="Connector Line"
					/>
				</Box>
			)}

			{/* --TITLE & MESSAGE-- */}
			<Box
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column' as const,
				}}
			>
				<Box
					as="h1"
					style={{
						fontSize: !smallScreen ? '4.5rem' : '3rem',
						textAlign: 'center' as const,
						width: !smallScreen ? '80%' : '100%',
						lineHeight: !smallScreen ? 1.5 : 1.2,
					}}
				>
					<span
						style={{
							color: '#2E3EE5',
						}}
					>
						Empowering
					</span>{' '}
					Students’ aspirations
				</Box>
				{/* --MESSAGE-- */}
				<Box
					as={'p'}
					style={{
						width: !smallScreen ? '40%' : '90%',
						textAlign: 'center' as const,
						fontSize: !smallScreen ? '1.25rem' : '1rem',
						marginTop: !smallScreen ? '-2.5rem' : '-1.5rem',
						color: 'rgba(0, 0, 0, 0.6)',
						lineHeight: 1.5,
					}}
				>
					We connect students with experienced advisors who can help them make
					informed decisions.
				</Box>
				{/* --BUTTON-- */}
				<Box width={!smallScreen ? '20%' : '90%'} mt={'2rem'}>
					<Button
						onClick={() => exnavigate(envKeys.APP_URL as string)}
						style={{
							fontSize: '1.25rem',
							padding: '1rem 2rem',
						}}
						size="large"
						width={'100%'}
						variant="primary"
					>
						Join Us
					</Button>
				</Box>
			</Box>
		</Container>
	);
}

export default Home;
