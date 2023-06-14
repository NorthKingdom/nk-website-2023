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
  notch?: boolean
  theme?: 'light' | 'dark' | 'transparent'
  as?: React.ElementType
}

export const ContentWrapper = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      debug = false,
      className = '',
      style = {},
      as = 'div',
      fullscreen = false,
      notch = false,
      theme = 'light',
      ...props
    }: Props,
    ref
  ) => {
    const Tag = as

    return (
      <Tag
        ref={ref}
        role="presentation"
        className={cx(styles.contentWrapper, className, bem('', { fullscreen }))}
        style={style}
        data-debug={debug}
        data-theme={theme}
        data-use-notch={notch}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)

ContentWrapper.displayName = 'ContentWrapper'
