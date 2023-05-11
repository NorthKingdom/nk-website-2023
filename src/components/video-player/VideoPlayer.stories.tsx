import type { Meta, StoryObj } from '@storybook/react'
import { VideoPlayer } from './VideoPlayer'

const meta: Meta<typeof VideoPlayer> = {
  title: 'UI/VideoPlayer',
  component: VideoPlayer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof VideoPlayer>

export const Default: Story = {
  args: {
    src: [{ url: '/dummy/showreel23.mp4' }],
    poster: '/dummy/showreel-poster.jpg',
    autoPlay: true,
  },
}
