import { Icons, routePaths } from '@kwicon/commons';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from 'styled-components';
import Box from '../box/box';
import Button from '../button/button';
import Icon from '../icon/icon';
import styles from './sidebar-drawer.module.css';

/* eslint-disable-next-line */
export interface SidebarDrawerProps {}

export function SidebarDrawer(props: SidebarDrawerProps) {
	// sidebar toggoler
	const [isDrowerOpen, setIsDrowerOpen] = useState<boolean>(true);
	const sidebarToggoleHandler = () => {
		setIsDrowerOpen(!isDrowerOpen);
	};

	const theme = useTheme();
	const location = useLocation();
	const { pathname } = location;
	return (
		<Box
			bg={theme.palettes.colors.white[0]}
			width={isDrowerOpen ? '16rem' : '2.563rem'}
			style={{
				transition: `all ${theme.transition.type.cubic.back} ${theme.transition.duration.regular}`,
			}}
			className={styles['sidebar']}
		>
			<Box>
				<Link
					to={routePaths.root.home}
					className={
						pathname === routePaths.root.home
							? styles['sidebar-active-style']
							: styles['sidebar-inactive-style']
					}
					style={{
						borderRadius: theme.borderRadius.regular,
						fontSize: '1rem',
						height: '1rem',
					}}
				>
					<Icon
						component={Icons.HomeIcon}
						color={
							pathname === routePaths.root.home
								? (theme.palettes.colors.white as string)
								: (theme.palettes.colors.darkBlue[0] as string)
						}
					/>
					{isDrowerOpen && 'Home'}
				</Link>
				<Link
					to={routePaths.myConnections.root}
					className={
						pathname === routePaths.myConnections.root
							? styles['sidebar-active-style']
							: styles['sidebar-inactive-style']
					}
					style={{
						borderRadius: theme.borderRadius.regular,
						fontSize: '1rem',
						height: '1rem',
					}}
				>
					<Icon
						color={
							pathname === routePaths.myConnections.root
								? (theme.palettes.colors.white as string)
								: (theme.palettes.colors.darkBlue[0] as string)
						}
						component={Icons.ConnectionIcon}
					/>
					{isDrowerOpen && 'Connections'}
				</Link>
				<Link
					to={routePaths.chat.root}
					className={
						pathname === routePaths.chat.root
							? styles['sidebar-active-style']
							: styles['sidebar-inactive-style']
					}
					style={{
						borderRadius: theme.borderRadius.regular,
						fontSize: '1rem',
						height: '1rem',
					}}
				>
					<Icon
						color={
							pathname === routePaths.chat.root
								? (theme.palettes.colors.white as string)
								: (theme.palettes.colors.darkBlue[0] as string)
						}
						component={Icons.ChatIcon}
					/>
					{isDrowerOpen && 'Chat'}
				</Link>
				{/* <Link
					to={routePaths.communities.root}
					className={
						pathname === routePaths.communities.root
							? styles['sidebar-active-style']
							: styles['sidebar-inactive-style']
					}
					style={{
						borderRadius: theme.borderRadius.regular,
						fontSize: '1rem',
						height: '1rem',
					}}
				>
					<Icon
						color={
							pathname === routePaths.communities.root
								? (theme.palettes.colors.white as string)
								: (theme.palettes.colors.darkBlue[0] as string)
						}
						component={Icons.CommunitesIcon}
					/>
					{isDrowerOpen && 'Communities'}
				</Link> */}
				<Link
					to={routePaths.posts.myPosts}
					className={
						pathname === routePaths.posts.myPosts
							? styles['sidebar-active-style']
							: styles['sidebar-inactive-style']
					}
					style={{
						borderRadius: theme.borderRadius.regular,
						fontSize: '1rem',
						height: '1rem',
					}}
				>
					<Icon
						color={
							pathname === routePaths.posts.myPosts
								? (theme.palettes.colors.white as string)
								: (theme.palettes.colors.darkBlue[0] as string)
						}
						component={Icons.FeedIcon}
					/>
					{isDrowerOpen && 'My Posts'}
				</Link>
			</Box>
			<Box>
				<Button
					onClick={sidebarToggoleHandler}
					variant="text"
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '0.5rem',
						fontWeight: theme.typography.fontWeight,
					}}
				>
					<Box
						style={{
							transition: `all ${theme.transition.duration.regular}  ${theme.transition.type.cubic.circ}`,
							transform: isDrowerOpen ? 'rotate(0deg)' : 'rotate(180deg)',
						}}
					>
						<Icon height="1rem" width="1rem" component={Icons.CollaspeIcon} />
					</Box>
					{isDrowerOpen && 'Collapse'}
				</Button>
			</Box>
		</Box>
	);
}

export default SidebarDrawer;
