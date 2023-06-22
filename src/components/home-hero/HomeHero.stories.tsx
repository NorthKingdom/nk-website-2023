import { HomeHero } from './HomeHero';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof HomeHero> = {
  title: 'UI/HomeHero',
  component: HomeHero,
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof HomeHero>;

export const Default: Story = { args: {} };