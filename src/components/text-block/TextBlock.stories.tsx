import type { Meta, StoryObj } from '@storybook/react'
import { TextBlock } from './TextBlock'

const meta: Meta<typeof TextBlock> = {
  title: 'UI/TextBlock',
  component: TextBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof TextBlock>

export const Default: Story = {
  args: {
    copyRight:
      'From concept to execution, we design experiences, products and services that help our international clients create emotional and meaningful connections between their brand and people.',
  },
}

export const WithHeading: Story = {
  args: {
    heading: 'This is a heading',
    copyLeft: 'About us',
    copyRight:
      'From concept to execution, we design experiences, products and services that help our international clients create emotional and meaningful connections between their brand and people.',
  },
}

export const WithLink: Story = {
  args: {
    copyRight:
      'From concept to execution, we design experiences, products and services that help our international clients create emotional and meaningful connections between their brand and people.',
    link: {
      copy: 'Click me ↗',
      url: '#',
    },
  },
}

export const WithHeadingAndLink: Story = {
  args: {
    copyLeft: 'About us',
    heading: 'Large Heading',
    copyRight:
      'From concept to execution, we design experiences, products and services that help our international clients create emotional and meaningful connections between their brand and people.',
    link: {
      copy: 'Click me ↗',
      url: '',
    },
  },
}

export const WithTextOnLeft: Story = {
  args: {
    copyLeft:
      'From concept to execution, we design experiences, products and services that help our international clients create emotional and meaningful connections between their brand and people.',
  },
}
