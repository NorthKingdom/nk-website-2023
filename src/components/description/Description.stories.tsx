import type { Meta, StoryObj } from '@storybook/react'
import { Description } from './Description'

const meta: Meta<typeof Description> = {
  title: 'UI/Description',
  component: Description,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Description>

export const Default: Story = {
  args: {
    copyRight:
      'From concept to execution, we design experiences, products and services that help our international clients create emotional and meaningful connections between their brand and people.',
  },
}

export const WithLargeHeader: Story = {
  args: {
    copyLeft: 'About us',
    headerSize: 'large',
    copyRight:
      'From concept to execution, we design experiences, products and services that help our international clients create emotional and meaningful connections between their brand and people.',
  },
}

export const WithSmallHeader: Story = {
  args: {
    copyLeft: 'About us',
    headerSize: 'small',
    copyRight:
      'From concept to execution, we design experiences, products and services that help our international clients create emotional and meaningful connections between their brand and people.',
  },
}

export const WithLink: Story = {
  args: {
    copyRight:
      'From concept to execution, we design experiences, products and services that help our international clients create emotional and meaningful connections between their brand and people.',
    link: {
      copy: 'Learn More',
      url: '',
    },
  },
}

export const WithLargeHeaderAndLink: Story = {
  args: {
    copyLeft: 'About us',
    headerSize: 'large',
    copyRight:
      'From concept to execution, we design experiences, products and services that help our international clients create emotional and meaningful connections between their brand and people.',
    link: {
      copy: 'Learn More',
      url: '',
    },
  },
}

export const WithSmallHeaderAndLink: Story = {
  args: {
    copyLeft: 'About us',
    headerSize: 'small',
    copyRight:
      'From concept to execution, we design experiences, products and services that help our international clients create emotional and meaningful connections between their brand and people.',
    link: {
      copy: 'Learn More',
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
