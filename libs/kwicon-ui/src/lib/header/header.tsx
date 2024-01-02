import { Icons } from '@kwicon/commons';
import Box from '../box/box';
import styles from './header.module.css';
import { useNavigate } from 'react-router-dom';
import Icon from '../icon/icon';
import Button from '../button/button';
import { useTheme } from 'styled-components';

/* eslint-disable-next-line */
export interface HeaderProps {
	avatarBox?: React.ReactNode;
	searchComponent?: React.ReactNode;
}

export function Header(props: HeaderProps) {
	const navigate = useNavigate();
	const theme = useTheme();

	return (
		<div className={styles['header-container']}>
			<Box>
				<Button
					variant="unstyled"
					style={{
						gap: '0.5rem',
						fontSize: '1.25rem',
					}}
					onClick={() => navigate('/')}
				>
					<Icon component={Icons.KwiconLogoSmall} />
					<Box color={theme.palettes.colors.black as string}>Kwicon</Box>
				</Button>
			</Box>
			<Box width={'480px'}>
				{props.searchComponent}
				{/* <SearchBox
					placeholder="Search advisors by name, profession, expertise"
					icon={<Icons.SearchIcon />}
					width="100%"
					options={{
						subCategoryList: subCategoryList?.slice(0, 10),
						advisors: advisors?.slice(0, 10),
					}}
				/> */}
			</Box>
			<Box style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
				{/* <Box style={{ display: 'flex', gap: 10 }}>
					<IconButton
						size="lg"
						bg={theme.palettes.colors.lightGray[0]}
						style={{ borderRadius: theme.borderRadius.regular }}
					>
						<Icons.QuestionIcon />
					</IconButton>
					<IconButton
						size="lg"
						bg={theme.palettes.colors.lightGray[0]}
						style={{ borderRadius: theme.borderRadius.regular }}
					>
						<Icons.BellIcon />
					</IconButton>
				</Box> */}
				<Box>{props.avatarBox}</Box>
			</Box>
		</div>
	);
}

export default Header;
