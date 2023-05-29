import React from 'react'
import styles from './LoadMore.module.scss'
import { noop } from '@utils/noop'
import cx from 'clsx'

interface LoadMoreProps {
  onClick: () => void
  disabled?: boolean
  style?: React.CSSProperties
  className?: string
  theme?: 'dark' | 'light'
}

export const LoadMore = ({ onClick = noop, theme, disabled = false, style = {}, className = '' }: LoadMoreProps) => {
  return (
    <div className={cx(styles['loadMore'], className)} aria-hidden="true" style={style}>
      <button disabled={disabled} onClick={onClick} data-theme={theme}>
        Load more
      </button>
    </div>
  )
}
