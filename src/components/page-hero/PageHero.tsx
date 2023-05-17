import React from 'react'
import styles from './PageHero.module.scss'
import { bemify } from '@utils/bemify'
import { Image } from '@components/image'
import { ResponsiveImage } from '@customTypes/cms'
import { ThemeChangeTrigger } from '@components/theme-change-trigger'
const bem = bemify(styles, 'pageHero')

interface PageHeroProps {
  title: string
  srcSet: ResponsiveImage
}

export const PageHero = ({ title, srcSet }: PageHeroProps) => {
  return (
    <div className={styles['pageHero']}>
      <div className={bem('titleContainer')}>
        <h1 className={bem('title')}>{title}</h1>
      </div>
      <Image srcSet={srcSet} />
    </div>
  )
}
