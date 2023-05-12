import type { Meta, StoryObj } from '@storybook/react'
import { List } from './List'

const meta: Meta<typeof List> = {
  title: 'UI/List',
  component: List,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof List<any>>

const items = Array.from({ length: 10 }, (_, i) => ({ label: String(i) }))
const renderItem = ({ label }: { label: string }) => <div>{label}</div>

export const Default: Story = {
  args: {
    items,
    renderItem,
  },
}

export const DarkTheme: Story = {
  parameters: { theme: 'dark' },
  args: {
    items,
    renderItem,
  },
  render: () => (
    <List
      style={{
        '--list-color': 'white',
      }}
      items={items}
      renderItem={renderItem}
    />
  ),
}

const complexItems = Array.from({ length: 10 }, (_, i) => ({
  year: 2010 + i,
  project: `Project ${i}`,
  description: `Description ${i}`,
}))

const renderComplexItem = ({ year, project, description }: (typeof complexItems)[0]) => (
  <div style={{ display: 'flex', width: '100%' }}>
    <div style={{ marginRight: '20px', width: '80px' }}>{year}</div>
    <div>{project}</div>
    <div style={{ marginLeft: 'auto' }}>{description}</div>
  </div>
)

export const ComplexItems: Story = {
  args: {
    items: complexItems,
    renderItem: renderComplexItem,
  },
}
