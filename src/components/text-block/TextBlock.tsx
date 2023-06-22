import React from 'react'
import Link from 'next/link'
import cx from 'clsx'
import { bemify } from '@utils/bemify'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import { ThemeChangeTrigger } from '@components/theme-change-trigger'
import styles from './TextBlock.module.scss'
import type { TextBlockPayload } from '@customTypes/cms'
const bem = bemify(styles, 'textBlock')

interface TextBlockProps extends Omit<TextBlockPayload, '__typename' | 'sys'>, React.HTMLAttributes<HTMLDivElement> {
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
  className = '',
  ...props
}: TextBlockProps) => {
  return (
    <ContentWrapper as="section" className={cx(bem(), className)} theme={theme} notch={notch} {...props}>
      <ThemeChangeTrigger theme={theme} />
      {!!heading && <h2 className={bem('heading')}>{heading}</h2>}
      <div className={bem('left')}>{copyLeft}</div>
      <div className={bem('right')}>
        <p>{copyRight}</p>
        {link && (
          <Link className={bem('link')} href={link.url}>
            {link.copy}
          </Link>
        )}
      </div>
      {children}
    </ContentWrapper>
  )
}
