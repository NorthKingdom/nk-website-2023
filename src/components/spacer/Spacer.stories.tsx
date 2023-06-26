import { Spacer } from './Spacer'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Spacer> = {
  title: 'UI/Spacer',
  component: Spacer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Spacer component for adding space between elements',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Spacer>

export const Vertical: Story = {
  args: {
    debug: true,
  },
  render: (args) => (
    <>
      <div>Element 1</div>
      <Spacer {...args} style={{ height: '100px' }} />
      <div>Element 2</div>
    </>
  ),
}

export const Horizontal: Story = {
  args: {
    ...Vertical.args,
    direction: 'horizontal',
  },
  render: (args) => (
    <div style={{ display: 'flex' }}>
      <div>Element 1</div>
      <Spacer {...args} style={{ width: '100px' }} />
      <div>Element 2</div>
    </div>
  ),
}
