import { useRouter } from 'next/router'
import { use100vh } from 'react-div-100vh'
import React from 'react'
import { bemify } from '@utils/bemify'
import { noop } from '@utils/noop'
import { NavItemData } from '@components/nav/Nav.types'
import { NAV_ITEMS, CONTACT_ITEMS, SOCIAL_LINK_ITEMS } from '@constants'
import { isRouteActive } from '@utils/is-route-active'
import { MenuContactItem } from './menu-contact-item'
import { MenuNavItem } from './menu-nav-item'
import styles from './Menu.module.scss'
import type { MenuContactItem as MenuContactItemData } from './Menu.types'

const bem = bemify(styles, 'menu')

interface MenuProps {
  isOpen: boolean
  navItems?: NavItemData[]
  socialLinkItems?: MenuContactItemData[]
  contactItems?: MenuContactItemData[]
  onOpen?: () => void
  onClose?: () => void
  onClickOutside?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const Menu = ({
  isOpen = false,
  navItems = NAV_ITEMS,
  socialLinkItems = SOCIAL_LINK_ITEMS,
  contactItems = CONTACT_ITEMS,
  onOpen = noop,
  onClose = noop,
  onClickOutside = noop,
}: MenuProps) => {
  const router = useRouter()
  const heigh100vh = use100vh() as number

  return (
    <menu className={bem()} style={{ height: heigh100vh }} data-is-menu-open={isOpen}>
      <div className={bem('overlay')} onClick={onClickOutside} />
      <div className={bem('content')}>
        <div className={bem('main')}>
          {navItems.map((item) => (
            <MenuNavItem
              isActive={isRouteActive(item.href, router.route)}
              key={item.href}
              onClick={onClose}
              route={router.route}
              href={item.href}
            >
              {item.label}
            </MenuNavItem>
          ))}
        </div>
      </div>
    </menu>
  )
}
