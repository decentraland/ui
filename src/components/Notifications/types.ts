import { NFTCategory, Rarity } from '@dcl/schemas'

export type ActiveTab = 'newest' | 'read'

export type NotificationLocale = 'en' | 'es' | 'zh'

type RawDecentralandNotification<T extends DecentralandNotificationType, M> = {
  type: T
  address: string
  timestamp: number
  read: boolean
  created_at: string
  updated_at: string
  metadata: M
}

export type DecentralandNotificationType = 'item_sold' | 'royalties_earned'

type CommonNFTMetadata = {
  link: string
  image: string
  rarity: Rarity
  nftName: string
  network: 'ethereum' | 'polygon'
  category: NFTCategory
}

type ItemSoldMetadata = CommonNFTMetadata & {
  seller: string
}

type RoyalitesEarnedMetadata = CommonNFTMetadata & {
  royaltiesCollector: string
  royaltiesCut: string
}

export type MetadataTypes = ItemSoldMetadata | RoyalitesEarnedMetadata

export type ItemSoldNotification = RawDecentralandNotification<
  'item_sold',
  ItemSoldMetadata
>

export type RoyalitesEarnedNotification = RawDecentralandNotification<
  'royalties_earned',
  RoyalitesEarnedMetadata
>

export type DCLNotification = ItemSoldNotification | RoyalitesEarnedNotification
