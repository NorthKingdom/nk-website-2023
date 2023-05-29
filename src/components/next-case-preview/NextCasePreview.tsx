import React, { useRef } from 'react'
import styles from './NextCasePreview.module.scss'
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion'
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

  const isInView = useInView(ref)
  const hasRouted = useRef(false)
  const showText = useRef(false)

  useOnScroll(
    ({ progress: _progress }) => {
      console.log(_progress)
      progress.set(_progress)
      if (_progress >= 0.3 && !showText.current) {
        opacity.set(1)
        showText.current = true
      }
      if (_progress >= 0.55 && !hasRouted.current) {
        console.log(`push new route`, router.asPath)
        hasRouted.current = true
        // router.push(router.asPath === '/case/fake-riot-case' ? '/case/fake-masterclash-case' : '/case/fake-riot-case')
      }
    },
    {
      target: ref,
      enabled: isInView,
    }
  )

  const progress = useMotionValue(0)
  const scale = useTransform(progress, [0.0, 0.5], [0.6, 1])
  const y = useTransform(progress, [0.0, 0.5], [`10%`, `0%`])
  const opacity = useMotionValue(0) //useTransform(progress, [0.0, 0.5], [0, 0.5])

  return (
    <div ref={ref} className={styles['nextCasePreview']}>
      <div className={bem('s')}>
        <motion.img
          src="/images/shield-mask-local2.png"
          style={{
            scale,
            y,
            position: `absolute`,
            top: 0,
            left: 0,
            width: `100%`,
            height: `100vh`,
            zIndex: 1,
            // transformOrigin: `center`,
          }}
        />
        <motion.img
          src={src}
          alt={'temp alt'}
          style={{
            scale,
            y,
            position: `absolute`,
            top: 0,
            left: 0,
            width: `100%`,
            height: `100vh`,
            zIndex: 0,
          }}
        />
        {/* </motion.div> */}
        <motion.div style={{ opacity }} className={bem('inner')}>
          <p>Next up</p>
          <h2>{caseTitle}</h2>
        </motion.div>
      </div>
    </div>
  )
}
