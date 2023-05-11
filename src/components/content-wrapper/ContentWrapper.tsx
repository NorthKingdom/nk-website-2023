import React from 'react'
import styles from './ContentWrapper.module.scss'
import cx from 'clsx'
import { bemify } from '@/utils/bemify'
const bem = bemify(styles, 'contentWrapper')

interface Props {
  debug?: boolean
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
  fullscreen?: boolean
}

export const ContentWrapper = React.forwardRef<HTMLDivElement, Props>(
  ({ children, debug = false, className = '', style = {}, fullscreen = false }: Props, ref) => {
    return (
      <div
        ref={ref}
        className={cx(styles.contentWrapper, className, bem('', { fullscreen }))}
        style={style}
        data-debug={debug}
      >
        {children}
      </div>
    )
  }
)

ContentWrapper.displayName = 'ContentWrapper'
