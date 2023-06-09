/* eslint-disable no-invalid-this */
export const debounce = (fn: () => void, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args as never), ms)
  }
}
