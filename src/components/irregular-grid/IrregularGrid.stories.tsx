import type { Meta, StoryObj } from '@storybook/react'
import { IrregularGrid } from './IrregularGrid'

const meta: Meta<typeof IrregularGrid> = {
  title: 'UI/IrregularGrid',
  component: IrregularGrid,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof IrregularGrid>

export const Default: Story = {
  args: {
    media: [
      {
        __typename: 'ResponsiveImage',
        desktopImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        mobileImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        altText: '[EXAMPLE] riot image',
      },
      {
        __typename: 'ResponsiveImage',
        desktopImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        mobileImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        altText: '[EXAMPLE] riot image',
      },
      {
        __typename: 'ResponsiveImage',
        desktopImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        mobileImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        altText: '[EXAMPLE] riot image',
      },
      {
        __typename: 'ResponsiveImage',
        desktopImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        mobileImage: {
          url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
        },
        altText: '[EXAMPLE] riot image',
      },
    ],
  },
}
