import { Menu } from './Menu'
import type { Meta, StoryObj } from '@storybook/react'

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
