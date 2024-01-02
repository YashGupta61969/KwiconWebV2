import { Avatar, Box, Paper, Paragraph } from '@kwicon/kwicon-ui';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useTheme } from 'styled-components';

/* eslint-disable-next-line */
export interface AdvisorCardProps {
	selected?: boolean;
	onSelectAdvisor?: (advisor: string) => void;
	content?: string;
	id: string;
	name?: string;
	profilePicture?: string;
}

export function AdvisorCard(props: AdvisorCardProps) {
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
				height: '11rem',
			}}
			onClick={() => props.onSelectAdvisor?.(props.id)}
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
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column' as const,
				}}
			>
				{/* Content */}
				{props.profilePicture ? (
					<Avatar type="image" src={props.profilePicture} alt={props.name} />
				) : (
					<Avatar size="medium" type="text" text={props.name} />
				)}
				<Box
					style={{
						marginTop: '0.75rem',
						fontSize: '1rem',
						fontWeight: 700,
					}}
				>
					{props.name}
				</Box>
			</Box>
		</Paper>
	);
}

export default AdvisorCard;
