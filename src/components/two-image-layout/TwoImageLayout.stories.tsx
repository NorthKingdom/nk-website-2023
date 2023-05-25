import type { Meta, StoryObj } from '@storybook/react'
import { TwoImageLayout } from './TwoImageLayout'

const meta: Meta<typeof TwoImageLayout> = {
  title: 'UI/TwoImageLayout',
  component: TwoImageLayout,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof TwoImageLayout>

export const Default: Story = {
  args: {
    leftSrcSet: {
      __typename: 'ResponsiveImage',
      desktopImage: {
        url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
      },
      mobileImage: {
        url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
      },
      altText: '[EXAMPLE] riot image',
    },
    leftCaption: 'RiotX Arcane Map',
    rightSrcSet: {
      __typename: 'ResponsiveImage',
      desktopImage: {
        url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
      },
      mobileImage: {
        url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
      },
      altText: '[EXAMPLE] riot image',
    },

    rightCaption: 'Gameplay Screens',
    leftAlt: 'Map from RiotX Arcane',
    rightAlt: 'Temp Alt',
  },
}
