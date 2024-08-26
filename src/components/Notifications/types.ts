import { NFTCategory, NotificationType, Rarity } from '@dcl/schemas'

export enum NotificationActiveTab {
  NEWEST = 'newest',
  READ = 'read'
}

export type NotificationLocale = 'en' | 'es' | 'zh'

export type RawDecentralandNotification<T extends NotificationType, M> = {
  id: string
  type: T
  address: string
  timestamp: number
  read: boolean
  created_at: string
  updated_at: string
  metadata: M
}

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
  NotificationType.ITEM_SOLD,
  ItemSoldMetadata
>

export type RoyalitesEarnedNotification = RawDecentralandNotification<
  NotificationType.ROYALTIES_EARNED,
  RoyalitesEarnedMetadata
>

export type BidAcceptedNotification = RawDecentralandNotification<
  NotificationType.BID_ACCEPTED,
  BidAcceptedMetadata
>

export type BidReceivedNotification = RawDecentralandNotification<
  NotificationType.BID_RECEIVED,
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
  NotificationType.GOVERNANCE_ANNOUNCEMENT,
  Omit<CommonGovernanceNotificationMetadata, 'proposalId' | 'proposalTitle'>
>
export type GovernanceProposalEnactedNotification = RawDecentralandNotification<
  NotificationType.GOVERNANCE_PROPOSAL_ENACTED,
  CommonGovernanceNotificationMetadata
>
export type GovernanceCoauthorRequestedNotification =
  RawDecentralandNotification<
    NotificationType.GOVERNANCE_COAUTHOR_REQUESTED,
    CommonGovernanceNotificationMetadata
  >
export type GovernanceAuthoredProposalFinishedNotification =
  RawDecentralandNotification<
    NotificationType.GOVERNANCE_AUTHORED_PROPOSAL_FINISHED,
    CommonGovernanceNotificationMetadata
  >
export type GovernanceVotingEndedVoterNotification =
  RawDecentralandNotification<
    NotificationType.GOVERNANCE_VOTING_ENDED_VOTER,
    CommonGovernanceNotificationMetadata
  >
export type GovernanceNewCommentOnProposalNotification =
  RawDecentralandNotification<
    NotificationType.GOVERNANCE_NEW_COMMENT_ON_PROPOSAL,
    CommonGovernanceNotificationMetadata
  >
export type GovernanceNewCommentOnProjectUpdateNotification =
  RawDecentralandNotification<
    NotificationType.GOVERNANCE_NEW_COMMENT_ON_PROJECT_UPDATE,
    CommonGovernanceNotificationMetadata
  >

export type GovernancePitchPassedNotification = RawDecentralandNotification<
  NotificationType.GOVERNANCE_PITCH_PASSED,
  CommonGovernanceNotificationMetadata
>

export type GovernanceTenderPassedNotification = RawDecentralandNotification<
  NotificationType.GOVERNANCE_TENDER_PASSED,
  CommonGovernanceNotificationMetadata
>

export type GovernanceVotedOnBehalfNotification = RawDecentralandNotification<
  NotificationType.GOVERNANCE_VOTED_ON_BEHALF,
  CommonGovernanceNotificationMetadata
>

export type GovernanceWhaleVoteNotification = RawDecentralandNotification<
  NotificationType.GOVERNANCE_WHALE_VOTE,
  CommonGovernanceNotificationMetadata
>

export type GovernanceCliffEndedNotification = RawDecentralandNotification<
  NotificationType.GOVERNANCE_CLIFF_ENDED,
  CommonGovernanceNotificationMetadata
>

type GovernanceNotifications =
  | GovernanceAnnouncementNotification
  | GovernanceProposalEnactedNotification
  | GovernanceCoauthorRequestedNotification
  | GovernanceCliffEndedNotification
  | GovernanceAuthoredProposalFinishedNotification
  | GovernanceVotingEndedVoterNotification
  | GovernanceNewCommentOnProposalNotification
  | GovernanceNewCommentOnProjectUpdateNotification
  | GovernancePitchPassedNotification
  | GovernanceTenderPassedNotification
  | GovernanceVotedOnBehalfNotification
  | GovernanceWhaleVoteNotification

// Worlds Notifications

type CommonWorldsNotificationMetadata = {
  title: string
  description: string
  url: string
}

type WorldsNotificationMetadataWithWhen = CommonWorldsNotificationMetadata & {
  when: number
}

export type WorldsMissingResourcesNotification = RawDecentralandNotification<
  NotificationType.WORLDS_MISSING_RESOURCES,
  WorldsNotificationMetadataWithWhen
>

export type WorldsAccessRestrictedNotification = RawDecentralandNotification<
  NotificationType.WORLDS_ACCESS_RESTRICTED,
  WorldsNotificationMetadataWithWhen
>

export type WorldsAccessRestoredNotification = RawDecentralandNotification<
  NotificationType.WORLDS_ACCESS_RESTORED,
  CommonWorldsNotificationMetadata
>

type WorldPermissionMetadata = {
  title: string
  description: string
  world: string
  permissions: string[]
}

export type WorldsPermissionGrantedNotification = RawDecentralandNotification<
  NotificationType.WORLDS_PERMISSION_GRANTED,
  WorldPermissionMetadata
>

export type WorldsPermissionRevokedNotification = RawDecentralandNotification<
  NotificationType.WORLDS_PERMISSION_REVOKED,
  WorldPermissionMetadata
>

type WorldsNotifications =
  | WorldsMissingResourcesNotification
  | WorldsAccessRestrictedNotification
  | WorldsAccessRestoredNotification
  | WorldsPermissionGrantedNotification
  | WorldsPermissionRevokedNotification

// Land Notifications
type LandNotificationMetadata = {
  description: string
  link: string
  title: string
  contract: string
  lessor: string
  tenant: string
  operator: string
  startedAt: string
  endedAt: string
  tokenId: string
  land: string
}

export type LandRentedNotification = RawDecentralandNotification<
  NotificationType.LAND_RENTED,
  LandNotificationMetadata
>

export type LandRentalEndedNotification = RawDecentralandNotification<
  NotificationType.LAND_RENTAL_ENDED,
  LandNotificationMetadata
>

type LandNotifications = LandRentedNotification | LandRentalEndedNotification

// Reward Notifications

export type RewardAssignedNotification = RawDecentralandNotification<
  NotificationType.REWARD_ASSIGNED,
  {
    tokenName: string
    tokenImage: string
    tokenRarity: Rarity
  }
>
type CommonEventsMetadata = {
  image: string
  link: string
  name: string
}

// events notifications
export type EventsStartsSoonNotification = RawDecentralandNotification<
  NotificationType.EVENTS_STARTS_SOON,
  CommonEventsMetadata & {
    startsAt: string
    endsAt: string
  }
>

export type EventsStartedNotification = RawDecentralandNotification<
  NotificationType.EVENTS_STARTED,
  CommonEventsMetadata
>

type EventsNotificatiosn =
  | EventsStartsSoonNotification
  | EventsStartedNotification

export type DCLNotification =
  | MarketplaceNotifications
  | GovernanceNotifications
  | WorldsNotifications
  | LandNotifications
  | RewardAssignedNotification
  | EventsNotificatiosn

export type CommonNotificationProps<N> = {
  notification: N
  locale: NotificationLocale
  renderProfile?: (address: string) => JSX.Element | string | null
}
