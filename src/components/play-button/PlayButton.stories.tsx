import type { Meta, StoryObj } from '@storybook/react';
import { PlayButton } from './PlayButton';

const meta: Meta<typeof PlayButton> = {
  title: 'UI/PlayButton',
  component: PlayButton,
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof PlayButton>;

export const Default: Story = { args: {} };