import type { Meta, StoryObj } from '@storybook/react';
import { CaseList } from './CaseList';

const meta: Meta<typeof CaseList> = {
  title: 'UI/CaseList',
  component: CaseList,
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof CaseList>;

export const Default: Story = { args: {} };