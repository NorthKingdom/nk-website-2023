import React from 'react'
import styles from './Image.module.scss'
import { bemify } from '@utils/bemify'
import { ResponsiveImage } from '@customTypes/cms'
const bem = bemify(styles, 'image')

interface ImageProps {
  className?: string
  srcSet: ResponsiveImage
  caption?: string
}

export const Image = ({ className, srcSet, caption }: ImageProps) => {
  {
    /* TODO :: Can change to next/image component */
    /* TODO :: Change from Desktop to Mobile Image on diff sizes */
  }
  return (
    <>
      <picture className={`${className} ${styles['image']}`}>
        <source srcSet={srcSet.desktopImage.url} />
        <source srcSet={srcSet.mobileImage.url} />

        <img srcSet={srcSet.desktopImage.url} alt={srcSet.altText} />
      </picture>
      {caption && <p>{caption}</p>}
    </>
  )
}
