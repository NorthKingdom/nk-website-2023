import styles from './DebugGrid.module.scss'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
// @ts-ignore
import mousetrap from 'mousetrap'
import { useEffect, useState } from 'react'

export const DebugGrid = ({ showInstructions = false, ...props }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    mousetrap.bind(['command+g', 'ctrl+g'], (e: any) => {
      e.preventDefault()
      setShow((show) => !show)
    })

    return () => {
      mousetrap.unbind('g')
    }
  }, [])

  return (
    <>
      {show && (
        <ContentWrapper className={styles.container} {...props}>
          {showInstructions && <div className={styles.instructions}>Press COMMAND+G to toggle the debug grid</div>}
          <div className={styles.debugGrid}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={styles.debugGrid__column} />
            ))}
          </div>
        </ContentWrapper>
      )}
    </>
  )
}
