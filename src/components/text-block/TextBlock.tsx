import React from 'react'
import styles from './TextBlock.module.scss'
import { bemify } from '@utils/bemify'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import type { TextBlock as TextBlockDataType } from '@customTypes/cms'
const bem = bemify(styles, 'textBlock')

interface TextBlockProps extends Omit<TextBlockDataType, '__typename' | 'sys'> {
  theme?: 'light' | 'dark'
  notch?: boolean
  children?: React.ReactNode
}

export const TextBlock = ({
  heading,
  copyLeft,
  copyRight,
  link,
  theme = 'light',
  notch = false,
  children = null,
}: TextBlockProps) => {
  return (
    <ContentWrapper as="section" className={bem()} data-theme={theme} data-use-notch={notch}>
      {!!heading && <h2 className={bem('heading')}>{heading}</h2>}
      <div className={bem('left')}>{copyLeft}</div>
      <div className={bem('right')}>
        <p>{copyRight}</p>
        {link && <a href={link.url}>{link.copy}</a>}
      </div>
      {children}
    </ContentWrapper>
  )
}
