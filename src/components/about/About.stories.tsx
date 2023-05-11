import type { Meta, StoryObj } from '@storybook/react';
import { About } from './About';

const meta: Meta<typeof About> = {
  title: 'UI/About',
  component: About,
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof About>;

export const Default: Story = { args: {} };