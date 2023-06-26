import { CloseButton } from './CloseButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CloseButton> = {
  title: 'UI/CloseButton',
  component: CloseButton,
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof CloseButton>;

export const Default: Story = { args: {} };