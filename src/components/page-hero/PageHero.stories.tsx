import type { Meta, StoryObj } from '@storybook/react'
import { PageHero } from './PageHero'

const meta: Meta<typeof PageHero> = {
  title: 'UI/PageHero',
  component: PageHero,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof PageHero>

export const Default: Story = {
  args: {
    title: 'Be apart of our kingdom',
    srcSet: {
      __typename: 'ResponsiveImage',
      desktopImage: {
        url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
      },
      mobileImage: {
        url: 'https://images.ctfassets.net/vwfx2n1hr26h/67sMVkJnjGprntMS5xD6ru/daff5bfdad6546d3a12b6281a627e6a6/riot_thumbnail_mobile.jpg',
      },
      altText: '[EXAMPLE] riot image',
    },
  },
}
