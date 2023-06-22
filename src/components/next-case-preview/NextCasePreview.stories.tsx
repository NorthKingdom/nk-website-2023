import { NextCasePreview } from './NextCasePreview';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof NextCasePreview> = {
  title: 'UI/NextCasePreview',
  component: NextCasePreview,
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof NextCasePreview>;

export const Default: Story = { args: {} };