import type { Meta, StoryObj } from '@storybook/react'
import { Slideshow } from './Slideshow'

const meta: Meta<typeof Slideshow> = {
  title: 'UI/Slideshow',
  component: Slideshow,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof Slideshow>

const srcSet = [
  {
    __typename: 'ResponsiveImage' as const,
    desktopImage: {
      url: '/dummy/temp-left-riot-img.jpg',
    },
    mobileImage: {
      url: '/dummy/temp-left-riot-img.jpg',
    },
    altText: 'temp alt',
    imageCaption: 'temp caption 1',
  },
  {
    __typename: 'ResponsiveImage' as const,
    desktopImage: {
      url: '/dummy/temp-right-riot-img.jpg',
    },
    mobileImage: {
      url: '/dummy/temp-right-riot-img.jpg',
    },
    altText: 'temp alt',
    imageCaption: 'temp caption 2',
  },
  {
    __typename: 'ResponsiveImage' as const,
    desktopImage: {
      url: '/dummy/temp-riot-right-image-2.jpg',
    },
    mobileImage: {
      url: '/dummy/temp-riot-right-image-2.jpg',
    },
    altText: 'temp alt',
    imageCaption: 'temp caption 3',
  },
]

export const Default: Story = {
  args: {
    automaticallyChange: true,
    showIndicators: false,
    showArrows: false,
    showCaption: false,
    srcSet: srcSet,
  },
}

export const WithCaptions: Story = {
  args: {
    automaticallyChange: true,
    showIndicators: false,
    showArrows: false,
    showCaption: true,
    srcSet: srcSet,
  },
}

export const CanManuallyChangeSlides: Story = {
  args: {
    automaticallyChange: true,
    showIndicators: true,
    showArrows: true,
    showCaption: false,
    srcSet: srcSet,
  },
}

export const CanChangeSlidesWithCaptions: Story = {
  args: {
    automaticallyChange: true,
    showIndicators: true,
    showArrows: true,
    showCaption: true,
    srcSet: srcSet,
  },
}
