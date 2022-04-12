export function createDebounce() {
  let timeout = null
  return (
    fn: (...args: unknown[]) => unknown,
    ms: number,
    ...args: unknown[]
  ) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(fn, ms, ...args)
  }
}
