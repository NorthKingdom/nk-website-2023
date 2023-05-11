import React from 'react'
import { debounce } from '@/utils/debounce'

export const useResize = (callback: (event: Event) => void, { wait = 100 }: { wait: number }): void => {
  const callbackRef = React.useRef(callback)

  React.useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  React.useEffect(() => {
    let handleResize: (event: Event) => void

    if (wait !== 0) {
      handleResize = debounce((event: Event) => callbackRef.current(event), wait)
    } else {
      handleResize = (event: Event) => callbackRef.current(event)
    }

    // trigger resize event on mount
    handleResize(new Event('resize'))

    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
