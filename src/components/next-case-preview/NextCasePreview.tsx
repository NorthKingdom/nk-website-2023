import React, { useEffect, useRef } from 'react'
import styles from './NextCasePreview.module.scss'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'nextCasePreview')
import { useRouter } from 'next/router'
import { useOnScroll } from '@hooks/use-on-scroll'

interface NextCasePreviewProps {
  caseTitle: string
  client: string
  src: string
}

export const NextCasePreview = ({ src, caseTitle, client }: NextCasePreviewProps) => {
  const router = useRouter()
  const ref = useRef(null)

  useOnScroll(
    ({ progress: _progress }) => {
      console.log(_progress)
      progress.set(_progress)
      if (_progress >= 0.48) {
        console.log(`push new route`, router.asPath)
        router.push(router.asPath === '/case/fake-riot-case' ? '/case/fake-masterclash-case' : '/case/fake-riot-case')
      }
    },
    {
      target: ref,
    }
  )

  const progress = useMotionValue(0)
  const scale = useTransform(progress, [0.4, 0.5], [1, 1.5])

  return (
    <div ref={ref} className={styles['nextCasePreview']}>
      <motion.img
        src="/images/shield-mask-local.png"
        style={{
          scale,
          position: `absolute`,
          top: 0,
          left: 0,
          width: `100%`,
          height: `100%`,
        }}
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        src={src}
        alt={'temp alt'}
        layoutId="introMedia"
      />
      <div className={bem('inner')}>
        <p>{client}</p>
        <h2>{caseTitle}</h2>
      </div>
    </div>
  )
}
