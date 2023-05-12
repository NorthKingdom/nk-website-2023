import React from 'react'
import styles from './Slideshow.module.scss'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'slideshow')

interface SlideshowProps {

}

export const Slideshow = (props: SlideshowProps) => {
  return <div className={styles['slideshow']}>Slideshow</div>
}