import { Icons } from '@kwicon/commons';
import { Box, Paragraph } from '@kwicon/kwicon-ui';

export interface ChatBlockedIndicatorProps {
	name?: string;
	content?: string;
}

export function ChatBlockedIndicator(props: ChatBlockedIndicatorProps) {
	return (
		<Box
			px={'2rem'}
			pb={'0.8rem'}
			pt={'0.5rem'}
			boxShadow=" 0px -1px 15px rgba(28, 28, 35, 0.08)"
			style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
		>
			<Icons.InfoDangerIcon />
			{props.content ? (
				<Paragraph>{props.content}</Paragraph>
			) : (
				<Paragraph>
					You are no longer connected with <b>{props.name}</b>. Connect with
					them again to start a conversation.
				</Paragraph>
			)}
		</Box>
	);
}
