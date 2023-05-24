import { useState, useEffect } from 'react'

/**
 * Listen for `matchMedia` change events and determine if the `document`
 * currently matches the provided media query string.
 */
export function useMatchMedia(mediaQuery: string, initial = false): boolean {
  const [matches, setMatches] = useState(initial)
  // const [matches, setMatches] = useState(() =>
  //   typeof window !== 'undefined' ? window.matchMedia(mediaQuery).matches : initial
  // )

  useEffect(() => {
    const mediaQueryList = matchMedia(mediaQuery)

    function onChange() {
      setMatches(mediaQueryList.matches)
    }

    onChange()
    mediaQueryList.addEventListener('change', onChange)
    return () => {
      mediaQueryList.removeEventListener('change', onChange)
    }
  }, [mediaQuery])

  return matches
}
