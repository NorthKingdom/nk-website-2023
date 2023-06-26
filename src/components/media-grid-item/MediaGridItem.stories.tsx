import { DUMMY_IMAGE, DUMMY_VIDEO } from '@stories/dummy-data'
import { MediaGridItem } from './MediaGridItem'
import type { Meta, StoryObj } from '@storybook/react'

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
      __typename: 'MediaGridItem',
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
      __typename: 'MediaGridItem',
      media: DUMMY_IMAGE,
      offset: '0%',
    },
  },
}

export const LandscapeImage: Story = {
  args: {
    item: {
      __typename: 'MediaGridItem',
      media: DUMMY_IMAGE,
      offset: '0%',
    },
  },
}
