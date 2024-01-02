import { Icons, routePaths } from '@kwicon/commons';
import { Box, Heading, Paragraph } from '@kwicon/kwicon-ui';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';

/* eslint-disable-next-line */
export interface UserAboutProps {
	about: string | null | undefined;
	isEditable?: boolean;
}

export function UserAbout(props: UserAboutProps) {
	const [readMore, setReadMore] = useState<boolean>(false); // toggle about

	const theme = useTheme();

	return (
		<Box
			bg={theme.palettes.colors.white as string}
			p={'0.5rem 1rem'}
			mt={'1rem'}
		>
			<Box style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Heading fs={'1rem'} fw={'700'}>
					About
				</Heading>
				{props.isEditable && (
					<Link to={routePaths.user.aboutMe}>
						<Icons.PenIcon />
					</Link>
				)}
			</Box>

			{props.about && (
				<Box cursor="pointer" onClick={() => setReadMore(!readMore)}>
					<div
						style={{ fontSize: '0.9rem' }}
						dangerouslySetInnerHTML={{
							__html: readMore
								? props.about.replace(/\n/g, '<br>')
								: props.about
										.split(/[\s\n\t]+/)
										.join(' ')
										.slice(0, 200)
										.replace(/\n/g, '<br>') + '...',
						}}
					/>
					{props.about.split(/[\s\n\t]+/).join(' ').length > 200 && (
						<Paragraph
							ta="right"
							fs={'0.8rem'}
							fw={'700'}
							color={theme.palettes.colors.darkBlue[0]}
						>
							{readMore ? 'Show less' : 'Show more'}
						</Paragraph>
					)}
				</Box>
			)}
		</Box>
	);
}
