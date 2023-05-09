import block from 'bem-css-modules'
block.setSettings({ throwOnError: false, modifierDelimiter: '--' })

export function bemify(stylesheet: { readonly [key: string]: string }, rootClass: string) {
  return block(stylesheet, rootClass)
}
