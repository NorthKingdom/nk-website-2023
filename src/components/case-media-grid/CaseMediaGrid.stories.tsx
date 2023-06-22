import { DUMMY_VIDEO, DUMMY_IMAGE } from '@stories/dummy-data'
import { CaseMediaGrid } from './CaseMediaGrid'
import type { Meta, StoryObj } from '@storybook/react'

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
      __typename: 'MediaGridItem',
      media: DUMMY_IMAGE,
      offset: '0%',
    },

    slotTwo: {
      __typename: 'MediaGridItem',
      media: DUMMY_IMAGE,
      offset: '0%',
    },
    slotThree: {
      __typename: 'MediaGridItem',
      media: DUMMY_IMAGE,
      offset: '0%',
    },
    slotFour: {
      __typename: 'MediaGridItem',
      media: DUMMY_IMAGE,
      offset: '0%',
    },
  },
}

export const WithoutTwo: Story = {
  args: {
    slotOne: {
      __typename: 'MediaGridItem',
      media: DUMMY_IMAGE,
      offset: `0%`,
    },
    slotThree: {
      __typename: 'MediaGridItem',
      media: DUMMY_IMAGE,
      offset: '0%',
    },
    slotFour: {
      __typename: 'MediaGridItem',
      media: DUMMY_IMAGE,
      offset: '25%',
    },
  },
}

export const WithOneVideo: Story = {
  args: {
    slotOne: {
      __typename: 'MediaGridItem',
      media: DUMMY_IMAGE,
      offset: '0%',
    },

    slotThree: {
      __typename: 'MediaGridItem',
      media: {
        ...DUMMY_VIDEO,
        autoPlay: false,
        loop: false,
        muted: true,
      },
      offset: '50%',
    },
    slotFour: {
      __typename: 'MediaGridItem',
      media: DUMMY_IMAGE,
      offset: '0%',
    },
  },
}
