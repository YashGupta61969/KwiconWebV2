import { Box, Paper, Paragraph } from '@kwicon/kwicon-ui';
import { Icons } from '@kwicon/commons';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useTheme } from 'styled-components';

/* eslint-disable-next-line */
export interface InterestCardProps {
	content: string;
	color: string | string[];
	selected?: boolean;
	onSelectCategory?: (category: string) => void;
}

export function InterestCard(props: InterestCardProps) {
	const theme = useTheme();

	return (
		<Paper
			showTransition
			withBorder
			bg={props.selected ? theme.palettes.colors.lightBlue[2] : ''}
			style={{
				display: 'flex',
				flexDirection: 'column' as const,
				justifyContent: 'center',
				alignItems: 'center',
				cursor: 'pointer',
				position: 'relative' as const,
				height: '10rem',
			}}
			onClick={() => props.onSelectCategory?.(props.content)}
		>
			{/* Icon */}
			{props.selected && (
				<Box
					style={{
						position: 'absolute' as const,
						top: 0,
						right: 0,
						margin: '0.5rem',
					}}
				>
					<BsFillCheckCircleFill color={theme.palettes.success[1]} />
				</Box>
			)}
			<Box
				as="article"
				style={{
					position: 'relative' as const,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Box
					style={{
						position: 'absolute' as const,
					}}
				>
					<Icons.BlobIcon pathFill={props.color} width={57} height={57} />
				</Box>
				<Box>
					<Icons.SuccessStarIcon />
				</Box>
			</Box>
			{/* Content */}
			<Box
				style={{
					textAlign: 'center' as const,
					marginBottom: '-1rem',
					height: '3rem',
				}}
			>
				<Paragraph type="p1" lh={1.5}>
					{props.content}
				</Paragraph>
			</Box>
		</Paper>
	);
}

export default InterestCard;
