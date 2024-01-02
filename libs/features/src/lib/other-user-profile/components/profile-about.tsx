import { Box, Paper } from '@kwicon/kwicon-ui';
import { useState } from 'react';
import { useTheme } from 'styled-components';

export interface ProfileAboutProps {
	advisor: any;
}

export const ProfileAbout: React.FC<ProfileAboutProps> = ({ advisor }) => {
	const theme = useTheme();

	const [showMore, setShowMore] = useState(false);

	const handleShowMore = () => {
		setShowMore(!showMore);
	};

	const handleShowLess = () => {
		setShowMore(!showMore);
	};

	const renderAbout = () => {
		if (advisor?.about?.length > 100) {
			return (
				<>
					{advisor?.about?.slice(0, 100)} {!showMore && '  ...'}
					{showMore && advisor?.about?.slice(100)}
				</>
			);
		} else {
			return advisor?.about;
		}
	};

	const renderShowMoreButton = () => {
		if (advisor?.about?.length > 100) {
			return (
				<Box
					style={{
						color: theme.palettes.colors.darkBlue[0],
						fontSize: '0.875rem',
						fontWeight: 'bold',
						cursor: 'pointer',
					}}
					onClick={handleShowMore}
				>
					Show more
				</Box>
			);
		} else {
			return null;
		}
	};

	const renderShowLessButton = () => {
		if (advisor?.about?.length > 100) {
			return (
				<Box
					style={{
						color: theme.palettes.colors.darkBlue[0],
						fontSize: '0.875rem',
						fontWeight: 'bold',
						cursor: 'pointer',
					}}
					onClick={handleShowLess}
				>
					Show less
				</Box>
			);
		} else {
			return null;
		}
	};

	const renderAboutSection = () => {
		return (
			<Box
				style={{
					fontSize: '0.875rem',
					fontWeight: '400',
					lineHeight: '1.5rem',
					color: '#4F4F4F',
					whiteSpace: 'pre-wrap' as const,
				}}
			>
				{renderAbout()}
				<Box
					mt={'1rem'}
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
					}}
				>
					{showMore ? renderShowLessButton() : renderShowMoreButton()}
				</Box>
			</Box>
		);
	};

	return (
		<Paper bg="white" border="1px solid red">
			<Box
				style={{
					fontSize: '1rem',
					fontWeight: 'bold',
				}}
			>
				About
			</Box>
			<Box>{renderAboutSection()}</Box>
		</Paper>
	);
};
