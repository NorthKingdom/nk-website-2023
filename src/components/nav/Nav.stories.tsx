import type { Meta, StoryObj } from '@storybook/react'
import { Nav } from './Nav'

const meta: Meta<typeof Nav> = {
  title: 'UI/Nav',
  component: Nav,
  // tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof Nav>

export const LightMode: Story = {
  args: {},
}

export const DarkMode: Story = {
  parameters: { theme: 'dark' },
  args: {},
}
