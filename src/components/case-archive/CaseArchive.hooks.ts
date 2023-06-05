import { time } from 'console'
import { set } from 'lodash'
import type { RefObject } from 'react'
/**
 *
 * Case Archive List Animation Hook
 *
 * This hook is used to stagger-animate the case archive list
 * There are three distinct scenarios in which the case archive list is animated:
 * 1. When the list gets into view for the first time (the entire available list should animate in a staggered-way)
 * 2. When the list filter changes (the entire new list should animate in a staggered-way)
 * 3. When new items are added to the list after the user clicks on the load more button (only the new items should animate in a staggered-way)
 *
 * To that end, this hook exports 2 functions:
 * animateAllItems: This function is used to animate all the items in the list
 * animateNewItems: This function is used to animate only the new items in the list
 *
 * @params {ref} listRef - The ref of the list container
 * @returns {function} animateAllItems - The function that animates all the items in the list
 * @returns {function} animateNewItems - The function that animates only the new items in the list (the ones that have the data-revealed attribute set to false)
 */

const hide = (el: Element) => el.setAttribute('data-revealed', 'false')
const show = (el: Element) => el.setAttribute('data-revealed', 'true')
const setAnimationDelay = (el: Element, i: number, delay = 0.05) =>
  (el as HTMLElement).style.setProperty('--animation-delay', `${Math.min(i * delay, 1)}s`)

export const useCaseArchiveListAnimation = (listRef: RefObject<HTMLElement>) => {
  const animateNewItems = () => {
    if (!listRef.current) return

    let timeoutId: NodeJS.Timeout

    const listItems = listRef.current.querySelectorAll('li[data-revealed="false"]')

    listItems.forEach((el, i) => setAnimationDelay(el as HTMLElement, i))

    console.log('animate new items', listItems.length)

    if (typeof window?.requestIdleCallback === 'function') {
      requestIdleCallback(() => listItems.forEach(show))
    } else {
      timeoutId = setTimeout(() => listItems.forEach(show), 100)
    }

    return () => clearTimeout(timeoutId)
  }

  const animateAllItems = () => {
    if (!listRef.current) return

    let timeoutId: NodeJS.Timeout

    const listItems = listRef.current?.querySelectorAll('li')

    console.log('animate all items', listItems.length)

    // reset all of the items to their initial state
    listItems.forEach((el, i) => {
      hide(el)
      setAnimationDelay(el, i)
    })

    // animate all of the items
    if (typeof window?.requestIdleCallback === 'function') {
      requestIdleCallback(() => listItems.forEach(show))
    } else {
      timeoutId = setTimeout(() => listItems.forEach(show), 100)
    }

    // return cleanup function
    return () => clearTimeout(timeoutId)
  }

  return { animateAllItems, animateNewItems }
}
