import React from 'react'
import styles from './CloseButton.module.scss'
import cx from 'clsx'
import { noop } from '@utils/noop'

interface CloseButtonProps {
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
  onClick: () => void
}

export const CloseButton = ({ className = '', style = {}, disabled = false, onClick = noop }: CloseButtonProps) => {
  return (
    <button
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
    </button>
  )
}
