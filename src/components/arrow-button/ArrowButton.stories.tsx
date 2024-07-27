import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
	title: 'Components/ArrowButton',
};

export default meta;

type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [isOpen, setIsOpen] = useState(false);

		const toggleOpen = () => {
			setIsOpen(!isOpen);
		};

		return <ArrowButton onClick={toggleOpen} isOpen={isOpen} />;
	},
};
