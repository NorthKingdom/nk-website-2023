import React from 'react'
import styles from './CaseHero.module.scss'
import { bemify } from '@utils/bemify'
import { Video, ResponsiveImage } from '@customTypes/cms'
import { Media } from '@components/media'
const bem = bemify(styles, 'caseHero')

interface CaseHeroProps {
  client: string
  caseName: string
  src: Video | ResponsiveImage
}

export const CaseHero = ({ client, caseName, src }: CaseHeroProps) => {
  return (
    <section className={styles['caseHero']}>
      <Media
        {...src}
        client={client}
        controls={false}
        muted={true}
        autoPlay={false}
        loop={true}
        playsinline={true}
        caseHero={true}
      />
      <div className={styles['caseHero__description']}>
        <p>{client}</p>
        <h1>{caseName}</h1>
      </div>
    </section>
  )
}
