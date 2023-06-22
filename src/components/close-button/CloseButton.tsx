import React from 'react'
import cx from 'clsx'
import { noop } from '@utils/noop'
import styles from './CloseButton.module.scss'

interface CloseButtonProps {
  as?: React.ElementType
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
  onClick: () => void
  [key: string]: any
}

export const CloseButton = ({
  className = '',
  style = {},
  disabled = false,
  onClick = noop,
  as = 'button',
}: CloseButtonProps) => {
  const Tag = as
  return (
    <Tag
      className={cx(styles['closeButton'], className)}
      style={style}
      data-disabled={disabled}
      onClick={onClick}
      aria-label="Close button"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" />
        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" />
      </svg>
    </Tag>
  )
}
