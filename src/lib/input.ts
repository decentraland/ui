export function getInputValueLength(value: string | number | undefined | null) {
  if (value === undefined || value === null) {
    return 0
  }
  return typeof value === 'string' ? value.length : value.toString().length
}
