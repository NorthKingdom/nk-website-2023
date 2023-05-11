import React from 'react'
import { Image } from '@components/image'
import styles from './TwoImageLayout.module.scss'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'twoImageLayout')

interface TwoImageLayoutProps {
  leftSrcSet: string[]
  leftCaption: string
  rightSrcSet: string[]
  rightCaption: string
  leftAlt: string
  rightAlt: string
}

export const TwoImageLayout = ({
  leftSrcSet,
  leftCaption,
  rightSrcSet,
  rightCaption,
  leftAlt,
  rightAlt,
}: TwoImageLayoutProps) => {
  return (
    <section className={styles['twoImageLayout']}>
      <div className={`${bem('container')} ${bem('container--left')}`}>
        <Image srcSet={leftSrcSet} alt={leftAlt} />
        <p className={bem('caption')}>{leftCaption}</p>
      </div>
      <div className={`${bem('container')} ${bem('container--right')}`}>
        <Image srcSet={rightSrcSet} alt={rightAlt} />
        <p className={bem('caption')}>{rightCaption}</p>
      </div>
    </section>
  )
}
