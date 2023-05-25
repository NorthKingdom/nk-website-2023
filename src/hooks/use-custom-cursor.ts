import Cursor, { type CursorChild } from '@utils/cursor'
import { useState, useEffect, type RefObject } from 'react'

interface UseCustomCursorProps {
  cursorRef: RefObject<HTMLDivElement>
  options?: {
    enabled: boolean
  }
}

/**
 * Hook to instantiate a cursor-follow effect with the given element (see 'src/utils/cursor.ts').
 * @param cursorRef The ref of the element to follow the cursor.
 * @param options The options for the cursor-follow effect.
 * @param options.enabled Whether the cursor-follow effect should be enabled.
 * @returns The cursor-follow effect and the Cursor instance.
 * @example
 * ```tsx
 * const cursorRef = useRef<HTMLDivElement>(null)
 * const { effect, cursor } = useCustomCursor(cursorRef, { enabled: true })
 * ```
 */
export function useCustomCursor(
  cursorRef: UseCustomCursorProps['cursorRef'],
  options?: UseCustomCursorProps['options']
) {
  const { enabled = true } = options || {}
  const [effect, setEffect] = useState<CursorChild>()

  useEffect(() => {
    if (!cursorRef.current || !enabled) return

    const { effect, unsubscribe } = Cursor.subscribe(cursorRef.current)
    setEffect(effect)

    return () => unsubscribe()
  }, [enabled, cursorRef])

  return {
    effect,
    cursor: Cursor,
  }
}
