import { PageHeroTitle } from './PageHeroTitle'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof PageHeroTitle> = {
  title: 'UI/PageHeroTitle',
  component: PageHeroTitle,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof PageHeroTitle>

export const Default: Story = { args: {} }
