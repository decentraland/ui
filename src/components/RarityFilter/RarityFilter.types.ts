import { Rarity } from '@dcl/schemas'

export type RarityFilterProps = {
  className?: string
  rarities: string[]
  i18n: {
    rarities: {
      [keyof in Rarity]: string
    }
    title: string
    all_rarities: string
    count_rarities: (count: number) => string
    tooltip: string
  }
  onChange: (value: Rarity[]) => void
  defaultCollapsed?: boolean
}
