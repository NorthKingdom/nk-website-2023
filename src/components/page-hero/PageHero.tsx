import React from 'react'
import styles from './PageHero.module.scss'
import { bemify } from '@utils/bemify'
import type { PageHeroPayload } from '@customTypes/cms'
import { Media } from '@components/media'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import Link from 'next/link'
const bem = bemify(styles, 'pageHero')

interface PageHeroProps extends Omit<PageHeroPayload, '__typename'> {
  notch?: boolean
  className?: string
}

export const PageHero = ({ title, image, className, link, notch = false }: PageHeroProps) => {
  return (
    <ContentWrapper fullscreen theme="dark" className={`${styles['pageHero']} ${className}`} notch={notch}>
      <ContentWrapper className={bem('titleContainer')} theme="dark">
        <h1 className={bem('title')}>{title}</h1>
        {!!link && (
          <Link href={link.url} className={bem('cta')}>
            {link.copy}
          </Link>
        )}
      </ContentWrapper>
      {image && (
        <div className={bem('imageContainer')}>
          <Media {...image} className={bem('image')} />
        </div>
      )}
    </ContentWrapper>
  )
}
