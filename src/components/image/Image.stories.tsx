import type { Meta, StoryObj } from '@storybook/react'
import { Image } from './Image'

const meta: Meta<typeof Image> = {
  title: 'UI/Image',
  component: Image,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Image>

export const Default: Story = {
  args: {
    srcSet: ['/dummy/showreelposter.jpg'],
    alt: 'temp alt',
  },
}

export const WithCaption: Story = {
  args: {
    srcSet: ['/dummy/showreelposter.jpg'],
    alt: 'temp alt',
    caption: 'Example caption for the fullscreen image',
  },
}
