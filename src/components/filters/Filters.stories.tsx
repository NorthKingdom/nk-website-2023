/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import * as Filters from './Filters'
import styles from './Filters.stories.module.scss'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Filters.Root> = {
  title: 'UI/Filters',
  component: Filters.Root,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof Filters.Root>

export const Default: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState<string>('1')

    return (
      <>
        <div>Current value is: {value}</div>
        <Filters.Root {...args} defaultValue={value} onValueChange={setValue}>
          <Filters.Item value="1" className={styles.filterItem}>
            1
          </Filters.Item>
          <Filters.Item value="2" className={styles.filterItem}>
            2
          </Filters.Item>
          <Filters.Item value="3" className={styles.filterItem}>
            3
          </Filters.Item>
        </Filters.Root>
      </>
    )
  },
}
