import type { Meta, StoryObj } from '@storybook/react'
import { Slideshow } from './Slideshow'
import { DUMMY_IMAGE, DUMMY_IMAGE_ALT_1, DUMMY_IMAGE_ALT_2 } from '@stories/dummy-data'

const meta: Meta<typeof Slideshow> = {
  title: 'UI/Slideshow',
  component: Slideshow,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof Slideshow>

const srcSet = [DUMMY_IMAGE, DUMMY_IMAGE_ALT_1, DUMMY_IMAGE_ALT_2]

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
