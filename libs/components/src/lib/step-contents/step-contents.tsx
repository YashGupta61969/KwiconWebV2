import { Box, Heading, Paragraph } from '@kwicon/kwicon-ui';

// Step Contents for students
export const stepContentForStudent = [
	{
		title: 'Step 1',
		component: () => (
			<Box>
				<Heading type="h2" lh={0.5}>
					Welcome!
				</Heading>
				<Paragraph>Let&apos;s have a quick introduction</Paragraph>
			</Box>
		),
	},
	{
		title: 'Step 2',
		component: (props: {
			chosenTopicsLength?: number;
			topicExpanded?: boolean;
		}) => (
			<Box>
				<Heading type="h2" lh={1}>
					Choose your{' '}
					<span
						style={{
							color: '#2E3EE5',
						}}
					>
						Interests
					</span>{' '}
					!
				</Heading>
				{props.topicExpanded ? (
					<Paragraph>
						{props.chosenTopicsLength === 0
							? 'Choose topics that excite you.'
							: 'You have chosen ' + props.chosenTopicsLength + ' topics.'}
					</Paragraph>
				) : (
					<Paragraph>
						Let&apos;s narrow down to what makes you curious
					</Paragraph>
				)}
			</Box>
		),
	},
	//? since the design changed, we don't need the below steps anymore
	// {
	// 	title: 'Step 3',
	// 	component: () => (
	// 		<Box>
	// 			<Heading type="h2" lh={1}>
	// 				Connect with your{' '}
	// 				<span
	// 					style={{
	// 						color: '#2E3EE5',
	// 					}}
	// 				>
	// 					Advisors.
	// 				</span>{' '}
	// 			</Heading>
	// 			<Paragraph>
	// 				We identified few people that might help you on your path to
	// 				excellence.
	// 			</Paragraph>
	// 		</Box>
	// 	),
	// },
	// {
	// 	title: 'Step 4',
	// 	component: () => (
	// 		<Box>
	// 			<Heading type="h2" lh={1}>
	// 				Join a Community!
	// 			</Heading>
	// 			<Paragraph>
	// 				Be part of communities to benefit from continuous and active learning.
	// 			</Paragraph>
	// 		</Box>
	// 	),
	// },
];

export const stepContentForAdvisor = [
	{
		title: 'Step 1',
		component: () => (
			<Box>
				<Heading type="h2" lh={1}>
					Welcome!
				</Heading>
				<Paragraph>Let&apos;s have a quick introduction</Paragraph>
			</Box>
		),
	},
	{
		title: 'Step 2',
		component: () => (
			<Box>
				<Heading type="h2" lh={1}>
					Choose your{' '}
					<span
						style={{
							color: '#2E3EE5',
						}}
					>
						Expertise !
					</span>{' '}
					!
				</Heading>
				<Paragraph>Choose topics you can give guidance on</Paragraph>
			</Box>
		),
	},
	// {
	// 	title: 'Step 3',
	// 	component: () => (
	// 		<Box>
	// 			<Heading type="h2" lh={1}>
	// 				Join a Community!
	// 			</Heading>
	// 			<Paragraph>
	// 				Be part of communities to benefit from continuous and active learning.
	// 			</Paragraph>
	// 		</Box>
	// 	),
	// },
];

export const stepContentForSeniorStudents = [
	{
		title: 'Step 1',
		component: () => (
			<Box>
				<Heading type="h2" lh={1}>
					Welcome!
				</Heading>
				<Paragraph>Let&apos;s have a quick introduction</Paragraph>
			</Box>
		),
	},
	{
		title: 'Step 2',
		component: (props: {
			chosenTopicsLength?: number;
			topicExpanded?: boolean;
		}) => (
			<Box>
				<Heading type="h2" lh={1}>
					Choose your{' '}
					<span
						style={{
							color: '#2E3EE5',
						}}
					>
						Interests
					</span>{' '}
					!
				</Heading>
				{props.topicExpanded ? (
					<Paragraph>
						{props.chosenTopicsLength === 0
							? 'Choose topics that excite you.'
							: 'You have chosen ' + props.chosenTopicsLength + ' topics.'}
					</Paragraph>
				) : (
					<Paragraph>
						Let&apos;s narrow down to what makes you curious
					</Paragraph>
				)}
			</Box>
		),
	},
	{
		title: 'Step 3',
		component: () => (
			<Box>
				<Heading type="h2" lh={1}>
					Choose your{' '}
					<span
						style={{
							color: '#2E3EE5',
						}}
					>
						Expertise !
					</span>{' '}
					!
				</Heading>
				<Paragraph>Choose topics you can give guidance on</Paragraph>
			</Box>
		),
	},
];
