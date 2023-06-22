import { PlayButton } from './PlayButton'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof PlayButton> = {
  title: 'UI/PlayButton',
  component: PlayButton,
  tags: ['autodocs'],
  parameters: {
    theme: 'dark',
  },
}

export default meta
type Story = StoryObj<typeof PlayButton>

export const Default: Story = { args: {} }
