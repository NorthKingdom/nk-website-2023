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
    copy: 'From concept to execution, we design experiences, products and services that help our international clients create emotional and meaningful connections between their brand and people.',
  },
}

export const WithLargeHeader: Story = {
  args: {
    header: 'About us',
    headerSize: 'large',
    copy: 'From concept to execution, we design experiences, products and services that help our international clients create emotional and meaningful connections between their brand and people.',
  },
}

export const WithSmallHeader: Story = {
  args: {
    header: 'About us',
    headerSize: 'small',
    copy: 'From concept to execution, we design experiences, products and services that help our international clients create emotional and meaningful connections between their brand and people.',
  },
}

export const WithLink: Story = {
  args: {
    copy: 'From concept to execution, we design experiences, products and services that help our international clients create emotional and meaningful connections between their brand and people.',
    link: {
      text: 'Learn More',
      href: '',
    },
  },
}

export const WithLargeHeaderAndLink: Story = {
  args: {
    header: 'About us',
    headerSize: 'large',
    copy: 'From concept to execution, we design experiences, products and services that help our international clients create emotional and meaningful connections between their brand and people.',
    link: {
      text: 'Learn More',
      href: '',
    },
  },
}

export const WithSmallHeaderAndLink: Story = {
  args: {
    header: 'About us',
    headerSize: 'small',
    copy: 'From concept to execution, we design experiences, products and services that help our international clients create emotional and meaningful connections between their brand and people.',
    link: {
      text: 'Learn More',
      href: '',
    },
  },
}
