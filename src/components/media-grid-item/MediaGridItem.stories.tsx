import type { Meta, StoryObj } from '@storybook/react'
import { MediaGridItem } from './MediaGridItem'
import { DUMMY_IMAGE, DUMMY_VIDEO } from '@stories/dummy-data'

const meta: Meta<typeof MediaGridItem> = {
  title: 'UI/MediaGridItem',
  component: MediaGridItem,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof MediaGridItem>

export const Video: Story = {
  args: {
    item: {
      media: {
        ...DUMMY_VIDEO,
        autoPlay: false,
        loop: false,
        muted: true,
      },
      offset: '0%',
    },
  },
}

export const Image: Story = {
  args: {
    item: {
      media: DUMMY_IMAGE,
      offset: '0%',
    },
  },
}

export const LandscapeImage: Story = {
  args: {
    item: {
      media: DUMMY_IMAGE,
      offset: '0%',
    },
  },
}
