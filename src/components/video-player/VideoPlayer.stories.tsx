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
      __typename: 'Video',

      desktopVideoCollection: {
        items: [
          {
            contentType: 'video/mp4',
            url: 'https://videos.ctfassets.net/vwfx2n1hr26h/3zwFhCKXIUlzPlzSaTGxO8/1ad6725f1c0344b6a65a6ecb364270a1/MasterClash-Cover.mp4',
          },
        ],
      },
      mobileVideoCollection: {
        items: [],
      },
      posterImage: {
        url: 'https://images.ctfassets.net/vwfx2n1hr26h/JKz0VPSPjmlmBWemMJEYL/099bec4f033daa34a345fa77afd561f4/masterclash_thumbnail_mobile.jpg',
      },
      autoPlay: false,
      loop: false,
      muted: true,
    },
  },
}
