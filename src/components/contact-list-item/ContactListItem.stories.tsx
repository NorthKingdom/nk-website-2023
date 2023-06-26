import { DUMMY_CONTACT_LINK, DUMMY_CONTACT_CLIPBOARD_ITEM } from '@stories/dummy-data'
import { ContactListItem } from './ContactListItem'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ContactListItem> = {
  title: 'UI/ContactListItem',
  component: ContactListItem,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof ContactListItem>

export const Default: Story = {
  args: {
    title: 'General enquiries',
    linksCollection: {
      items: [DUMMY_CONTACT_LINK, DUMMY_CONTACT_CLIPBOARD_ITEM],
    },
  },
}
