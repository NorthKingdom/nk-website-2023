import React, { useEffect, useRef } from 'react'
import styles from './NextCasePreview.module.scss'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { bemify } from '@utils/bemify'
import Link from 'next/link'
const bem = bemify(styles, 'nextCasePreview')
import { useInView } from 'react-hook-inview'
import { useRouter } from 'next/router'
import { useOnScroll } from '@hooks/use-on-scroll'
import { mergeRefs } from 'react-merge-refs'

interface NextCasePreviewProps {
  caseTitle: string
  client: string
  src: string
}

export const NextCasePreview = ({ src, caseTitle, client }: NextCasePreviewProps) => {
  const router = useRouter()
  const _ref = useRef()

  const [ref, isVisible] = useInView({
    threshold: 0.9,
    defaultInView: false,
  })

  useOnScroll(
    ({ progress: _progress }) => {
      progress.set(_progress)
      // console.log('progress', progress)
    },
    {
      target: _ref,
    }
  )

  const progress = useMotionValue(0)
  const scale = useTransform(progress, [0, 0.5], [0.3, 1])

  useEffect(() => {
    if (isVisible) {
      console.log(`go to new route`)
      // router.push(router.asPath === '/case/fake-riot-case' ? '/case/fake-masterclash-case' : '/case/fake-riot-case')
    }
  }, [isVisible])

  return (
    <div ref={mergeRefs([ref, _ref])} className={styles['nextCasePreview']}>
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
        {/* <Link href="" scroll={true}>
          To Riot
        </Link> */}
      </div>
    </div>
  )
}
