import { Header } from './Header'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Header> = {
  title: 'UI/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const LightMode: Story = {
  args: {},
}

export const DarkMode: Story = {
  parameters: { theme: 'dark' },
  args: {},
}
