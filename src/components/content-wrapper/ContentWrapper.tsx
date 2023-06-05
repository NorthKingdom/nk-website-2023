import React from 'react'
import styles from './ContentWrapper.module.scss'
import cx from 'clsx'
import { bemify } from '@/utils/bemify'
const bem = bemify(styles, 'contentWrapper')

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  debug?: boolean
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
  fullscreen?: boolean
  as?: React.ElementType
}

export const ContentWrapper = React.forwardRef<HTMLDivElement, Props>(
  ({ children, debug = false, className = '', style = {}, as = 'div', fullscreen = false, ...props }: Props, ref) => {
    const Tag = as

    return (
      <Tag
        ref={ref}
        aria-hidden={true}
        className={cx(styles.contentWrapper, className, bem('', { fullscreen }))}
        style={style}
        data-debug={debug}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)

ContentWrapper.displayName = 'ContentWrapper'
