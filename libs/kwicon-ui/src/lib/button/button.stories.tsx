import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from './button';
import { BiArrowBack } from 'react-icons/bi';

export default {
	component: Button,
	title: 'KwiconUI/Button',
	argTypes: {
		variant: {
			options: ['primary', 'secondary', 'tertiary', 'ghost', 'text'],
			control: { type: 'radio' },
		},
		size: {
			options: ['small', 'medium', 'large'],
			control: { type: 'radio' },
		},
		disabled: {
			control: { type: 'boolean' },
		},
		iconPosition: {
			options: ['left', 'right'],
			control: { type: 'radio' },
		},
		bg: {
			control: 'color',
		},
		color: {
			control: 'color',
		},

		onClick: { action: 'onClick executed!' },
		width: { control: { type: 'text' } },
		height: { control: { type: 'text' } },
	},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Regular = Template.bind({});
Regular.args = {
	size: 'medium',
	disabled: false,
	iconPosition: 'left',
	icon: <BiArrowBack />,
	children: 'Primary',
	width: '20%',
	variant: 'primary',
};
