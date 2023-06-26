import { Footer } from './Footer'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Footer> = {
  title: 'UI/Footer',
  component: Footer,
  parameters: {},
}

export default meta
type Story = StoryObj<typeof Footer>

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
