import { Box } from '@kwicon/kwicon-ui';
import { Images } from '@kwicon/commons';

export function AuthImage(): JSX.Element {
	return (
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		<Box
			width={'50%'}
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}
		>
			<img
				src={Images.KwiconLogoLarge}
				alt="Kwicon Logo Large"
				loading="eager"
			/>
			<Box
				style={{
					fontWeight: 700,
					fontSize: '3rem',
				}}
			>
				KWICON
			</Box>
		</Box>
	);
}
