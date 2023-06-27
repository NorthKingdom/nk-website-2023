import { useCallback } from 'react'
import { useInViewEffect } from 'react-hook-inview'

/**
 * Toggle animation className on each child when a parent element is in the viewport.
 */
export function useInViewAnimation(
  className = 'animate-fade-up',
  { threshold = 0.25, stagger = false, staggerDelay = 0.175, initialDelay = 0 } = {}
) {
  const observe = useInViewEffect(
    ([entry], observer) => {
      if (entry?.isIntersecting) {
        entry.target.classList.add(className)
        observer.disconnect()
      }
    },
    { threshold }
  )

  const setChildren = useCallback(
    (node: HTMLElement | null) => {
      if (node) {
        observe(node)
        if (!stagger) {
          node.style.opacity = '0'
          node.style.animationDelay = `${initialDelay}s`
        } else {
          const children = node.children as HTMLCollectionOf<HTMLElement>
          node.classList.add('stagger')

          for (let i = 0; i < children.length; i += 1) {
            const child = children[i]
            child.style.opacity = '0'
            child.style.animationDelay = `${initialDelay + staggerDelay * i}s`
          }
        }
      }
    },
    [observe, staggerDelay, stagger, initialDelay]
  )

  return setChildren
}
