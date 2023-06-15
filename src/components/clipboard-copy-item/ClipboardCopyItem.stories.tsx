import type { Meta, StoryObj } from '@storybook/react'
import { ClipboardCopyItem } from './ClipboardCopyItem'

const meta: Meta<typeof ClipboardCopyItem> = {
  title: 'UI/ClipboardCopyItem',
  component: ClipboardCopyItem,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof ClipboardCopyItem>

export const Default: Story = {
  args: {
    label: 'info@northkingdom.com',
    content: 'info@northkingdom.com',
    hoverLabel: 'Copy email',
    confirmationLabel: 'Copied!',
  },
}
