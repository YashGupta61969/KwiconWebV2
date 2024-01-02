import { Box, Button, Divider, Paper } from '@kwicon/kwicon-ui';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useTheme } from 'styled-components';

/* eslint-disable-next-line */
export interface CommunityCardProps {
	communityId: string | null;
	communityName: string | null;
	communityLeader: string | null;
	communityAdvisors: number | null;
	communityMembers: number | null;
	handleJoinCommunity?: () => void;
	selected?: boolean;
	shouldShowJoinButton?: boolean;
}

export function CommunityCard(props: CommunityCardProps) {
	const theme = useTheme();

	return (
		<Paper
			showTransition
			withShadow={props.selected}
			withBorder={props.selected}
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: props.selected ? '' : 'center',
				minWidth: '20rem',
				position: 'relative' as const,
			}}
		>
			<Box width={'70%'}>
				<Box
					style={{
						fontWeight: 700,
						fontSize: '1rem',
					}}
				>
					{props.communityName}
				</Box>
				<Box
					style={{
						fontSize: '0.875rem',
					}}
					mt={'0.5rem'}
					color="rgba(0, 0, 0, 0.7)"
				>
					Community leader: {props.communityLeader || 'No leader'}
				</Box>
				<Box
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginTop: '0.75rem',
						width: '12rem',
					}}
				>
					<Box
						style={{
							fontSize: '0.875rem',
						}}
						color="rgba(0, 0, 0, 0.7)"
					>
						{props.communityAdvisors
							? `${props.communityAdvisors} Advisors`
							: 'No Advisors'}
					</Box>
					{/* Vertical Line */}
					<Divider
						orientation="horizontal"
						color="rgba(0, 0, 0, 0.2)"
						height="1rem"
					/>
					<Box
						style={{
							fontSize: '0.875rem',
						}}
						color="rgba(0, 0, 0, 0.7)"
					>
						{props.communityMembers
							? `${props.communityMembers} Members`
							: 'No Members'}
					</Box>
				</Box>
			</Box>
			{!props.selected ? (
				// will be shown if selected is false
				<Box>
					{props.shouldShowJoinButton && (
						<Button
							onClick={() => {
								props.handleJoinCommunity && props.handleJoinCommunity();
							}}
							style={{
								fontSize: '1.25rem',
								padding: 0,
							}}
							variant="unstyled"
						>
							Join
						</Button>
					)}
				</Box>
			) : (
				<Box
					style={{
						display: 'flex',
						flexDirection: 'column' as const,
						justifyContent: 'space-between',
					}}
				>
					<Box>
						<Button
							onClick={() =>
								props.handleJoinCommunity && props.handleJoinCommunity()
							}
							variant="unstyled"
							style={{
								padding: 5,
								fontSize: '0.875rem',
							}}
						>
							Withdraw
						</Button>
					</Box>
					<Box
						style={{
							fontSize: '0.75rem',
							color: 'rgba(0, 0, 0, 0.4)',
						}}
					>
						Request Sent
					</Box>
				</Box>
			)}
		</Paper>
	);
}

export default CommunityCard;
