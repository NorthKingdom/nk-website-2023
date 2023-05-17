import type { Meta, StoryObj } from '@storybook/react';
import { CloseButton } from './CloseButton';

const meta: Meta<typeof CloseButton> = {
  title: 'UI/CloseButton',
  component: CloseButton,
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof CloseButton>;

export const Default: Story = { args: {} };