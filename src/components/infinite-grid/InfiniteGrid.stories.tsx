import type { Meta, StoryObj } from '@storybook/react'
import { InfiniteGrid } from './InfiniteGrid'

const meta: Meta<typeof InfiniteGrid> = {
  title: 'UI/InfiniteGrid',
  component: InfiniteGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof InfiniteGrid>

export const Default: Story = { args: {} }
