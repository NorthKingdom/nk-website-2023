import React from 'react'
import styles from './Header.module.scss'
import { bemify } from '@utils/bemify'
import { HeaderLogo } from './header-logo'
import { Nav } from '@components/nav'
import { useGlobalStateStore } from '@store'

const bem = bemify(styles, 'header')

interface HeaderProps {}

export const Header = (props: HeaderProps) => {
  const setIsMenuOpen = useGlobalStateStore((state) => state.setIsMenuOpen)

  return (
    <header className={bem('')}>
      <HeaderLogo onClick={() => setIsMenuOpen(false)} />
      <Nav />
    </header>
  )
}
