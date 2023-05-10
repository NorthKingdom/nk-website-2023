import React from 'react'
import { Header } from '@components/header'
import { Footer } from '@components/footer'
import styles from './Layout.module.scss'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  )
}
