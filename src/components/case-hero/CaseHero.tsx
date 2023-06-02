import React from 'react'
import styles from './CaseHero.module.scss'
import { bemify } from '@utils/bemify'
import { Video, ResponsiveImage } from '@customTypes/cms'
import { Media } from '@components/media'
import { AspectRatio } from '@components/aspect-ratio/AspectRatio'
import { useBreakpointUntil } from '@hooks/use-breakpoint'
const bem = bemify(styles, 'caseHero')

interface CaseHeroProps {
  client: string
  caseName: string
  src: Video | ResponsiveImage
}

export const CaseHero = ({ client, caseName, src }: CaseHeroProps) => {
  const bpBeforeTablet = useBreakpointUntil('desktopSmall')

  return (
    <section className={styles['caseHero']}>
      {bpBeforeTablet ? (
        <AspectRatio ratio={1920 / 1080}>
          <Media
            {...src}
            index={0}
            caseHeroImage
            controls={false}
            muted={true}
            autoPlay={true}
            loop={true}
            playsinline={true}
          />
        </AspectRatio>
      ) : (
        <Media
          {...src}
          index={0}
          caseHeroImage
          controls={false}
          muted={true}
          autoPlay={true}
          loop={true}
          playsinline={true}
        />
      )}
      <div className={styles['caseHero__description']}>
        <p>{client}</p>
        <h1>{caseName}</h1>
      </div>
    </section>
  )
}
