import React from 'react'
import styles from './GutterWrapper.module.scss'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'gutterWrapper')

interface GutterWrapperProps {
  children: JSX.Element | JSX.Element[]
  size: 'small' | 'medium' | 'large'
}

export const GutterWrapper = ({ children, size }: GutterWrapperProps) => {
  return (
    <div data-size={size} className={styles['gutterWrapper']}>
      {children}
    </div>
  )
}
