import type { Meta, StoryObj } from '@storybook/react'
import { FullbleedMedia } from './FullbleedMedia'
import { DUMMY_IMAGE } from '@stories/dummy-data'

const meta: Meta<typeof FullbleedMedia> = {
  title: 'UI/FullbleedMedia',
  component: FullbleedMedia,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof FullbleedMedia>

export const Default: Story = { args: DUMMY_IMAGE }
