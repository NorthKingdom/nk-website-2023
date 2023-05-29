import type { Meta, StoryObj } from '@storybook/react'
import { MediaGridItem } from './MediaGridItem'

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
      offset: '0%',
    },
  },
}

export const Image: Story = {
  args: {
    item: {
      media: {
        __typename: 'ResponsiveImage',
        desktopImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        mobileImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        altText: '[EXAMPLE] riot image',
      },
      offset: '0%',
    },
  },
}

export const LandscapeImage: Story = {
  args: {
    item: {
      media: {
        __typename: 'ResponsiveImage',
        desktopImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        mobileImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        altText: '[EXAMPLE] riot image',
      },
      offset: '0%',
    },
  },
}
