/**
 * Check if a route is active with Regex
 * @param route - Route to check
 * @param currentRoute - Current route
 * @returns True if route is active
 */
export function isRouteActive(route = '', currentRoute = '') {
  const routeRegex = new RegExp(`^/${route}`)
  return routeRegex.test(currentRoute)
}
