import type { Meta } from '@storybook/react';
import { Container } from './container';

const Story: Meta<typeof Container> = {
	component: Container,
	title: 'KwiconUI/Container',
	argTypes: {
		bg: {
			control: 'color',
		},
		color: {
			control: 'color',
		},
		width: { control: { type: 'text' } },
		height: { control: { type: 'text' } },

		fluid: {
			control: { type: 'boolean' },
		},

		size: {
			options: ['xs', 'sm', 'md', 'lg'],
			control: { type: 'radio' },
		},
	},
};
export default Story;

export const Primary = {
	args: {
		fluid: false,
		children: 'Container',
		size: 'md',
	},
};
