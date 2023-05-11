import type { Meta, StoryObj } from '@storybook/react'
import { MenuHamburgerButton } from './MenuHamburgerButton'

const meta: Meta<typeof MenuHamburgerButton> = {
  title: 'UI/MenuHamburgerButton',
  component: MenuHamburgerButton,
  // tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof MenuHamburgerButton>

export const LightMode: Story = {
  args: {},
}

export const DarkMode: Story = {
  parameters: { theme: 'dark' },
  args: {},
}
