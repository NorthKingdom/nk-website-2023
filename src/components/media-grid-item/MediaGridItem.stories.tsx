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
        muted: true,
        autoPlay: true,
        loop: true,
        posterImage: {
          url: `/dummy/showreelposter.jpg`,
        },
        desktopVideoCollection: {
          items: [
            {
              url: `/dummy/showreel23.mp4`,
            },
          ],
        },
        mobileVideoCollection: {
          items: [
            {
              url: `/dummy/showreel23.mp4`,
            },
          ],
        },
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
          url: `/dummy/portrait-media.jpg`,
        },
        mobileImage: {
          url: `/dummy/portrait-media.jpg`,
        },
        altText: 'temp alt',
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
          url: `/dummy/landscape-media.jpg`,
        },
        mobileImage: {
          url: `/dummy/landscape-media.jpg`,
        },
        altText: 'temp alt',
      },
      offset: '0%',
    },
  },
}
