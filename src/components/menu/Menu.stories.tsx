import type { Meta, StoryObj } from '@storybook/react'
import { Menu } from './Menu'

const meta: Meta<typeof Menu> = {
  title: 'UI/Menu',
  component: Menu,
  // tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof Menu>

export const Default: Story = {
  args: {
    isOpen: true,
  },
}
