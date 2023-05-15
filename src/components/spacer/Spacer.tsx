import React from 'react'
import styles from './Spacer.module.scss'
import cx from 'clsx'
import { isNumber } from '@utils/type-guards'

interface SpacerProps {
  className?: string
  style?: React.CSSProperties
  direction?: 'horizontal' | 'vertical'
  debug?: boolean
  size?: number
}

export const Spacer = ({ className = '', style = {}, direction = 'vertical', debug = false, size }: SpacerProps) => {
  const getSizeStyles = (): React.CSSProperties => {
    if (isNumber(size)) {
      return direction === 'vertical'
        ? {
            height: `${size}px`,
          }
        : {
            width: `${size}px`,
          }
    } else {
      return {}
    }
  }

  const overrideStyles = getSizeStyles()

  return (
    <div
      className={cx(styles.spacer, className)}
      style={{ ...style, ...overrideStyles }}
      data-direction={direction}
      data-debug={debug}
      aria-hidden="true"
    />
  )
}
