import { DUMMY_IMAGE } from '@stories/dummy-data'
import { PageHero } from './PageHero'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof PageHero> = {
  title: 'UI/PageHero',
  component: PageHero,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof PageHero>

export const Default: Story = {
  args: {
    title: 'Be apart of our kingdom',
    image: DUMMY_IMAGE,
  },
}
