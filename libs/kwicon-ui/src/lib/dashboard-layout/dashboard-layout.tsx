import { Outlet } from 'react-router-dom';
import { useTheme } from 'styled-components';
import Box from '../box/box';
import Container from '../container/container';
import styles from './dashboard-layout.module.css';
import { forwardRef } from 'react';

export interface DashboardLayoutProps {
	header: React.ReactNode;
	sidebar: React.ReactNode;
	// handleOnScroll?: () => void;
	// ref: any;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = forwardRef(
	({
		header,
		sidebar,
		// handleOnScroll, ref
	}) => {
		const theme = useTheme();

		return (
			<div className={styles['dashboard-layout__container']}>
				{header}
				<main className={styles['dashboard-layout__main-contant']}>
					{/* Sidebar */}
					{sidebar}

					{/* Main Content */}
					<div
						// ref={ref}
						// onScroll={handleOnScroll}
						style={{
							background: theme.palettes.colors.primaryBg as string,
						}}
						className={styles['main__content']}
					>
						{/* mb={'4rem'} */}
						<Container className={styles['main__outer-container']}>
							<Box className={styles['main__inner-container']}>
								<Outlet />
							</Box>
						</Container>
					</div>
				</main>
			</div>
		);
	},
);

export default DashboardLayout;
