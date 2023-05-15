import React from 'react'
import styles from './About.module.scss'
import { bemify } from '@utils/bemify'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import { ThemeChangeTrigger } from '@components/theme-change-trigger'
const bem = bemify(styles, 'about')

interface AboutProps {}

export const About = (props: AboutProps) => {
  return (
    <ContentWrapper className={bem()}>
      <ThemeChangeTrigger theme="light" className={bem('themeChangeTrigger')} />
      <h1>About</h1>
    </ContentWrapper>
  )
}
