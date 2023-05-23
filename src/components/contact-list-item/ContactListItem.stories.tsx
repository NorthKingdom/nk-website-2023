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
    title: 'General enquiries',
    linksCollection: {
      items: [
        {
          copy: '+46 8 14 11 11',
          url: '+46 8 14 11 11',
        },
        {
          copy: 'info@northkingdom.com',
          url: 'info@northkingdom.com',
        },
      ],
    },
  },
}

export const NewBusiness: Story = {
  args: {
    title: 'New business',
    linksCollection: {
      items: [
        {
          copy: 'business@northkingdom.com',
          url: 'business@northkingdom.com',
        },
      ],
    },
  },
}

export const Jobs: Story = {
  args: {
    title: 'Jobs',
    linksCollection: {
      items: [
        {
          copy: 'info@northkingdom.com',
          url: 'info@northkingdom.com',
        },
      ],
    },
  },
}

export const Social: Story = {
  args: {
    title: 'Social',
    linksCollection: {
      items: [
        {
          copy: 'LinkedIn',
          url: 'www.example.com',
        },
        {
          copy: 'Twitter',
          url: 'www.example.com',
        },
        {
          copy: 'Instagram',
          url: 'www.example.com',
        },
      ],
    },
  },
}
