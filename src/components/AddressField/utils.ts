export function isValid(addr: string) {
  return /^0x[a-fA-F0-9]{40}$/g.test(addr)
}

export function shorten(address: string) {
  return address ? address.slice(0, 6) + '...' + address.slice(42 - 5) : ''
}
