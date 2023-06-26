import { AwardItem } from './AwardItem'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof AwardItem> = {
  title: 'UI/AwardItem',
  component: AwardItem,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof AwardItem>

export const Default: Story = {
  args: {
    awardName: 'FWA Site of the Day',
    count: 54,
  },
}
