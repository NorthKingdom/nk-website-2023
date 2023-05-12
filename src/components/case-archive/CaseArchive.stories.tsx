import type { Meta, StoryObj } from '@storybook/react';
import { CaseArchive } from './CaseArchive';

const meta: Meta<typeof CaseArchive> = {
  title: 'UI/CaseArchive',
  component: CaseArchive,
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof CaseArchive>;

export const Default: Story = { args: {} };