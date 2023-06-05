import type { Meta, StoryObj } from '@storybook/react'
import { Media } from './Media'
import { AspectRatio } from '@components/aspect-ratio/AspectRatio'

const VIDEO_PAYLOAD = {
  __typename: 'Video' as const,
  sys: {
    __typename: 'Sys',
    id: '1D7wC2kTOZdbBMe9WdZzXw',
  },
  desktopVideoCollection: {
    __typename: 'AssetCollection',
    items: [
      {
        __typename: 'Asset',
        contentType: 'video/mp4',
        url: 'https://videos.ctfassets.net/vwfx2n1hr26h/3zwFhCKXIUlzPlzSaTGxO8/1ad6725f1c0344b6a65a6ecb364270a1/MasterClash-Cover.mp4',
      },
    ],
  },
  mobileVideoCollection: {
    __typename: 'AssetCollection',
    items: [],
  },
  posterImage: {
    __typename: 'Asset',
    url: 'https://images.ctfassets.net/vwfx2n1hr26h/JKz0VPSPjmlmBWemMJEYL/099bec4f033daa34a345fa77afd561f4/masterclash_thumbnail_mobile.jpg',
  },
  autoPlay: false,
  loop: false,
  muted: true,
}

const IMAGE_PAYLOAD = {
  __typename: 'ResponsiveImage' as const,
  desktopImage: {
    __typename: 'Asset',
    url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
  },
  mobileImage: {
    __typename: 'Asset',
    url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
  },
  imageCaption: undefined,
  altText: '[EXAMPLE] riot image',
}

const meta: Meta<typeof Media> = {
  title: 'UI/Media',
  component: Media,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof Media>

export const Image: Story = {
  args: {
    ...IMAGE_PAYLOAD,
  },
  render: (args) => (
    <AspectRatio ratio={16 / 10} style={{ width: '400px' }}>
      <Media {...args} width={400} height={(400 * 10) / 16} />
    </AspectRatio>
  ),
}

export const Video: Story = {
  args: {
    ...VIDEO_PAYLOAD,
  },
  render: (args) => (
    <AspectRatio ratio={16 / 10} style={{ width: '400px' }}>
      <Media {...args} autoPlay={true} controls={false} playsInline />
    </AspectRatio>
  ),
}
