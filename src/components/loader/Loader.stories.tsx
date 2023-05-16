import type { Meta, StoryObj } from '@storybook/react'
import { Loader } from './Loader'

const meta: Meta<typeof Loader> = {
  title: 'UI/Loader',
  component: Loader,
  parameters: {},
}

export default meta
type Story = StoryObj<typeof Loader>

export const LightMode: Story = { args: {} }

export const DarkMode: Story = { parameters: { theme: 'dark' } }
