import type { Meta, StoryObj } from '@storybook/react';
import { CaseListItem } from './CaseListItem';

const meta: Meta<typeof CaseListItem> = {
  title: 'UI/CaseListItem',
  component: CaseListItem,
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof CaseListItem>;

export const Default: Story = { args: {} };