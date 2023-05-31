import { useRouter } from 'next/router'
import { useEffect } from 'react'
/**
 * Show spinner when route is changing
 */

export function useRouteChangeSpinner() {
  const { events } = useRouter()

  useEffect(() => {
    const handleStart = () => {
      document.documentElement.classList.add('loading')
    }
    const handleComplete = () => {
      document.documentElement.classList.remove('loading')
    }

    events.on('routeChangeStart', handleStart)
    events.on('routeChangeComplete', handleComplete)
    events.on('routeChangeError', handleComplete)

    return () => {
      events.off('routeChangeStart', handleStart)
      events.off('routeChangeComplete', handleComplete)
      events.off('routeChangeError', handleComplete)
    }
  }, [events])
}
