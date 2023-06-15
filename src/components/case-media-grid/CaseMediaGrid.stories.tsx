import type { Meta, StoryObj } from '@storybook/react'
import { DUMMY_VIDEO, DUMMY_IMAGE } from '@stories/dummy-data'
import { CaseMediaGrid } from './CaseMediaGrid'

const meta: Meta<typeof CaseMediaGrid> = {
  title: 'UI/CaseMediaGrid',
  component: CaseMediaGrid,
  tags: ['autodocs'],
  parameters: { layout: `fullscreen` },
}

export default meta
type Story = StoryObj<typeof CaseMediaGrid>

export const Default: Story = {
  args: {
    slotOne: {
      media: DUMMY_IMAGE,
      offset: '0%',
    },

    slotTwo: {
      media: DUMMY_IMAGE,
      offset: '0%',
    },
    slotThree: {
      media: DUMMY_IMAGE,
      offset: '0%',
    },
    slotFour: {
      media: DUMMY_IMAGE,
      offset: '0%',
    },
  },
}

export const WithoutTwo: Story = {
  args: {
    slotOne: {
      media: DUMMY_IMAGE,
      offset: `0%`,
    },
    slotThree: {
      media: DUMMY_IMAGE,
      offset: '0%',
    },
    slotFour: {
      media: DUMMY_IMAGE,
      offset: '25%',
    },
  },
}

export const WithOneVideo: Story = {
  args: {
    slotOne: {
      media: DUMMY_IMAGE,
      offset: '0%',
    },

    slotThree: {
      media: {
        ...DUMMY_VIDEO,
        autoPlay: false,
        loop: false,
        muted: true,
      },
      offset: '50%',
    },
    slotFour: {
      media: DUMMY_IMAGE,
      offset: '0%',
    },
  },
}
