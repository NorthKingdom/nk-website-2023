import type { Meta, StoryObj } from '@storybook/react'
import { PageHero } from './PageHero'
import { DUMMY_IMAGE } from '@stories/dummy-data'

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
    srcSet: DUMMY_IMAGE,
  },
}
