import { DUMMY_VIDEO } from '@stories/dummy-data'
import { CaseHero } from './CaseHero'
import type { Meta, StoryObj } from '@storybook/react'

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
    media: DUMMY_VIDEO,
  },
}
