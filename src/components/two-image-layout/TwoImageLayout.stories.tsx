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
    leftSrcSet: ['/images/temp-left-riot-img.jpg'],
    leftCaption: 'RiotX Arcane Map',
    rightSrcSet: ['/images/temp-right-riot-img.jpg'],
    rightCaption: 'Gameplay Screens',
    leftAlt: 'Map from RiotX Arcane',
    rightAlt: 'Temp Alt',
  },
}
