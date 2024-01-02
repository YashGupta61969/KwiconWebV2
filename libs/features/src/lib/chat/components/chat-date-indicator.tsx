import { Box } from '@kwicon/kwicon-ui';
import styles from '../chat.module.css';

export interface ChatDateIndicatorProps {
	date: string;
}

export function ChatDateIndicator(props: ChatDateIndicatorProps) {
	return <Box className={styles['chat-date-indicator']}>{props.date}</Box>;
}
