import React from 'react'
import styles from './Description.module.scss'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'description')

interface DescriptionProps {
  headerSize?: 'large' | 'small'
  copyLeft?: string
  copyRight?: string
  link?: {
    copy: string
    url: string
  }
  theme?: 'light' | 'dark'
}

export const Description = ({ copyLeft, headerSize, copyRight, link, theme = 'light' }: DescriptionProps) => {
  return (
    <section className={styles['description']} data-theme={theme}>
      <div className={bem('left')}>{copyLeft && <h2 data-size={headerSize}>{copyLeft}</h2>}</div>
      <div className={bem('right')}>
        <p>{copyRight}</p>
        {link && <a href={link.url}>{link.copy}</a>}
      </div>
    </section>
  )
}
