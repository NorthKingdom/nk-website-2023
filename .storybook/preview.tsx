import '@styles/reset.css'
import '@styles/globals.scss'
import type { Preview } from '@storybook/react'
import React, { useEffect } from 'react'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export const decorators = [
  (StoryFn, options) => {
    useEffect(() => {
      const theme = options.parameters?.theme ?? 'light'
      document.documentElement.setAttribute('data-theme', theme)
    }, [])

    return <StoryFn />
  },
]

export default preview
