import block from 'bem-css-modules'
block.setSettings({ throwOnError: false, modifierDelimiter: '--' })

/**
 * Utility function to create BEM CSS Modules classes.
 * Example:
 * ```ts
 * import styles from './MyComponent.module.scss'
 * const bem = bemify(styles, 'myComponent')
 *
 * ...
 * bem() -> ".myComponent"
 * bem('element') -> ".myComponent__element"
 * bem('element', 'modifier') -> ".myComponent__element--modifier"
 * bem('element', { modifier: true }) -> ".myComponent__element--modifier"
 * ```
 * @param stylesheet
 * @param rootClass
 * @returns
 */
export function bemify(stylesheet: { readonly [key: string]: string }, rootClass: string) {
  return block(stylesheet, rootClass)
}
