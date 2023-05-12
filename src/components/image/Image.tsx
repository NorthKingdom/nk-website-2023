import React from 'react'
import styles from './Image.module.scss'
import { motion } from 'framer-motion'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'image')

interface ImageProps {
  className?: string
  srcSet: string[]
  alt: string
  caption?: string
}

export const Image = ({ className, srcSet, alt, caption }: ImageProps) => {
  {
    /* TODO :: Can change to next/image component */
  }
  return (
    <>
      <picture className={`${className} ${styles['image']}`}>
        <source srcSet={srcSet[0]} />
        <img srcSet={srcSet[0]} alt={alt} />
      </picture>
      {caption && <p>{caption}</p>}
    </>
  )
}
