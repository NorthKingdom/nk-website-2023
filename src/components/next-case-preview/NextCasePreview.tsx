import React, { useEffect } from 'react'
import styles from './NextCasePreview.module.scss'
import { motion } from 'framer-motion'
import { bemify } from '@utils/bemify'
import Link from 'next/link'
const bem = bemify(styles, 'nextCasePreview')
import { useInView } from 'react-hook-inview'
import { useRouter } from 'next/router'

interface NextCasePreviewProps {
  caseTitle: string
  client: string
  src: string
}

export const NextCasePreview = ({ src, caseTitle, client }: NextCasePreviewProps) => {
  const router = useRouter()

  const [ref, isVisible] = useInView({
    threshold: 0.9,
    defaultInView: false,
  })

  useEffect(() => {
    if (isVisible) {
      console.log(`go to new route`)
      // router.push(router.asPath === '/case/fake-riot-case' ? '/case/fake-masterclash-case' : '/case/fake-riot-case')
    }
  }, [isVisible])

  return (
    <div ref={ref} className={styles['nextCasePreview']}>
      <img
        src="/images/shield-mask-local.png"
        style={{
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
