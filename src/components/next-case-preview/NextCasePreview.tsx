import React, { useEffect, useRef, useState } from 'react'
import styles from './NextCasePreview.module.scss'
import { bemify } from '@utils/bemify'
import { Video, ResponsiveImage } from '@customTypes/cms'
import Link from 'next/link'
import { Media } from '@components/media'
import { useRouter } from 'next/router'
const bem = bemify(styles, 'nextCasePreview')
import { useBreakpointUntil } from '@hooks/use-breakpoint'
import { useOnScroll } from '@hooks/use-on-scroll'
import { useGlobalStateStore } from '@store/global-state-store'
import { AnimatePresence, animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
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

  useEffect(() => {
    preload_image((src as ResponsiveImage).desktopImage?.url || (src as Video).posterImage?.url)
  }, [])

  useOnScroll(
    async ({ progress: _progress }) => {
      progress.set(_progress)

      const loadingPercentage = Math.min(Math.max(0, Math.round(range(_progress * 100, 33, 65, 0, 100))), 100)

      if (!hasRouted.current) {
        if (ref2.current) {
          const a = ref2.current as HTMLParagraphElement
          a.innerText = loadingPercentage.toString()
        }

        if (loadingPercentage >= 97) {
          console.log(`is before dt small`, bpBeforeDesktopSmall)
          if (false) {
            //!bpBeforeDesktopSmall) {
            await animate(scale, 14, { duration: 0.5 })

            if (scale.get() >= 10) {
              router.push(
                '/case/[case]',
                router.asPath === '/case/fake-riot-case' ? '/case/fake-masterclash-case' : '/case/fake-riot-case'
              )
              hasRouted.current = true
              // window.location.href =
              //   router.asPath === '/case/fake-riot-case' ? '/case/fake-masterclash-case' : '/case/fake-riot-case'
              // window.location = '/case/fake-riot-case'
            }
          } else {
            router.push(
              '/case/[case]',
              router.asPath === '/case/fake-riot-case' ? '/case/fake-masterclash-case' : '/case/fake-riot-case'
            )
            hasRouted.current = true
            // setGoing(true)
          }
        }
      }
    },
    {
      target: ref,
      enabled: isInView && !hasRouted.current,
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
        {/* <div className={bem('container')}> */}
        <div className={bem('stickyInner')}>
          {/* <AnimatePresence mode="wait"> */}
          {/* {(!hasRouted.current || bpBeforeDesktopSmall) && ( */}
          <motion.img
            key="shield-img"
            src="/images/shield-mask-local2.png"
            style={{
              scale,
              y,
              position: `absolute`,
              top: 0,
              left: 0,
              // width: `100%`,
              // height: `100vh`,
              width: `100%`,
              height: `100vh`,
              zIndex: 1,
              objectFit: bpBeforeDesktopSmall ? `cover` : `none`,
            }}
            // initial={{ scale: 14 }}
            // exit={bpBeforeDesktopSmall ? {} : { scale: 14, transition: { duration: 0 } }}
          />
          {/* )} */}
          {/* </AnimatePresence> */}

          {/* {bpBeforeDesktopSmall ? (
          <AspectRatio ratio={1920 / 1080}>
            <motion.img
              src={(src as ResponsiveImage).desktopImage?.url || (src as Video).posterImage?.url}
              style={{
                scale: s,
                y,
                position: `absolute`,
                top: 0,
                left: 0,
                width: `100%`,
                height: `100%`,
                zIndex: 0,
                objectFit: 'cover',
              }}
            />
          </AspectRatio>
        ) : ( */}
          {/* <motion.img
            src={(src as ResponsiveImage).desktopImage?.url || (src as Video).posterImage?.url}
          
          /> */}
          {/* )} */}
          <motion.div
            style={{
              scale: s,
              y,
              position: `absolute`,
              top: 0,
              left: 0,
              width: `100%`,
              height: `100vh`,
              zIndex: 0,
              objectFit: 'cover',
            }}
          >
            <Media
              {...src}
              // src={(src as ResponsiveImage).desktopImage?.url || (src as Video).posterImage?.url}
              index={0}
              caseHeroImage
              controls={false}
              muted={true}
              autoPlay={true}
              loop={true}
              playsinline={true}
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
