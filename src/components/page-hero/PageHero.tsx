import React from 'react'
import styles from './PageHero.module.scss'
import { bemify } from '@utils/bemify'
import { ResponsiveImage } from '@customTypes/cms'
import { Media } from '@components/media'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
const bem = bemify(styles, 'pageHero')

interface PageHeroProps {
  title: string
  srcSet: ResponsiveImage
  className?: string
}

export const PageHero = ({ title, srcSet, className }: PageHeroProps) => {
  return (
    <div className={`${styles['pageHero']} ${className}`}>
      <ContentWrapper className={bem('titleContainer')} theme="dark">
        <h1 className={bem('title')}>{title}</h1>
      </ContentWrapper>
      {srcSet && (
        <div className={bem('imageContainer')}>
          <Media {...srcSet} className={bem('image')} />
        </div>
      )}
    </div>
  )
}
