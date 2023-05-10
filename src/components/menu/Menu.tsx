import React from 'react'
import styles from './Menu.module.scss'
import { bemify } from '@utils/bemify'
import { noop } from '@utils/noop'
import { use100vh } from 'react-div-100vh'
import { NavItemData } from '@components/nav/Nav.types'
import type { MenuContactItem as MenuContactItemData } from './Menu.types'
import { NAV_ITEMS, CONTACT_ITEMS, SOCIAL_LINK_ITEMS } from '@constants'
import { MenuNavItem } from './menu-nav-item'
import { MenuContactItem } from './menu-contact-item'
import { useRouter } from 'next/router'
import { isRouteActive } from '@utils/is-route-active'

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
    <div className={bem()} style={{ height: heigh100vh }} data-is-menu-open={isOpen}>
      <div className={bem('overlay')} onClick={onClickOutside} />
      <div className={bem('content')}>
        <div className={bem('navScrollSafeArea')} />
        <div className={bem('scrollContainer')}>
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
          <div className={bem('footer')}>
            <div className={bem('socialsMenu')}>
              {socialLinkItems.map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noopener">
                  {item.label}
                </a>
              ))}
            </div>
            <div className={bem('contactMenu')}>
              {contactItems.map((item) => (
                <MenuContactItem key={item.href} {...item}>
                  {item.label}
                </MenuContactItem>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
