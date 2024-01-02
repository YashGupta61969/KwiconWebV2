import { ComponentMeta, ComponentStory } from '@storybook/react';
import IconButton from './icon-button';
import { BiArrowBack } from 'react-icons/bi';

export default {
	component: IconButton,
	title: 'KwiconUi/IconButton',
	argTypes: {
		size: {
			options: ['sm', 'md', 'lg'],
			control: { type: 'radio' },
		},
	},
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = args => (
	<IconButton {...args} />
);

export const Regular = Template.bind({});
Regular.args = {
	children: <BiArrowBack />,
	size: 'md',
	onClick: () => ({}),
};
