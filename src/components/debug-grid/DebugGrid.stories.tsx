import React from 'react'
import { DebugGrid } from './DebugGrid'

export default {
  title: 'UI Components/DebugGrid',
  parameters: {
    layout: 'fullscreen',
  },
}

export const Default = (args: any) => <DebugGrid showInstructions />
