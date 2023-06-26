import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'
import cx from 'clsx'
import { useIsSSR } from '@hooks/use-is-ssr'
import { noop } from '@utils/noop'
import styles from './Modal.module.scss'

interface ModalProps extends HTMLMotionProps<'div'> {
  visible: boolean
  onOpen?: () => void
  onClose?: () => void
  children: React.ReactNode
}

export const Modal = ({ visible, onOpen = noop, onClose = noop, className = '', children, ...props }: ModalProps) => {
  const visiblePrev = React.useRef(visible)

  useEffect(() => {
    if (visible && !visiblePrev.current) {
      onOpen()
    } else if (!visible && visiblePrev.current) {
      onClose()
    }

    visiblePrev.current = visible
  }, [visible, onClose, onOpen])

  const isSSR = useIsSSR()

  if (isSSR) return null

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          className={cx(styles['modal'], className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
