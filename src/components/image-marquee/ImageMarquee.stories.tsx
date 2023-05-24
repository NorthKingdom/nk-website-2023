import type { Meta, StoryObj } from '@storybook/react';
import { ImageMarquee } from './ImageMarquee';

const meta: Meta<typeof ImageMarquee> = {
  title: 'UI/ImageMarquee',
  component: ImageMarquee,
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof ImageMarquee>;

export const Default: Story = { args: {} };