import type { Meta, StoryObj } from '@storybook/react'
import { WebglScene } from './WebglScene'

const meta: Meta<typeof WebglScene> = {
  title: 'UI/WebglScene',
  component: WebglScene,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof WebglScene>

export const Default: Story = { args: {} }
