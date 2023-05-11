import React from 'react'
import styles from './Image.module.scss'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'image')

interface ImageProps {
  srcSet: string[]
  alt: string
}

export const Image = ({ srcSet, alt }: ImageProps) => {
  return (
    <picture className={styles['image']}>
      <source srcSet={srcSet[0]} />
      <img srcSet={srcSet[0]} alt={alt} />
    </picture>
  )
}
