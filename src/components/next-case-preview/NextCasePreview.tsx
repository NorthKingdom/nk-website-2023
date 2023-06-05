import React, { useEffect, useRef, useState } from 'react'
import styles from './NextCasePreview.module.scss'
import { bemify } from '@utils/bemify'
import { Video, ResponsiveImage } from '@customTypes/cms'
import { Media } from '@components/media'
import { useRouter } from 'next/router'
const bem = bemify(styles, 'nextCasePreview')
import { useBreakpointUntil } from '@hooks/use-breakpoint'
import { useOnScroll } from '@hooks/use-on-scroll'
import { useGlobalStateStore } from '@store/global-state-store'
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import Head from 'next/head'

interface CaseHeroProps {
  caseName: string
  src: Video | ResponsiveImage
}

const range = (val: number, in_min: number, in_max: number, out_min: number, out_max: number) =>
  ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min

export const NextCasePreview = ({ caseName, src }: CaseHeroProps) => {
  const router = useRouter()
  const ref = useRef(null)
  const ref2 = useRef(null)
  const progress = useMotionValue(0)
  const isInView = useInView(ref, { once: true })
  const hasRouted = useRef(false)
  const lenis = useGlobalStateStore((state) => state.lenis) as Lenis

  const bpBeforeDesktopSmall = useBreakpointUntil('desktopSmall')

  useEffect(() => {
    const newHref = router.asPath === '/case/fake-riot-case' ? '/case/fake-masterclash-case' : '/case/fake-riot-case'
    router.prefetch(newHref)
  }, [router])

  const preload_image = (im_url: string) => {
    let img = new Image()
    img.src = im_url
  }

  // const [leaving, setLeaving] = useState(false)

  // useEffect(() => {
  //   console.log(`leaving`, leaving)
  // }, [leaving])

  useEffect(() => {
    // preload_image((src as ResponsiveImage).desktopImage?.url || (src as Video).posterImage?.url)
    // return () => {
    //   if (lenis) {
    //     console.log(`destroy !!`)
    //     lenis.destroy()
    //   }
    // }
  }, [lenis])

  useOnScroll(
    async ({ progress: _progress }) => {
      progress.set(_progress)

      const loadingPercentage = Math.min(Math.max(0, Math.round(range(_progress * 100, 33, 65, 0, 100))), 100)

      if (!hasRouted.current) {
        console.log(`havent routed!`)
        if (ref2.current) {
          const a = ref2.current as HTMLParagraphElement
          a.innerText = loadingPercentage.toString()
        }

        if (loadingPercentage >= 97) {
          console.log(`loading >= 97!`)
          router.push(
            '/case/[case]',
            router.asPath === '/case/fake-riot-case' ? '/case/fake-masterclash-case' : '/case/fake-riot-case'
          )
          hasRouted.current = true
          // setGoing(true)
        }
      }
    },
    {
      target: ref,
      enabled: isInView && !hasRouted.current, // && !leaving,
    }
  )

  const scale = useTransform(progress, [0.0, 0.5, 0.5, 0.67], [0.6, 1, 1, 2]) //, 0.67, 1] , 2, 14
  const s = useTransform(progress, [0.0, 0.5], [0.6, 1])
  const y = useTransform(progress, [0.0, 0.5], [`10%`, `0%`])

  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href={(src as ResponsiveImage).desktopImage?.url || (src as Video).posterImage?.url}
        />
        <link rel="prefetch" href={(src as ResponsiveImage).desktopImage?.url || (src as Video).posterImage?.url} />
      </Head>
      <section ref={ref} className={styles['nextCasePreview']}>
        <div className={bem('stickyInner')}>
          <motion.img
            key="shield-img"
            className={bem('shieldMask')}
            src="/images/shield-mask-local2.png"
            style={{
              scale,
              y,
              objectFit: bpBeforeDesktopSmall ? `cover` : `none`,
            }}
          />

          <motion.div
            className={bem('mediaContainer')}
            style={{
              scale: s,
              y,
            }}
          >
            <Media
              {...src}
              index={0}
              caseHeroImage
              controls={false}
              muted={true}
              autoPlay={true}
              loop={true}
              playsInline={true}
            />
          </motion.div>

          {/* <Media {...src} controls={false} muted={true} autoPlay={true} loop={true} playsinline={true} /> */}
          <div className={bem('description')}>
            <p>Next up</p>
            <div className={bem('m')}>
              <span>
                <h1>{caseName}</h1>
              </span>
              <span>
                <p className={bem('percent')} ref={ref2}></p>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
