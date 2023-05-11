import { useState, useEffect } from 'react'

/**
 * Listen for `matchMedia` change events and determine if the `document`
 * currently matches the provided media query string.
 */
export function useMatchMedia(mediaQuery: string, initial = false): boolean {
  const [matches, setMatches] = useState(initial)

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
