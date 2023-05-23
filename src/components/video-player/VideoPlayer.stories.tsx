import type { Meta, StoryObj } from '@storybook/react'
import { VideoPlayer } from './VideoPlayer'

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
      muted: true,
      loop: true,
      autoPlay: true,
      mobileVideoCollection: { items: [] },
      desktopVideoCollection: {
        items: [
          {
            url: '/dummy/showreel23.mp4',
          },
        ],
      },
      posterImage: { url: '/dummy/showreel-poster.jpg' },
    },
  },
}
