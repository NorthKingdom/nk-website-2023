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
      desktopImage: {
        url: '/dummy/showreelposter.jpg',
      },
      mobileImage: {
        url: '/dummy/showreelposter.jpg',
      },
      altText: 'temp alt',
    },
    leftCaption: 'RiotX Arcane Map',
    rightSrcSet: {
      desktopImage: {
        url: '/dummy/temp-right-riot-img.jpg',
      },
      mobileImage: {
        url: '/dummy/temp-right-riot-img.jpg',
      },
      altText: 'temp alt',
    },

    rightCaption: 'Gameplay Screens',
    leftAlt: 'Map from RiotX Arcane',
    rightAlt: 'Temp Alt',
  },
}
