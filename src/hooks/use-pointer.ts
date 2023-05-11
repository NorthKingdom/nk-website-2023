import { useRef, useEffect, useState } from 'react'
import { useWindowSize } from './use-window-size'
import { noop } from '@utils/noop'

type PointerEvent = TouchEvent | MouseEvent

interface PointerPosition {
  x: number
  y: number
}

interface usePointerProps {
  onDown?: (event: PointerEvent, position: PointerPosition) => void
  onMove?: (event: PointerEvent, position: PointerPosition) => void
  onUp?: (event: PointerEvent, position: PointerPosition) => void
}

/**
 * Returns the current position of the pointer as a ratio of the window size. (0, 0) is the top left corner, (1, 1) is the bottom right corner.
 * @returns {x: number, y: number}
 */
export const usePointer = ({ onDown = noop, onMove = noop, onUp = noop }: usePointerProps = {}) => {
  const [position] = useState({ x: 0, y: 0 })
  const { width, height } = useWindowSize()

  const onDownRef = useRef(onDown)
  const onMoveRef = useRef(onMove)
  const onUpRef = useRef(onUp)

  useEffect(() => {
    onDownRef.current = onDown
  }, [onDown])

  useEffect(() => {
    onMoveRef.current = onMove
  }, [onMove])

  useEffect(() => {
    onUpRef.current = onUp
  }, [onUp])

  useEffect(() => {
    if (!width || !height) return

    function _onDown(event: TouchEvent | MouseEvent) {
      const { clientX, clientY } = (event as TouchEvent).changedTouches
        ? (event as TouchEvent).changedTouches[0]
        : (event as MouseEvent)
      position.x = clientX / width
      position.y = clientY / height
      onDownRef.current(event, position)
    }

    function _onMove(event: TouchEvent | MouseEvent) {
      const { clientX, clientY } = (event as TouchEvent).changedTouches
        ? (event as TouchEvent).changedTouches[0]
        : (event as MouseEvent)
      position.x = clientX / width
      position.y = clientY / height
      onMoveRef.current(event, position)
    }

    function _onUp(event: TouchEvent | MouseEvent) {
      const { clientX, clientY } = (event as TouchEvent).changedTouches
        ? (event as TouchEvent).changedTouches[0]
        : (event as MouseEvent)
      position.x = clientX / width
      position.y = clientY / height
      onUpRef.current(event, position)
    }

    function removeMouseEventListeners() {
      window.removeEventListener('mousedown', _onDown, false)
      window.removeEventListener('mouseup', _onUp, false)
      window.removeEventListener('mousemove', _onMove, false)
      window.removeEventListener('touchstart', removeMouseEventListeners, false)
    }

    function addEventListeners() {
      window.addEventListener('mousedown', _onDown, { passive: true })
      window.addEventListener('mouseup', _onUp, { passive: true })
      window.addEventListener('mousemove', _onMove, { passive: true })
      window.addEventListener('touchstart', _onDown, { passive: true })
      window.addEventListener('touchend', _onUp, { passive: true })
      window.addEventListener('touchmove', _onMove, { passive: true })

      // remove mouse event listeners if a touch event is detected
      window.addEventListener('touchstart', removeMouseEventListeners, false)
    }

    function removeEventListeners() {
      window.removeEventListener('mousedown', _onDown, false)
      window.removeEventListener('mouseup', _onUp, false)
      window.removeEventListener('mousemove', _onMove, false)
      window.removeEventListener('touchstart', _onDown, false)
      window.removeEventListener('touchend', _onUp, false)
      window.removeEventListener('touchmove', _onMove, false)
      window.removeEventListener('touchstart', removeMouseEventListeners, false)
    }

    addEventListeners()
    return () => {
      removeEventListeners()
    }
  }, [width, height, position])

  return position
}
