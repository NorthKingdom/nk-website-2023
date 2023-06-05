import React from 'react'
import styles from './Description.module.scss'
import { bemify } from '@utils/bemify'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
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
  notch?: boolean
  children?: React.ReactNode
}

export const Description = ({
  copyLeft,
  headerSize,
  copyRight,
  link,
  theme = 'light',
  notch = false,
  children = null,
}: DescriptionProps) => {
  return (
    <ContentWrapper as="section" className={styles['description']} data-theme={theme} data-use-notch={notch}>
      <div className={bem('left')}>{copyLeft && <h2 data-size={headerSize}>{copyLeft}</h2>}</div>
      <div className={bem('right')}>
        <p>{copyRight}</p>
        {link && <a href={link.url}>{link.copy}</a>}
      </div>
      {children}
    </ContentWrapper>
  )
}
