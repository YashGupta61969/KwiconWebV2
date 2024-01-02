import { Box } from '@kwicon/kwicon-ui';
import { Navbar } from '../navbar/navbar.web';
import { Footer } from '../footer/footer.web';
import { useMediaQuery } from '@kwicon/commons';

export interface LayoutProps {
	children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	// const smallScreen = useMediaQuery('(max-width: 768px)');

	return (
		<Box>
			<Navbar />
			<Box mt={0}>{children}</Box>
			<Footer />
		</Box>
	);
};

export default Layout;
