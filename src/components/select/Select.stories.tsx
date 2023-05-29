import type { Meta, StoryObj } from '@storybook/react'
import * as Select from './Select'

const meta: Meta<(typeof Select)['Root']> = {
  title: 'UI/Select',
  component: Select['Root'],
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<(typeof Select)['Root']>

export const Default: Story = { args: {} }
