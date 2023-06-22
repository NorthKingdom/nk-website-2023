import React from 'react'
import cx from 'clsx'
import { noop } from '@utils/noop'
import styles from './LoadMore.module.scss'

interface LoadMoreProps {
  onClick: () => void
  disabled?: boolean
  style?: React.CSSProperties
  className?: string
  theme?: 'dark' | 'light'
}

export const LoadMore = ({ onClick = noop, theme, disabled = false, style = {}, className = '' }: LoadMoreProps) => {
  return (
    <div className={cx(styles['loadMore'], className)} role="presentation" style={style}>
      <button disabled={disabled} onClick={onClick} data-theme={theme}>
        Load more
      </button>
    </div>
  )
}
