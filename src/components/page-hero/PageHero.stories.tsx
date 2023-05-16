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
      desktopImage: {
        url: '/dummy/temp-riot-hero-image.jpg',
      },
      mobileImage: {
        url: '/dummy/temp-riot-hero-image.jpg',
      },
      altText: 'temp alt',
    },
  },
}
