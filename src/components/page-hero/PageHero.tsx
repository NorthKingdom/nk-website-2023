import React, { useEffect, useReducer } from 'react'
import Link from 'next/link'
import cx from 'clsx'
import { bemify } from '@utils/bemify'
import { Media } from '@components/media'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import styles from './PageHero.module.scss'
import type { PageHeroPayload } from '@customTypes/cms'
const bem = bemify(styles, 'pageHero')
const pageHeroImageBem = bemify(styles, 'pageHeroImage')

interface PageHeroProps extends Omit<PageHeroPayload, '__typename'> {
  notch?: boolean
  className?: string
}

export const PageHero = ({ title, image, className, link, notch = false }: PageHeroProps) => {
  const [showHeroImage, toggle] = useReducer(() => true, false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(toggle, [])

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
      {image && (
        <div className={cx(bem('imageContainer'), pageHeroImageBem())} data-show={showHeroImage}>
          <div className={pageHeroImageBem('inner')}>
            <div className={pageHeroImageBem('scale')}>
              <Media {...image} className={bem('image')} />
            </div>
          </div>
        </div>
      )}
    </ContentWrapper>
  )
}

// const ImageRevealWipe = ({ image }) => {
//   return (
//     <div className={cx(styles.wipeRevealImage, styles.container)} data-show={show}>
//       <div className={styles.inner}>
//         <div className={styles.scale}>
//           <Media {...image} className={bem('image')} />
//         </div>
//       </div>
//     </div>
//   )
// }
