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
      { __typename: 'IrregularGridItem', media: DUMMY_IMAGE, caption: 'Image number 1' },
      { __typename: 'IrregularGridItem', media: DUMMY_IMAGE },
      { __typename: 'IrregularGridItem', media: DUMMY_IMAGE },
      { __typename: 'IrregularGridItem', media: DUMMY_IMAGE, caption: 'Image number 4' },
    ],
  },
}
