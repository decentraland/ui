export const getEstateCenter = (selection: { x: number; y: number }[]) => {
  const xs = Array.from(new Set(selection.map((coords) => coords.x).sort()))
  const ys = Array.from(new Set(selection.map((coords) => coords.y).sort()))
  const x = xs[(xs.length / 2) | 0]
  const y = ys[(ys.length / 2) | 0]
  return [x, y]
}
