import type { Meta, StoryObj } from '@storybook/react';
import { FullbleedMedia } from './FullbleedMedia';

const meta: Meta<typeof FullbleedMedia> = {
  title: 'UI/FullbleedMedia',
  component: FullbleedMedia,
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof FullbleedMedia>;

export const Default: Story = { args: {} };