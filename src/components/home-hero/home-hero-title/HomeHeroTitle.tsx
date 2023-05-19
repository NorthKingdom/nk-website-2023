import React from 'react'
import styles from './HomeHeroTitle.module.scss'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'homeHeroTitle')

interface HomeHeroTitleProps {}

export const HomeHeroTitle = (props: HomeHeroTitleProps) => {
  return (
    <h1 className={bem()} aria-label="North Kingdom">
      <span className={bem('word')}>North</span>
      <span className={bem('word')}>Kingdom</span>
    </h1>
  )
}
