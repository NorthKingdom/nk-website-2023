import React from 'react'
import { Image } from '@components/image'
import styles from './TwoImageLayout.module.scss'
import { bemify } from '@utils/bemify'
import { ResponsiveImage } from '@customTypes/cms'
const bem = bemify(styles, 'twoImageLayout')

interface TwoImageLayoutProps {
  leftSrcSet: ResponsiveImage
  leftCaption: string
  rightSrcSet: ResponsiveImage
  rightCaption: string
  leftAlt: string
  rightAlt: string
}

export const TwoImageLayout = ({ leftSrcSet, leftCaption, rightSrcSet, rightCaption }: TwoImageLayoutProps) => {
  return (
    <section className={styles['twoImageLayout']}>
      <div className={`${bem('container')} ${bem('container--left')}`}>
        <Image srcSet={leftSrcSet} />
        <p className={bem('caption')}>{leftCaption}</p>
      </div>
      <div className={`${bem('container')} ${bem('container--right')}`}>
        <Image srcSet={rightSrcSet} />
        <p className={bem('caption')}>{rightCaption}</p>
      </div>
    </section>
  )
}
