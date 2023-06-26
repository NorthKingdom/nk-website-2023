import { DUMMY_IMAGE } from '@stories/dummy-data'
import { TwoImageLayout } from './TwoImageLayout'
import type { Meta, StoryObj } from '@storybook/react'

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
    leftSrcSet: DUMMY_IMAGE,
    leftCaption: 'RiotX Arcane Map',
    rightSrcSet: DUMMY_IMAGE,
    rightCaption: 'Gameplay Screens',
    leftAlt: 'Map from RiotX Arcane',
    rightAlt: 'Temp Alt',
  },
}
