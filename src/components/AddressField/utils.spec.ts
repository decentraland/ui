import { isValid, shorten } from './utils'

describe('isValid', () => {
  it('should return false when address is undefined', () => {
    expect(isValid(undefined)).toBe(false)
  })

  it("should return false when address doesn't match regex", () => {
    expect(isValid('0x')).toBe(false)
  })

  it('should return true when address matches regex', () => {
    expect(isValid('0x89805E5f0698Cb4dB57f0E389f2a75259f78CC22')).toBe(true)
  })
})

describe('shorten', () => {
  it('should return empty string when address is not defined', () => {
    expect(shorten(undefined)).toBe('')
  })

  it('should return first and last 5 items', () => {
    expect(shorten('0x89805E5f0698Cb4dB57f0E389f2a75259f78CC22')).toBe(
      '0x8980...8CC22'
    )
  })
})
