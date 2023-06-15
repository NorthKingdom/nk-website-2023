import type { Meta, StoryObj } from '@storybook/react'
import { Media } from './Media'
import { AspectRatio } from '@components/aspect-ratio/AspectRatio'
import { DUMMY_VIDEO, DUMMY_IMAGE } from '@stories/dummy-data'

const meta: Meta<typeof Media> = {
  title: 'UI/Media',
  component: Media,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof Media>

export const Image: Story = {
  args: {
    ...DUMMY_IMAGE,
  },
  render: (args) => (
    <AspectRatio ratio={16 / 10} style={{ width: '400px' }}>
      <Media {...args} width={400} height={(400 * 10) / 16} />
    </AspectRatio>
  ),
}

export const Video: Story = {
  args: {
    ...DUMMY_VIDEO,
    autoPlay: false,
    loop: false,
    muted: true,
  },
  render: (args) => (
    <AspectRatio ratio={16 / 10} style={{ width: '400px' }}>
      <Media {...args} autoPlay={true} controls={false} playsInline />
    </AspectRatio>
  ),
}
