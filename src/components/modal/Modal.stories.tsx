/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import { Modal } from './Modal'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {},
  render: () => {
    const [visible, setVisible] = React.useState(false)

    useEffect(() => {}, [])

    return (
      <>
        <button onClick={() => setVisible(true)}>Open modal</button>
        <Modal visible={visible}>
          <button onClick={() => setVisible(false)}>Close</button>
        </Modal>
      </>
    )
  },
}
