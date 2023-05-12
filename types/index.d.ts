import 'react'

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}

declare global {
  interface Window {
    gtag?: any
    lenis?: any
  }
}

export {}
