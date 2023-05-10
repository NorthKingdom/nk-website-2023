import { useMatchMedia } from './use-match-media'

/**
 * !IMPORTANT
 * Make sure the breakpoints here match the media queries in Sass
 */
const breakpoints = {
  mobile: 450,
  tablet: 768,
  desktopSmall: 1024,
  desktop: 1440,
}

/**
 * Listen for `matchMedia` change events and determine if the `document`
 * currently matches the provided media query string.
 */
export function useBreakpointFrom(breakpoint: keyof typeof breakpoints): boolean {
  return useMatchMedia(`(min-width:${breakpoints[breakpoint]}px)`)
}

/**
 * Listen for `matchMedia` change events and determine if the `document`
 * currently matches the provided media query string.
 */
export function useBreakpointUntil(breakpoint: keyof typeof breakpoints): boolean {
  return useMatchMedia(`(max-width:${breakpoints[breakpoint]}px)`)
}
