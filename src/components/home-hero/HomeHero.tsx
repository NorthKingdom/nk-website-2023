import React from 'react'
import styles from './HomeHero.module.scss'
import { bemify } from '@utils/bemify'
import { use100vh } from 'react-div-100vh'
const bem = bemify(styles, 'homeHero')

interface HomeHeroProps {}

export const HomeHero = (props: HomeHeroProps) => {
  const height100vh = use100vh() as number

  return (
    <div
      className={bem()}
      style={{
        height: height100vh,
        paddingTop: '80px',
        backgroundColor: 'var(--color-black)',
        border: '1px solid red',
      }}
    >
      <h1>Home hero</h1>
    </div>
  )
}
