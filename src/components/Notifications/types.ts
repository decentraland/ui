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

export enum DecentralandNotificationType {
  ITEM_SOLD = 'item_sold',
  ROYALTIES_EARNED = 'royalties_earned',
  BID_ACCEPTED = 'bid_accepted',
  BID_RECEIVED = 'bid_received',
  GOVERNANCE_ANNOUNCEMENT = 'governance_announcement',
  GOVERNANCE_PROPOSAL_ENACTED = 'governance_proposal_enacted',
  GOVERNANCE_COAUTHOR_REQUESTED = 'governance_coauthor_requested',
  GOVERNANCE_AUTHORED_PROPOSAL_FINISHED = 'governance_authored_proposal_finished',
  GOVERNANCE_VOTING_ENDED_VOTER = 'governance_voting_ended_voter',
  GOVERNANCE_NEW_COMMENT_ON_PROPOSAL = 'governance_new_comment_on_proposal',
  WORLDS_MISSING_RESOURCES = 'worlds_missing_resources',
  WORLDS_ACCESS_RESTRICTED = 'worlds_access_restricted',
  WORLDS_ACCESS_RESTORED = 'worlds_access_restored'
}

export const CURRENT_AVAILABLE_NOTIFICATIONS = [
  
] as const

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
  DecentralandNotificationType.ITEM_SOLD,
  ItemSoldMetadata
>

export type RoyalitesEarnedNotification = RawDecentralandNotification<
  DecentralandNotificationType.ROYALTIES_EARNED,
  RoyalitesEarnedMetadata
>

export type BidAcceptedNotification = RawDecentralandNotification<
  DecentralandNotificationType.BID_ACCEPTED,
  BidAcceptedMetadata
>

export type BidReceivedNotification = RawDecentralandNotification<
  DecentralandNotificationType.BID_RECEIVED,
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
  DecentralandNotificationType.GOVERNANCE_ANNOUNCEMENT,
  Omit<CommonGovernanceNotificationMetadata, 'proposalId' | 'proposalTitle'>
>
export type GovernanceProposalEnactedNotification = RawDecentralandNotification<
  DecentralandNotificationType.GOVERNANCE_PROPOSAL_ENACTED,
  CommonGovernanceNotificationMetadata
>
export type GovernanceCoauthorRequestedNotification =
  RawDecentralandNotification<
    DecentralandNotificationType.GOVERNANCE_COAUTHOR_REQUESTED,
    CommonGovernanceNotificationMetadata
  >
export type GovernanceAuthoredProposalFinishedNotification =
  RawDecentralandNotification<
    DecentralandNotificationType.GOVERNANCE_AUTHORED_PROPOSAL_FINISHED,
    CommonGovernanceNotificationMetadata
  >
export type GovernanceVotingEndedVoterNotification =
  RawDecentralandNotification<
    DecentralandNotificationType.GOVERNANCE_VOTING_ENDED_VOTER,
    CommonGovernanceNotificationMetadata
  >
export type GovernanceNewCommentOnProposalNotification =
  RawDecentralandNotification<
    DecentralandNotificationType.GOVERNANCE_NEW_COMMENT_ON_PROPOSAL,
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
  DecentralandNotificationType.WORLDS_MISSING_RESOURCES,
  WorldsNotificationMetadataWithWhen
>

export type WorldsAccessRestrictedNotification = RawDecentralandNotification<
  DecentralandNotificationType.WORLDS_ACCESS_RESTRICTED,
  WorldsNotificationMetadataWithWhen
>

export type WorldsAccessRestoredNotification = RawDecentralandNotification<
  DecentralandNotificationType.WORLDS_ACCESS_RESTORED,
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
