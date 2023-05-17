import type { Meta, StoryObj } from '@storybook/react'
import { ContactListItem } from './ContactListItem'

const meta: Meta<typeof ContactListItem> = {
  title: 'UI/ContactListItem',
  component: ContactListItem,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof ContactListItem>

export const GeneralEnquiries: Story = {
  args: {
    header: 'General enquiries',
    information: 'info@northkingdom.com',
  },
}

export const NewBusiness: Story = {
  args: {
    header: 'New business',
    information: 'business@northkingdom.com',
  },
}

export const Jobs: Story = {
  args: {
    header: 'Jobs',
    information: 'info@northkingdom.com',
  },
}

export const Social: Story = {
  args: {
    header: 'Social',
    information: 'Twitter',
  },
}
