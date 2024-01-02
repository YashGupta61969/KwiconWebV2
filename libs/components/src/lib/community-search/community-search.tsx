import { Box, Button, FormElements } from '@kwicon/kwicon-ui';
import { useTheme } from 'styled-components';

/* eslint-disable-next-line */
export interface CommunitySearchProps
	extends React.AllHTMLAttributes<HTMLInputElement> {
	buttonProps?: React.AllHTMLAttributes<HTMLButtonElement>;
}

export function CommunitySearch(props: CommunitySearchProps) {
	const theme = useTheme();
	return (
		<Box
			style={{
				display: 'flex',
				gap: '5px',
			}}
		>
			<FormElements.Input
				{...props}
				wrapper={{
					style: {
						backgroundColor: theme.palettes.colors.lightBlue[0] as string,
					},
				}}
				placeholder="Find Community"
			/>
			<Button
				{...props.buttonProps}
				variant="unstyled"
				style={{
					backgroundColor: theme.palettes.colors.secondary as string,
					color: theme.palettes.colors.white as string,
					padding: '0.5rem 1rem',
					borderRadius: '0.5rem',
				}}
			>
				Search
			</Button>
		</Box>
	);
}

export default CommunitySearch;
