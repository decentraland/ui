import { NFT, Network, WearableCategory } from '@dcl/schemas'
import { StrictCardProps } from '../Card/Card'

export type Badge = {
  label: string
  color: string
  textColor?: string
  icon?: string
  hideLabel?: boolean
}

export type NFTCardI18N = {
  network: Partial<{ [key in keyof typeof Network]: string }>
  bodyShape: {
    male: string
    female: string
    unisex: string
  }
  playMode: {
    loop: string
    once: string
  }
  category: {
    [keyof in WearableCategory]: string
  }
  withSound: string
  smart: string
}

export type Props = StrictCardProps & {
  nft: NFT
  i18n?: NFTCardI18N
  price?: string
  subtitle?: React.ReactNode | string
  header?: React.ReactNode | string
  badges?: React.ReactNode | string
  target?: string
}
