/**
 * Converts an hexadecimal color into a RGB one.
 * @param hex - A color represented as a 8 digits hexadecimal color.
 */
export const hex2rgb = (hex: string): { r: number; g: number; b: number } => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}
