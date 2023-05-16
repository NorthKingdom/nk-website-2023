import React, { Suspense, useRef } from 'react'
import styles from './HomeHero.module.scss'
import { bemify } from '@utils/bemify'
import { use100vh } from 'react-div-100vh'
import dynamic from 'next/dynamic'
import { Loader } from '@components/loader'
const bem = bemify(styles, 'homeHero')

const Scene = dynamic(() => import('./scene/Scene').then((Mod) => Mod.Scene), {
  ssr: false,
  loading: () => <Loader className={bem('loader')} />,
})

interface HomeHeroProps {}

export const HomeHero = (props: HomeHeroProps) => {
  const $container = useRef<HTMLDivElement>(null)
  const height100vh = use100vh() as number

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
        eventSource={$container}
        eventPrefix="client"
      />
    </div>
  )
}
