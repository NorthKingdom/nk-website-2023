import React from 'react'
import styles from './Header.module.scss'
import { bemify } from '@utils/bemify'
import { HeaderLogo } from './header-logo'
import { Nav } from '@components/nav'
import { useGlobalStateStore } from '@store'
import { useRouter } from 'next/router'
import { useIsScrollingDown } from '@hooks/use-is-scrolling-down'

const bem = bemify(styles, 'header')

interface HeaderProps {}

export const Header = (props: HeaderProps) => {
  const router = useRouter()
  const lenis = useGlobalStateStore((state) => state.lenis)
  const setIsMenuOpen = useGlobalStateStore((state) => state.setIsMenuOpen)
  const isHomePage = router.pathname === '/'
  const isScrollingDown = useIsScrollingDown()

  return (
    <header className={bem('')} data-is-scrolling-down={isScrollingDown}>
      <HeaderLogo
        onClick={() => {
          if (isHomePage) lenis?.scrollTo(0)
          setIsMenuOpen(false)
        }}
      />
      <Nav />
    </header>
  )
}
