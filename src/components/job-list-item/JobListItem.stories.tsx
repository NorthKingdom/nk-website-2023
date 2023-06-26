import { JobListItem } from './JobListItem'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof JobListItem> = {
  title: 'UI/JobListItem',
  component: JobListItem,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof JobListItem>

export const Default: Story = {
  args: {
    title: 'Senior Developer',
    locations: ['Stockholm'],
    url: 'https://www.exmaple-url.com',
  },
}

export const OpenApplication: Story = {
  args: {
    title: 'Open Application',
    locations: ['Skellefteå', 'Stockholm', 'Barcelona'],
    url: 'https://www.exmaple-url.com',
    description: `Although we currently don’t have any open positions, we always welcome applications from talented individuals.`,
  },
}
