import type { Meta } from '@storybook/react';
import { Box } from './box';

const Story: Meta<typeof Box> = {
	component: Box,
	title: 'KwiconUI/Box',
	argTypes: {
		bg: {
			control: 'color',
		},
		color: {
			control: 'color',
		},
		width: { control: { type: 'text' } },
		height: { control: { type: 'text' } },
	},
};
export default Story;

export const Regular = {
	args: {
		children: 'Box',
		p: '5rem',
		width: '50%',
		height: '50%',
		bg: '#6340e2',
		color: '#fff',
	},
};
