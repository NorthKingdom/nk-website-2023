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

export const Default: Story = {
  args: {},
  render: (args) => (
    <Select.Root {...args}>
      <Select.Item value="Item 1">Item 1</Select.Item>
      <Select.Item value="Item 2">Item 2</Select.Item>
      <Select.Item value="Item 3">Item 3</Select.Item>
    </Select.Root>
  ),
}
