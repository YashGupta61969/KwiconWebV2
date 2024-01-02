import { Box } from '@kwicon/kwicon-ui';
import styles from '../chat.module.css';

export function StartConversation() {
	return (
		<Box
			style={{
				flex: 1,
				padding: '0 1rem',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center',
				marginTop: '20%'
			}}
			className={styles['messages-container']}
		>
			Start a conversation.
			<br /> Share your thoughts on a topic.
		</Box>
	);
}
