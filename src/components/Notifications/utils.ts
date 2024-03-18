import { Rarity } from '@dcl/schemas'

export const MAXIMUM_FRACTION_DIGITS = 2

export function formatMana(
  mana: string,
  maximumFractionDigits = MAXIMUM_FRACTION_DIGITS
): string {
  return (Number(mana) / 1e18).toFixed(maximumFractionDigits).toLocaleString()
}

export function getBGColorByRarity(rarity: Rarity) {
  return Rarity.getGradient(rarity).join()
}
