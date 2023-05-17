import { useRef } from 'react'
import styles from './ThemeChangeTrigger.module.scss'
import { useInViewEffect } from 'react-hook-inview'
import { useGlobalStateStore } from '@store'
import cx from 'clsx'

interface ThemeChangeTriggerProps {
  theme: 'light' | 'dark'
  debug?: boolean
  className?: string
  style?: React.CSSProperties
}

export const ThemeChangeTrigger = ({ theme, debug = true, className = '', style = {} }: ThemeChangeTriggerProps) => {
  const get = useGlobalStateStore((state) => state.get)
  const setTheme = useGlobalStateStore((state) => state.setTheme)
  const previousTheme = useRef(get().theme)

  const ref = useInViewEffect(([entry], observer) => {
    if (entry.isIntersecting) {
      if (entry.boundingClientRect.top < window.innerHeight) {
        setTheme(previousTheme.current)
      }
    } else {
      if (entry.boundingClientRect.top < 0) {
        previousTheme.current = get().theme
        setTheme(theme ?? previousTheme.current)
      }
    }
  })

  return (
    <div
      ref={ref}
      className={cx(styles['themeChangeTrigger'], className)}
      style={style}
      aria-hidden="true"
      data-debug={debug}
    />
  )
}
