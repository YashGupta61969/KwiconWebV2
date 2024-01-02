import { Box, IconButton } from '@kwicon/kwicon-ui';
import { BiArrowBack } from 'react-icons/bi';
import { envKeys, useExternalNavigate } from '@kwicon/commons';

export function AuthNav(): JSX.Element {
	const navigate = useExternalNavigate();
	return (
		<Box as={'section'} pt="5rem">
			<IconButton
				size="lg"
				onClick={() => navigate(envKeys.WEBSITE_URL as string)}
			>
				<BiArrowBack />
			</IconButton>
		</Box>
	);
}
