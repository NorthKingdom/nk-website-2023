import type { Meta, StoryObj } from '@storybook/react'
import { IrregularGrid } from './IrregularGrid'
import { DUMMY_IMAGE } from '@stories/dummy-data'

const meta: Meta<typeof IrregularGrid> = {
  title: 'UI/IrregularGrid',
  component: IrregularGrid,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof IrregularGrid>

export const Default: Story = {
  args: {
    items: [
      { media: DUMMY_IMAGE, caption: 'Image number 1' },
      { media: DUMMY_IMAGE },
      { media: DUMMY_IMAGE },
      { media: DUMMY_IMAGE, caption: 'Image number 4' },
    ],
  },
}
