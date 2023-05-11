import React from 'react'
import cx from 'clsx'
import styles from './MenuHamburgerButton.module.scss'
import { bemify } from '@utils/bemify'
import { noop } from '@utils/noop'
const bem = bemify(styles, 'menuHamburgerButton')

interface MenuHamburgerButtonProps {
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export const MenuHamburgerButton = ({
  className = '',
  style = {},
  onClick = noop,
  ...props
}: MenuHamburgerButtonProps) => {
  return (
    <button onClick={onClick} className={cx(bem(''), className)} style={style} {...props}>
      <div className={cx(bem('line'))}></div>
      <div className={cx(bem('line'))}></div>
    </button>
  )
}
