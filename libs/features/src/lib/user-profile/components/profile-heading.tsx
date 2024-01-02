import { Icons, routePaths } from '@kwicon/commons';
import { Avatar, Box, Heading, Paragraph } from '@kwicon/kwicon-ui';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';

interface ProfileHeadingProps {
	mediaLoading?: boolean;
	media?: string;
	name?: string;
	role?: string;
	connection?: string;
	isEditable?: boolean;
	linkedin: string;
	connections?: number;
}

export function ProfileHeading(props: ProfileHeadingProps) {
	const theme = useTheme();
	return (
		<Box
			bg={theme.palettes.colors.white as string}
			p={'1rem 1rem'}
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'start',
			}}
		>
			<Box style={{ display: 'flex', gap: '1rem' }}>
				<Avatar
					loading={props.mediaLoading}
					size="medium"
					type={props.media ? 'image' : 'text'}
					src={props.media && props.media}
					text={props.name ? props.name : ''}
				/>
				<Box>
					<Heading fs={'0.9rem'} fw={'700'} style={{ margin: 0 }}>
						{props.name && props.name}
					</Heading>
					<Paragraph type="p2" fs={'0.9rem'} style={{ margin: 0 }}>
						{props.role && props.role}
					</Paragraph>
					<Paragraph type="p2" fs={'0.9rem'} style={{ margin: 0 }}>
						{props?.connections}{' '}
						{props?.connections === 1 ? 'connection' : 'connections'}
					</Paragraph>
				</Box>
			</Box>

			{props.isEditable ? (
				<Box>
					<Link to={routePaths.user.edit}>
						<Icons.PenIcon />
					</Link>
				</Box>
			) : (
				<Box>
					<a href={props.linkedin} target="_blank" rel="noreferrer">
						<Icons.LinkedInIcon />
					</a>
				</Box>
			)}
		</Box>
	);
}
