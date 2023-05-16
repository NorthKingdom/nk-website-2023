import React, { useReducer, useRef } from 'react'
import styles from './HomeHero.module.scss'
import { bemify } from '@utils/bemify'
import { use100vh } from 'react-div-100vh'
import dynamic from 'next/dynamic'
import { Loader } from '@components/loader'
import { PlayButton } from '@components/play-button'
import { VideoPlayer } from '@components/video-player'
import { AnimatePresence, motion } from 'framer-motion'
const bem = bemify(styles, 'homeHero')

const Scene = dynamic(() => import('./scene/Scene').then((Mod) => Mod.Scene), {
  ssr: false,
  loading: () => <Loader className={bem('loader')} />,
})

interface HomeHeroProps {}

export const HomeHero = (props: HomeHeroProps) => {
  const $container = useRef<HTMLDivElement>(null)
  const height100vh = use100vh() as number
  const [frameloop, toggleFrameloop] = useReducer((s) => (s === 'always' ? 'never' : 'always'), 'always')

  return (
    <div
      className={bem()}
      ref={$container}
      style={{
        position: 'relative',
        height: height100vh,
        width: ' 100%',
        backgroundColor: 'var(--color-black)',
        touchAction: 'auto',
      }}
    >
      <Scene
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        frameloop={frameloop}
        eventSource={$container}
        eventPrefix="client"
        cta={<PlayButton onClick={toggleFrameloop} />}
      />
      <AnimatePresence>
        {frameloop === 'never' && (
          <motion.div className={bem('video')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <VideoPlayer
              autoPlay={true}
              src={{
                muted: true,
                loop: true,
                autoPlay: true,
                srcCollection: {
                  items: [
                    {
                      url: '/dummy/showreel23.mp4',
                    },
                  ],
                },
                posterImage: { url: '/dummy/showreel-poster.jpg' },
              }}
              poster=""
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
