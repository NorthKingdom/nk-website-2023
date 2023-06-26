import { WebglScene } from './WebglScene'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof WebglScene> = {
  title: 'UI/WebglScene',
  component: WebglScene,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof WebglScene>

export const Default: Story = { args: {} }
