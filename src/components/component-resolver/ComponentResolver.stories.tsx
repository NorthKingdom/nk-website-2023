import type { Meta, StoryObj } from '@storybook/react';
import { ComponentResolver } from './ComponentResolver';

const meta: Meta<typeof ComponentResolver> = {
  title: 'UI/ComponentResolver',
  component: ComponentResolver,
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof ComponentResolver>;

export const Default: Story = { args: {} };