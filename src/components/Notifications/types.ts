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

export const CURRENT_AVAILABLE_NOTIFICATIONS = [
  'item_sold',
  'royalties_earned',
  'bid_accepted',
  'bid_received',
  'governance_announcement',
  'governance_proposal_enacted',
  'governance_coauthor_requested',
  'governance_authored_proposal_finished',
  'governance_voting_ended_voter',
  'governance_new_comment_on_proposal',
  'worlds_missing_resources',
  'worlds_access_restricted',
  'worlds_access_restored'
] as const

type DecentralandNotificationTypeTuple = typeof CURRENT_AVAILABLE_NOTIFICATIONS

export type DecentralandNotificationType =
  DecentralandNotificationTypeTuple[number]

// Marketplace Notifications

type CommonNFTNotificationMetadata = {
  link: string
  image: string
  rarity: Rarity
  nftName: string
  network: 'ethereum' | 'polygon'
  category: NFTCategory
}

type ItemSoldMetadata = CommonNFTNotificationMetadata & {
  seller: string
}

type RoyalitesEarnedMetadata = CommonNFTNotificationMetadata & {
  royaltiesCollector: string
  royaltiesCut: string
}

type BidAcceptedMetadata = CommonNFTNotificationMetadata & {
  price: string
}

type BidReceivedMetadata = CommonNFTNotificationMetadata & {
  price: string
}

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

type MarketplaceNotifications =
  | ItemSoldNotification
  | RoyalitesEarnedNotification
  | BidAcceptedNotification
  | BidReceivedNotification

// Governance Notifications

type CommonGovernanceNotificationMetadata = {
  proposalId: string
  proposalTitle: string
  title: string
  description: string
  link: string
}

export type GovernanceAnnouncementNotification = RawDecentralandNotification<
  'governance_announcement',
  Omit<CommonGovernanceNotificationMetadata, 'proposalId' | 'proposalTitle'>
>
export type GovernanceProposalEnactedNotification = RawDecentralandNotification<
  'governance_proposal_enacted',
  CommonGovernanceNotificationMetadata
>
export type GovernanceCoauthorRequestedNotification =
  RawDecentralandNotification<
    'governance_coauthor_requested',
    CommonGovernanceNotificationMetadata
  >
export type GovernanceAuthoredProposalFinishedNotification =
  RawDecentralandNotification<
    'governance_authored_proposal_finished',
    CommonGovernanceNotificationMetadata
  >
export type GovernanceVotingEndedVoterNotification =
  RawDecentralandNotification<
    'governance_voting_ended_voter',
    CommonGovernanceNotificationMetadata
  >
export type GovernanceNewCommentOnProposalNotification =
  RawDecentralandNotification<
    'governance_new_comment_on_proposal',
    CommonGovernanceNotificationMetadata
  >

type GovernanceNotifications =
  | GovernanceAnnouncementNotification
  | GovernanceProposalEnactedNotification
  | GovernanceCoauthorRequestedNotification
  | GovernanceAuthoredProposalFinishedNotification
  | GovernanceVotingEndedVoterNotification
  | GovernanceNewCommentOnProposalNotification

// Worlds Notifications

type CommonWolrdsNotificationMetadata = {
  title: string
  description: string
  url: string
}

type WorldsNotificationMetadataWithWhen = CommonWolrdsNotificationMetadata & {
  when: number
}

export type WorldsMissingResourcesNotification = RawDecentralandNotification<
  'worlds_missing_resources',
  WorldsNotificationMetadataWithWhen
>

export type WorldsAccessRestrictedNotification = RawDecentralandNotification<
  'worlds_access_restricted',
  WorldsNotificationMetadataWithWhen
>

export type WorldsAccessRestoredNotification = RawDecentralandNotification<
  'worlds_access_restored',
  CommonWolrdsNotificationMetadata
>

type WorldsNotifications =
  | WorldsMissingResourcesNotification
  | WorldsAccessRestrictedNotification
  | WorldsAccessRestoredNotification

export type DCLNotification =
  | MarketplaceNotifications
  | GovernanceNotifications
  | WorldsNotifications

export type CommonNotificationProps<N> = {
  notification: N
  locale: NotificationLocale
}
