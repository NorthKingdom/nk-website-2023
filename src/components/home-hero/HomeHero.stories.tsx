import type { Meta, StoryObj } from '@storybook/react';
import { HomeHero } from './HomeHero';

const meta: Meta<typeof HomeHero> = {
  title: 'UI/HomeHero',
  component: HomeHero,
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof HomeHero>;

export const Default: Story = { args: {} };