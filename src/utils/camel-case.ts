/**
 * Turns a string into camel case
 * @param str
 * @returns Camel case string (e.g. 'hello world' -> 'helloWorld')
 */
export function camelCase(str = '') {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word: string, index: any) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}
