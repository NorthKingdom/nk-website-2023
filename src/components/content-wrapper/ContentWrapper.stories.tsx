import React from 'react'
import { ContentWrapper } from './ContentWrapper'

export default {
  title: 'UI Components/ContentWrapper',
  parameters: {
    layout: 'fullscreen',
  },
}

export const Default = (args: any) => (
  <ContentWrapper debug={true}>
    <div style={{ width: '100%', height: '400px', background: 'red' }}></div>
  </ContentWrapper>
)

export const Fullscreen = (args: any) => (
  <ContentWrapper debug={true} fullscreen={true}>
    <div style={{ width: '100%', height: '400px', background: 'red' }}></div>
  </ContentWrapper>
)
