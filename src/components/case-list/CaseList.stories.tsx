import { CaseList } from './CaseList';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CaseList> = {
  title: 'UI/CaseList',
  component: CaseList,
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof CaseList>;

export const Default: Story = { args: {} };