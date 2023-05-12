import React from 'react'
import styles from './Description.module.scss'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'description')

interface DescriptionProps {
  header?: string
  headerSize?: 'large' | 'small'
  copy: string
  link?: {
    copy: string
    url: string
  }
}

export const Description = ({ header, headerSize, copy, link }: DescriptionProps) => {
  return (
    <section className={styles['description']}>
      <div className={bem('left')}>{header && <h2 data-size={headerSize}>{header}</h2>}</div>
      <div className={bem('right')}>
        <p>{copy}</p>
        {link && <a href={link.url}>{link.copy}</a>}
      </div>
    </section>
  )
}
