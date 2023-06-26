import React, { useState, useRef } from 'react'
import { bemify } from '@utils/bemify'
import { useIsTouchDevice } from '@hooks/use-is-touch-device'
import styles from './MenuContactItem.module.scss'
import type { MenuContactItem as MenuContactItemData } from '../Menu.types'

const bem = bemify(styles, 'menuContactItem')

interface MenuContactItemProps extends Partial<MenuContactItemData> {
  children?: React.ReactNode
}

export const MenuContactItem = ({
  hoverLabel,
  confirmationLabel,
  copyToClipboard = false,
  children,
  ...props
}: MenuContactItemProps) => {
  const [hovered, setHovered] = useState(false)
  const [showConfirmationLabel, setShowConfirmationLabel] = useState(false)
  const isTouchDevice = useIsTouchDevice()
  const hasHoverLabel = !!hoverLabel
  const hasConfirmationLabel = !!confirmationLabel
  const confirmationLabelTimeout = useRef<NodeJS.Timeout>()

  function getLabel() {
    if (hasConfirmationLabel && showConfirmationLabel) return confirmationLabel
    if (hasHoverLabel && hovered) return hoverLabel
    return children
  }

  function startConfirmationLabelTimeout() {
    if (confirmationLabelTimeout.current) clearTimeout(confirmationLabelTimeout.current)
    confirmationLabelTimeout.current = setTimeout(() => {
      setShowConfirmationLabel(false)
    }, 1500)
  }

  return (
    <a
      className={bem()}
      data-show-confirmation-label={showConfirmationLabel}
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
      onMouseEnter={() => {
        if (isTouchDevice) return
        setHovered(true)
      }}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        if (copyToClipboard) {
          e.preventDefault()
          navigator.clipboard.writeText(children as string)
        }

        if (!!confirmationLabel) {
          setShowConfirmationLabel(true)
          startConfirmationLabelTimeout()
        }
      }}
      {...props}
    >
      <span>{getLabel()}</span>
    </a>
  )
}
