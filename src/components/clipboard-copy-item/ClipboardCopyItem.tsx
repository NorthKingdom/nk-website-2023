import React from 'react'
import styles from './ClipboardCopyItem.module.scss'
import cx from 'clsx'
import type { ClipboardCopyItemPayload } from '@customTypes/cms'
import { useState, useRef } from 'react'
import { useIsTouchDevice } from '@hooks/use-is-touch-device'

interface ClipboardCopyItemProps
  extends ClipboardCopyItemPayload,
    Omit<React.HTMLAttributes<HTMLAnchorElement>, 'content'> {}

export const ClipboardCopyItem = ({
  label,
  content,
  hoverLabel,
  confirmationLabel,
  className = '',
  ...props
}: ClipboardCopyItemProps) => {
  const [hovered, setHovered] = useState(false)
  const [showConfirmationLabel, setShowConfirmationLabel] = useState(false)
  const isTouchDevice = useIsTouchDevice()
  const hasHoverLabel = !!hoverLabel
  const hasConfirmationLabel = !!confirmationLabel

  function getLabel() {
    if (hasConfirmationLabel && showConfirmationLabel) return confirmationLabel
    if (hasHoverLabel && hovered) return hoverLabel
    return label
  }

  const confirmationLabelTimeout = useRef<NodeJS.Timeout>()
  function startConfirmationLabelTimeout() {
    if (confirmationLabelTimeout.current) clearTimeout(confirmationLabelTimeout.current)
    confirmationLabelTimeout.current = setTimeout(() => {
      setShowConfirmationLabel(false)
    }, 1500)
  }

  return (
    <a
      data-show-confirmation-label={showConfirmationLabel}
      className={cx(styles['clipboardCopyItem'], className)}
      onMouseEnter={() => {
        if (isTouchDevice) return
        setHovered(true)
      }}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        e.preventDefault()
        navigator.clipboard.writeText(content as string)
        setShowConfirmationLabel(true)
        startConfirmationLabelTimeout()
      }}
      {...props}
    >
      <span>{getLabel()}</span>
    </a>
  )
}
