import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = { args: {} };