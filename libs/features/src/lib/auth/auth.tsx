import { Box, Container, Loaders } from '@kwicon/kwicon-ui';
import { AuthBox } from './components/auth-box';
import { AuthImage } from './components/auth-image';
import { AuthNav } from './components/auth-nav';
import { routePaths, useAuthStatus } from '@kwicon/commons';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function Auth(): JSX.Element {
	const navigate = useNavigate();
	const location = useLocation();
	const [loader, setLoader] = useState(true);
	const loggedInWithEmail = useAuthStatus();

	useEffect(() => {
		handleIsLoggedIn();
	}, []);

	const handleIsLoggedIn = () => {
		setLoader(true);
		const timeOut = setTimeout(() => {
			setLoader(false);
		}, 3000);

		if (loggedInWithEmail) {
			navigate(
				location.state?.from ? location.state.from : routePaths.root.home,
			);
		} else {
			setLoader(false);
		}
		return () => clearTimeout(timeOut);
	};

	return (
		//* Login Container
		<Container height={'100%'}>
			{loader ? (
				<Loaders.Page />
			) : (
				<Box>
					{/* Back Button - Wil take back to the website home */}
					<AuthNav />
					<Box
						as={'section'}
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						{/* Auth Box */}
						<AuthBox setLoader={setLoader} />
						{/* Auth Image Section */}
						<AuthImage />
					</Box>
				</Box>
			)}
		</Container>
	);
}

export default Auth;
