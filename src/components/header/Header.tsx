import React from 'react'
import styles from './Header.module.scss'
import { bemify } from '@utils/bemify'
import { HeaderLogo } from './header-logo'
import { Nav } from '@components/nav'
import { useGlobalStateStore } from '@store'
import { useRouter } from 'next/router'

const bem = bemify(styles, 'header')

interface HeaderProps {}

export const Header = (props: HeaderProps) => {
  const router = useRouter()
  const lenis = useGlobalStateStore((state) => state.lenis)
  const setIsMenuOpen = useGlobalStateStore((state) => state.setIsMenuOpen)

  return (
    <header className={bem('')}>
      <HeaderLogo
        onClick={() => {
          if (router.pathname === '/') {
            lenis?.scrollTo(0)
          }
          setIsMenuOpen(false)
        }}
      />
      <Nav />
    </header>
  )
}
