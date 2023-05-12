import type { Meta, StoryObj } from '@storybook/react';
import { Slideshow } from './Slideshow';

const meta: Meta<typeof Slideshow> = {
  title: 'UI/Slideshow',
  component: Slideshow,
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof Slideshow>;

export const Default: Story = { args: {} };