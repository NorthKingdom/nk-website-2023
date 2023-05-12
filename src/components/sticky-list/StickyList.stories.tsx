import type { Meta, StoryObj } from '@storybook/react';
import { StickyList } from './StickyList';

const meta: Meta<typeof StickyList> = {
  title: 'UI/StickyList',
  component: StickyList,
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof StickyList>;

export const Default: Story = { args: {} };