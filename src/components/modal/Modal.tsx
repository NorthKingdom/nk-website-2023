import React, { useEffect } from 'react'
import styles from './Modal.module.scss'
import { noop } from '@utils/noop'

interface ModalProps {
  visible: boolean
  onOpen?: () => void
  onClose?: () => void
  children: React.ReactNode
}

export const Modal = ({ visible, onOpen = noop, onClose = noop, children }: ModalProps) => {
  const visiblePrev = React.useRef(visible)

  useEffect(() => {
    if (visible && !visiblePrev.current) {
      onOpen()
    } else if (!visible && visiblePrev.current) {
      onClose()
    }

    visiblePrev.current = visible
  }, [visible, onClose, onOpen])

  return <>{visible && <div className={styles['modal']}>{children}</div>}</>
}
