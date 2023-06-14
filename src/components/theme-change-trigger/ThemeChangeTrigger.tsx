import { useEffect, useId, useRef } from 'react'
import styles from './ThemeChangeTrigger.module.scss'
import { useInViewEffect } from 'react-hook-inview'
import { useGlobalStateStore } from '@store'
import cx from 'clsx'
interface ThemeChangeTriggerProps {
  id?: string
  theme: 'light' | 'dark'
  debug?: boolean
  className?: string
  style?: React.CSSProperties
}

export const ThemeChangeTrigger = ({
  id = '',
  theme,
  debug = false,
  className = '',
  style = {},
}: ThemeChangeTriggerProps) => {
  const _id = useId()
  const refId = id || _id
  const isRegistered = useRef(false)
  const get = useGlobalStateStore((state) => state.get)
  const setPageTheme = useGlobalStateStore((state) => state.setTheme)
  const themeTriggers = useGlobalStateStore((state) => state.themeTriggers)
  const registerThemeTrigger = useGlobalStateStore((state) => state.registerThemeTrigger)
  const previousSectionTheme = useRef(get().theme)

  /**
   * Store the theme of the previous section (or the page theme if there is no previous section)
   */
  useEffect(() => {
    const triggerIndex = themeTriggers.findIndex((trigger) => trigger.id === refId)
    const previousTriggerTheme = themeTriggers[triggerIndex - 1]?.theme
    previousSectionTheme.current = previousTriggerTheme ?? get().theme
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeTriggers])

  const ref = useInViewEffect(
    ([entry]) => {
      // register the trigger
      if (!isRegistered.current) {
        registerThemeTrigger({
          id: refId,
          theme,
          top: entry.boundingClientRect.top,
        })
        isRegistered.current = true
      }

      const { isIntersecting, boundingClientRect } = entry
      const isTriggerEnteringFromTopOfScreen = isIntersecting && boundingClientRect.top < window.innerHeight * 0.3
      const isTriggerLeavingFromTopOfScreen = !isIntersecting && boundingClientRect.top < 0

      // when the trigger is leaving from the top of the screen, it means we are entering a new section, so we set the page theme to the new theme
      if (isTriggerLeavingFromTopOfScreen) {
        setPageTheme(theme)
        // when the trigger is entering from the top of the screen, it means we are leaving a section, so we set the page theme to the previous theme
      } else if (isTriggerEnteringFromTopOfScreen) {
        setPageTheme(previousSectionTheme.current)
      }
    },
    { threshold: 0.5 }
  )

  return (
    <div
      ref={ref}
      className={cx(styles['themeChangeTrigger'], className)}
      style={style}
      aria-hidden="true"
      data-debug={debug}
    >
      {debug && <div style={{ fontSize: '20px', position: 'absolute', top: '10px', color: 'red' }}>{theme}</div>}
    </div>
  )
}
