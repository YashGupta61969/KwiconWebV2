import { Box } from '@kwicon/kwicon-ui';
import { useTheme } from 'styled-components';

export function ChatEmpty() {
	const theme = useTheme();
	return (
		<Box
			width={'63%'}
			bg={theme.palettes.colors.white as string}
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				color: '#706767',
			}}
		>
			Select a person to see your messages with them.
		</Box>
	);
}
