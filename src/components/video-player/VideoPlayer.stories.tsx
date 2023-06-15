import type { Meta, StoryObj } from '@storybook/react'
import { VideoPlayer } from './VideoPlayer'
import { DUMMY_VIDEO } from '@stories/dummy-data'

const meta: Meta<typeof VideoPlayer> = {
  title: 'UI/VideoPlayer',
  component: VideoPlayer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof VideoPlayer>

export const Default: Story = {
  args: {
    src: {
      ...DUMMY_VIDEO,
      autoPlay: false,
      loop: false,
      muted: true,
    },
  },
}
