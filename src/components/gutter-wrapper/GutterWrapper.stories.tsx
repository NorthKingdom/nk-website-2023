import type { Meta, StoryObj } from '@storybook/react';
import { GutterWrapper } from './GutterWrapper';

const meta: Meta<typeof GutterWrapper> = {
  title: 'UI/GutterWrapper',
  component: GutterWrapper,
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof GutterWrapper>;

export const Default: Story = { args: {} };