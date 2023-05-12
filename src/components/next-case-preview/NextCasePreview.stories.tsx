import type { Meta, StoryObj } from '@storybook/react';
import { NextCasePreview } from './NextCasePreview';

const meta: Meta<typeof NextCasePreview> = {
  title: 'UI/NextCasePreview',
  component: NextCasePreview,
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof NextCasePreview>;

export const Default: Story = { args: {} };