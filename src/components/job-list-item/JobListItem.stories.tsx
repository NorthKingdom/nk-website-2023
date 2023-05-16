import type { Meta, StoryObj } from '@storybook/react'
import { JobListItem } from './JobListItem'

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
    location: 'Sweden',
    link: 'https://www.exmaple-link.com',
  },
}

export const OpenApplication: Story = {
  args: {
    title: 'Open Application',
    location: 'Sweden/Barcelona',
    link: 'https://www.exmaple-link.com',
    description: `Although we currently don’t have any open positions, we always welcome applications from talented individuals.`,
  },
}
