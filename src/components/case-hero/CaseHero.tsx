import React from 'react'
import { VideoPlayer } from '@components/video-player'
import { Image } from '@components/image'
import styles from './CaseHero.module.scss'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'caseHero')

interface CaseHeroProps {
  client: string
  caseName: string
  src: any
  isVideoAsset: boolean
}

export const CaseHero = ({ client, caseName, src, isVideoAsset }: CaseHeroProps) => {
  return (
    <section className={styles['caseHero']}>
      {isVideoAsset ? (
        <VideoPlayer
          poster={src.posterImage.url}
          src={src.srcCollection.items}
          muted={src.muted}
          autoPlay={src.autoPlay}
        />
      ) : (
        <Image alt="placeholder alt" srcSet={[src]} />
      )}
      <div className={styles['caseHero__description']}>
        <p>{client}</p>
        <h1>{caseName}</h1>
      </div>
    </section>
  )
}
