import { useEffect } from 'react'

export function useOrientation() {
  const [isLandscape, setIsLandscape] = useState(false)
  const isPortrait = !isLandscape

  const detectOrientation = (e: any) => {
    if (e.matches) {
      setIsLandscape(false)
    } else {
      setIsLandscape(true)
    }
  }

  useEffect(() => {
    let portrait = window.matchMedia('(orientation: portrait)')
    portrait.addEventListener('change', detectOrientation)
    return () => {
      portrait.removeEventListener('change', detectOrientation)
    }
  }, [])

  return {
    isLandscape,
    isPortrait,
  }
}
