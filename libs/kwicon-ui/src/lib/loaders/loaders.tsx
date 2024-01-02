import { Oval } from 'react-loader-spinner';
import Box, { BoxProps } from '../box/box';

/* eslint-disable-next-line */
export interface LoadersProps {}

export const Loaders = {
	Page: () => (
		<Box
			bg="#fff"
			height={'100vh'}
			width={'100%'}
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Oval
				ariaLabel="loading-indicator"
				height={30}
				width={30}
				strokeWidth={6}
				color={'#2E3EE5'}
				secondaryColor={'#7581FF'}
			/>
		</Box>
	),

	Component: ({ bg }: { bg?: string }) => (
		<Box
			bg={bg ?? '#fff'}
			height={'100%'}
			width={'100%'}
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Oval
				ariaLabel="loading-indicator"
				height={30}
				width={30}
				strokeWidth={6}
				color={'#2E3EE5'}
				secondaryColor={'#7581FF'}
			/>
		</Box>
	),
};

export default Loaders;
