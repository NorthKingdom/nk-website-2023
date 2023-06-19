import type { Meta, StoryObj } from '@storybook/react'
import { FeaturedVideo } from './FeaturedVideo'
import { DUMMY_VIDEO } from '@stories/dummy-data'

const meta: Meta<typeof FeaturedVideo> = {
  title: 'UI/FeaturedVideo',
  component: FeaturedVideo,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof FeaturedVideo>

export const Default: Story = {
  args: {
    title: 'Featured Video',
    description: 'This is a featured video',
    video: DUMMY_VIDEO,
  },
}