import React from 'react'
import Link from 'next/link'
import styles from './NavItem.module.scss'
import { motion } from 'framer-motion'
import { bemify } from '@utils/bemify'

const bem = bemify(styles, 'navItem')

interface NavItemProps {
  active: boolean
  route: string
  children?: React.ReactNode
}

export const NavItem = (props: NavItemProps) => {
  return (
    <Link href={`/${props.route}`} legacyBehavior>
      <a className={bem()} data-active={props.active ?? false}>
        <motion.span
          key={props.route}
          initial={{ opacity: 0, translateY: -25 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: -25 }}
          transition={{ duration: 0.4, delay: 0 }}
        >
          {props.children}
        </motion.span>
      </a>
    </Link>
  )
}
