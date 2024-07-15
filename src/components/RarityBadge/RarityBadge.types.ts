import { MouseEventHandler } from 'react'
import { Rarity } from '@dcl/schemas'

export type RarityBadgeProps = {
  rarity: Rarity
  size: 'medium' | 'small'
  withTooltip: boolean
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  i18n: {
    rarities: {
      [keyof in Rarity]: string
    }
    rarities_description: {
      [keyof in Rarity]: string
    }
  }
}
