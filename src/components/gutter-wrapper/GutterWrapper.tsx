import React from 'react'
import styles from './GutterWrapper.module.scss'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'gutterWrapper')

interface GutterWrapperProps {
  children: JSX.Element | JSX.Element[]
  style?: React.CSSProperties
  size: 'small' | 'medium' | 'large'
  theme?: 'light' | 'dark'
}

export const GutterWrapper = ({ children, size, style, theme }: GutterWrapperProps) => {
  return (
    <div data-size={size} data-theme={theme} className={styles['gutterWrapper']} style={style}>
      {children}
    </div>
  )
}
