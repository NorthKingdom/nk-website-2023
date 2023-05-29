import type { Meta, StoryObj } from '@storybook/react'
import { LoadMore } from './LoadMore'

const meta: Meta<typeof LoadMore> = {
  title: 'UI/LoadMore',
  component: LoadMore,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof LoadMore>

export const LightMode: Story = {
  args: {
    theme: 'light',
  },
}

export const DarkMode: Story = {
  parameters: { theme: 'dark' },
  args: {
    theme: 'dark',
  },
}
