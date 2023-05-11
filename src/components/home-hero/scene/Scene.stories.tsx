import type { Meta, StoryObj } from '@storybook/react';
import { Scene } from './Scene';

const meta: Meta<typeof Scene> = {
  title: 'UI/Scene',
  component: Scene,
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof Scene>;

export const Default: Story = { args: {} };