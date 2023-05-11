import React from 'react'
import { AspectRatio } from './AspectRatio'

export default {
  title: 'UI/AspectRatio',
}

const DisplayUI = ({ label }: { label: string }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--color-black-50)',
        color: 'var(--color-black)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h3>{label}</h3>
    </div>
  )
}

export const Default = (args: any) => (
  <AspectRatio ratio={16 / 9}>
    <DisplayUI label="16:9" />
  </AspectRatio>
)

export const WithSpecificWidth = (args: any) => (
  <AspectRatio style={{ width: '300px', margin: '0 auto' }} ratio={16 / 9}>
    <DisplayUI label="16:9" />
  </AspectRatio>
)

export const WithMaxHeight = (args: any) => (
  <AspectRatio ratio={16 / 9} maxHeight="300px">
    <DisplayUI label="16:9 with max height 300px" />
  </AspectRatio>
)
