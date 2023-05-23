import type { Meta, StoryObj } from '@storybook/react'
import { CaseHero } from './CaseHero'

const meta: Meta<typeof CaseHero> = {
  title: 'UI/CaseHero',
  component: CaseHero,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof CaseHero>

export const Default: Story = {
  args: {
    client: 'Riot',
    caseName: 'RiotX Arcane',
    src: {
      muted: true,
      autoPlay: true,
      loop: true,
      posterImage: {
        url: '/dummy/showreelposter.jpg',
      },
      mobileVideoCollection: { items: [] },
      desktopVideoCollection: {
        items: [
          {
            url: '/dummy/showreel23.mp4',
          },
        ],
      },
    },
    isVideoAsset: true,
  },
}
