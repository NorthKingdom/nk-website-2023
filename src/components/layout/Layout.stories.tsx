import type { Meta, StoryObj } from '@storybook/react'
import { Layout } from './Layout'

const meta: Meta<typeof Layout> = {
  title: 'UI/Layout',
  component: Layout,
  parameters: {},
}

export default meta
type Story = StoryObj<typeof Layout>

export const LightMode: Story = {
  args: {},
  render: () => (
    <Layout>
      <div
        style={{
          backgroundColor: 'var(--color-bg)',
          padding: '20px 0',
          color: 'var(--color-fg)',
          marginTop: '80px',
        }}
      >
        <h1>Content goes here</h1>
      </div>
    </Layout>
  ),
}

export const DarkMode: Story = {
  parameters: { theme: 'dark' },
  args: {},
  render: () => (
    <Layout>
      <div
        style={{
          backgroundColor: 'var(--color-bg)',
          padding: '20px 0',
          color: 'var(--color-fg)',
          marginTop: '80px',
        }}
      >
        <h1>Content goes here</h1>
      </div>
    </Layout>
  ),
}
