import React, { useId, useRef } from 'react'
import styles from './NextCasePreview.module.scss'
import { AnimatePresence, animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'nextCasePreview')
import { useRouter } from 'next/router'
import { useOnScroll } from '@hooks/use-on-scroll'

interface NextCasePreviewProps {
  caseTitle: string
  client: string
  src: string
}

const range = (val: number, in_min: number, in_max: number, out_min: number, out_max: number) =>
  ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min

export const NextCasePreview = ({ src, caseTitle, client }: NextCasePreviewProps) => {
  const router = useRouter()
  const ref = useRef(null)
  const ref2 = useRef<HTMLDivElement>(null)
  const id = useId()

  const isInView = useInView(ref)
  const hasRouted = useRef(false)

  useOnScroll(
    async ({ progress: _progress }) => {
      progress.set(_progress)
      const loadingPercentage = Math.min(
        Math.max(0, Math.round(range(parseFloat(_progress.toFixed(2)), 0.33, 0.67, 0, 100))),
        100
      )

      // console.log(loadingPercentage)

      if (!hasRouted.current) {
        // @ts-ignore
        ref2.current.innerText = loadingPercentage.toString()

        if (loadingPercentage >= 100) {
          // hasRouted.current = true
          // console.log(`start`)
          await animate(scale, 14, { duration: 0.5 })
          // console.log(scale, scale.get())
          if (scale.get() >= 10) {
            // console.log(`end`)
            router.push(
              '/case/[case]',
              router.asPath === '/case/fake-riot-case' ? '/case/fake-masterclash-case' : '/case/fake-riot-case'
            )
            // window.location.href =
            //   router.asPath === '/case/fake-riot-case' ? '/case/fake-masterclash-case' : '/case/fake-riot-case'
            // window.location = '/case/fake-riot-case'
            hasRouted.current = true
          }
        }
      }
    },
    {
      target: ref,
      enabled: isInView,
    }
  )

  const progress = useMotionValue(0)

  const scale = useTransform(progress, [0.0, 0.5, 0.5, 0.67, 0.67, 1], [0.6, 1, 1, 2, 2, 14])
  const s = useTransform(progress, [0.0, 0.5], [0.5, 1])
  const y = useTransform(progress, [0.0, 0.5], [`10%`, `0%`])
  const backgroundPosition = useTransform(progress, [0.33, 0.67], [`100%`, `0%`])
  const color = useTransform(progress, [0.33, 0.67], ['#ffffff60', '#fff'])

  console.log(`NCP layout id is: `, client === 'RIOT' ? 'layoutidid' : '_no id_')

  return (
    <div ref={ref} className={styles['nextCasePreview']}>
      <div className={bem('s')}>
        <AnimatePresence>
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
            }}
            exit={{ scale: 14, transition: { duration: 0 } }}
          />
          <motion.div
            key={`#${CSS.escape(id)}`}
            layoutId={client === 'RIOT' ? 'layoutidid' : ''}
            style={{
              scale: s,
              y,
              position: `absolute`,
              top: 0,
              left: 0,
              width: `100%`,
              height: `100vh`,
              zIndex: 0,
            }}
          >
            <img src={src} alt={'temp alt'} />
          </motion.div>
        </AnimatePresence>
      </div>
      {/* </motion.div> */}
      <div className={bem('inner')}>
        <div className={bem('text')}>
          <div className={bem('t2')}>
            <motion.p
              style={{
                backgroundPosition,
              }}
            >
              Next up
            </motion.p>
            <motion.h2
              style={{
                backgroundPosition,
              }}
            >
              {caseTitle}
            </motion.h2>
          </div>
          <motion.p ref={ref2} className={bem('percent')} style={{ color }} />
        </div>
      </div>
    </div>
  )
}
