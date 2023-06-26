import Link from 'next/link'
import React from 'react'
import { Arrow } from '@components/arrow'
import { bemify } from '@utils/bemify'
import { noop } from '@utils/noop'
import styles from './MenuNavItem.module.scss'
const bem = bemify(styles, 'menuNavItem')

interface MenuNavItemProps {
  isActive: boolean
  route: string
  href: string
  onClick?: () => void
  children?: React.ReactNode
}

export const MenuNavItem = ({ isActive = false, href = '', onClick = noop, children = null }: MenuNavItemProps) => {
  return (
    <Link href={`/${href}`} legacyBehavior>
      <a>
        <div className={bem()} data-active={isActive} style={{ zIndex: 2 }} onClick={onClick}>
          <div className={bem('inner')}>
            <div className={bem('arrowContainer')}>
              <Arrow direction="right" fill={'var(--color-black)'} />
            </div>
            <h2>{children}</h2>
          </div>
        </div>
      </a>
    </Link>
  )
}
