import React from 'react'
import styles from './PageHero.module.scss'
import { bemify } from '@utils/bemify'
import { Link as LinkType, ResponsiveImage } from '@customTypes/cms'
import { Media } from '@components/media'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import Link from 'next/link'
const bem = bemify(styles, 'pageHero')

interface PageHeroProps {
  title: string
  srcSet: ResponsiveImage
  link?: LinkType
  notch?: boolean
  className?: string
}

export const PageHero = ({ title, srcSet, className, link, notch = false }: PageHeroProps) => {
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
      {srcSet && (
        <div className={bem('imageContainer')}>
          <Media {...srcSet} className={bem('image')} />
        </div>
      )}
    </ContentWrapper>
  )
}
