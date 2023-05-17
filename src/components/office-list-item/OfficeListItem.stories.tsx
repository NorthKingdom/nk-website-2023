import type { Meta, StoryObj } from '@storybook/react'
import { OfficeListItem } from './OfficeListItem'

const meta: Meta<typeof OfficeListItem> = {
  title: 'UI/OfficeListItem',
  component: OfficeListItem,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof OfficeListItem>

export const Stockholm: Story = {
  args: {
    officeName: 'Stockholm',
    addressLineOne: 'Tulegatan 13',
    addressLineTwo: 'Stockholm 113 53',
    country: 'Sweden',
    directionsLink: 'https://www.maps.google.com',
  },
}

export const Skellefteå: Story = {
  args: {
    officeName: 'Skellefteå',
    addressLineOne: 'Storgatan 32',
    addressLineTwo: 'Skellefteå 931 31',
    country: 'Sweden',
    directionsLink: 'https://www.maps.google.com',
  },
}

export const Barcelona: Story = {
  args: {
    officeName: 'Barcelona',
    addressLineOne: 'Carrer del Consell de Cent 413-415',
    addressLineTwo: 'Barcelona 08009',
    country: 'Spain',
    directionsLink: 'https://www.maps.google.com',
  },
}
