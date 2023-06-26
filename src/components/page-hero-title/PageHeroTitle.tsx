import React, { useEffect, useRef, useState } from 'react'
import { animate, stagger } from 'framer-motion'
import { EASINGS } from '@utils/motion-guidelines'
import styles from './PageHeroTitle.module.scss'

import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'

interface PageHeroTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  show: boolean
}

export const PageHeroTitle = ({ show, children }: PageHeroTitleProps) => {
  const ref = useRef<HTMLHeadingElement>(null)
  const isSSR = typeof window === 'undefined'
  const [isTextSplit, setIsTextSplit] = useState(false)

  /**
   * Split text
   * Splitting.js only wraps words and whitespaces into <span> elements
   * in order to animate lines, we need to wrap the words in each line (as detected by splitting.js)
   * into wrapper elements
   */
  useEffect(() => {
    if (!ref.current) return

    async function parse() {
      if (!isSSR && ref.current) {
        const container = ref.current as HTMLElement
        // @ts-ignore
        const Splitting = (await import('splitting')).default
        const results = Splitting({ target: container, by: 'lines' })
        const lines = results[0].lines

        ref.current.innerHTML = ''

        lines.forEach((line: HTMLElement[]) => {
          const lineWrapper = document.createElement('span')
          lineWrapper.classList.add(styles.line)

          const lineWrapperInner = document.createElement('span')
          lineWrapperInner.classList.add(styles.line__inner)
          lineWrapper.appendChild(lineWrapperInner)

          line.forEach((word) => {
            lineWrapperInner.appendChild(word)
            lineWrapperInner.appendChild(createWhitespaceElement())
          })

          if (ref.current) ref.current.appendChild(lineWrapper)
          setIsTextSplit(true)
        })
      }
    }

    parse()
  }, [isSSR])

  useEffect(() => {
    if (!ref.current || !isTextSplit || !show) return
    ref.current.style.opacity = '1'

    const lines = ref.current.querySelectorAll(`.${styles.line} > .${styles.line__inner}`)

    let ctrls = animate(
      lines,
      {
        y: ['150%', '0%'],
        rotate: [15, 0],
      },
      {
        duration: 1.2,
        ease: EASINGS.EASE_OUT_EXPO as any,
        delay: stagger(0.1, { startDelay: 0.1 }),
      }
    )

    return () => {
      ctrls.stop()
    }
  }, [isTextSplit, show])

  return (
    <h1 className="container" content={children as string} ref={ref} style={{ opacity: 0 }}>
      {children}
    </h1>
  )
}

function createWhitespaceElement() {
  const el = document.createElement('span')
  el.classList.add(styles.whitespace)
  el.innerHTML = ' '
  return el
}
