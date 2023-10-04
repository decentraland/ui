import { NFT, Network, WearableCategory } from '@dcl/schemas'
import { CardProps } from '../Card/Card'

export type Badge = {
  label: string
  color: string
  icon?: string
  hideLabel?: boolean
}

export type NFTCardI18N = {
  network: {
    [keyof in Network]: string
  }
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

export type Props = CardProps & {
  nft: NFT
  i18n?: NFTCardI18N
  price?: string
  subtitle?: React.ReactNode | string
  header?: React.ReactNode | string
  badges?: React.ReactNode | string
}
