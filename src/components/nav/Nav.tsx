import cx from 'clsx'
import { bemify } from '@utils/bemify'
import { AnimatePresence } from 'framer-motion'
import styles from './Nav.module.scss'
import { MenuHamburgerButton } from '@components/menu/menu-hamburger-button'
import { Menu } from '@components/menu'
import { NavItem } from './nav-item'
import { useIsScrollingDown } from '@hooks/use-is-scrolling-down'
import { useGlobalStateStore } from '@store'
import { NAV_ITEMS } from '@constants'
import { isRouteActive } from '@utils/is-route-active'
import { useRouter } from 'next/router'
import type { NavItemData } from './Nav.types'
import { useIsTouchDevice } from '@hooks/use-is-touch-device'
import { useBreakpointFrom } from '@hooks/use-breakpoint'

const bem = bemify(styles, 'nav')

interface NavProps {
  className?: string
  style?: React.CSSProperties
  navItems?: NavItemData[]
}

export const Nav = ({ className = '', style = {}, navItems = NAV_ITEMS }: NavProps) => {
  const router = useRouter()
  const isMenuOpen = useGlobalStateStore((state) => state.isMenuOpen)
  const toggleMenu = useGlobalStateStore((state) => state.toggleMenu)
  const setIsMenuOpen = useGlobalStateStore((state) => state.setIsMenuOpen)
  const isScrollingDown = useIsScrollingDown()
  const isTouchDevice = useIsTouchDevice()
  const bpDesktop = useBreakpointFrom('desktopSmall')

  return (
    <nav className={cx(bem(), className)} style={style}>
      {bpDesktop || !isTouchDevice ? (
        navItems.map((item) => (
          <AnimatePresence key={item.href}>
            {!isScrollingDown && !isMenuOpen && (
              <NavItem route={item.href} active={isRouteActive(item.href, router.route)}>
                {item.label}
              </NavItem>
            )}
          </AnimatePresence>
        ))
      ) : (
        <MenuHamburgerButton onClick={toggleMenu}></MenuHamburgerButton>
      )}

      <Menu
        isOpen={isMenuOpen}
        onOpen={() => setIsMenuOpen(true)}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
      />
    </nav>
  )
}
