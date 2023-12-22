import { NFTCategory, Rarity } from '@dcl/schemas'

export enum NotificationActiveTab {
  NEWEST = 'newest',
  READ = 'read'
}

export type NotificationLocale = 'en' | 'es' | 'zh'

type RawDecentralandNotification<T extends DecentralandNotificationType, M> = {
  id: string
  type: T
  address: string
  timestamp: number
  read: boolean
  created_at: string
  updated_at: string
  metadata: M
}

export type DecentralandNotificationType =
  | 'item_sold'
  | 'royalties_earned'
  | 'bid_accepted'
  | 'bid_received'

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

type BidAcceptedMetadata = CommonNFTMetadata & {
  price: string
}

type BidReceivedMetadata = CommonNFTMetadata & {
  price: string
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

export type BidAcceptedNotification = RawDecentralandNotification<
  'bid_accepted',
  BidAcceptedMetadata
>

export type BidReceivedNotification = RawDecentralandNotification<
  'bid_received',
  BidReceivedMetadata
>

export type DCLNotification =
  | ItemSoldNotification
  | RoyalitesEarnedNotification
  | BidAcceptedNotification
  | BidReceivedNotification
