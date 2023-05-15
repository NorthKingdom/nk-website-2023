import React from 'react'
import { VideoPlayer } from '@components/video-player'
import { Image } from '@components/image'
import styles from './CaseHero.module.scss'
import { bemify } from '@utils/bemify'
import { Video, ResponsiveImage } from '@customTypes/cms'
const bem = bemify(styles, 'caseHero')

interface CaseHeroProps {
  client: string
  caseName: string
  src: Video | ResponsiveImage
  isVideoAsset: boolean
}

export const CaseHero = ({ client, caseName, src, isVideoAsset }: CaseHeroProps) => {
  return (
    <section className={styles['caseHero']}>
      {isVideoAsset ? (
        <VideoPlayer
          poster={(src as Video).posterImage.url}
          src={src as Video}
          muted={(src as Video).muted}
          autoPlay={(src as Video).autoPlay}
        />
      ) : (
        <Image srcSet={src as ResponsiveImage} />
      )}
      <div className={styles['caseHero__description']}>
        <p>{client}</p>
        <h1>{caseName}</h1>
      </div>
    </section>
  )
}
