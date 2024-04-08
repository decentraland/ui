import { Rarity } from '@dcl/schemas'
import {
  CommonNotificationProps,
  DCLNotification,
  DecentralandNotificationType
} from './types'

import {
  BidAcceptedNotification,
  BidReceivedNotification,
  GovernanceAnnouncementNotification,
  GovernanceAuthoredProposalFinishedNotification,
  GovernanceCoauthorRequestedNotification,
  GovernanceNewCommentOnProposalNotification,
  GovernanceNewCommentOnProjectUpdateNotification,
  GovernanceProposalEnactedNotification,
  GovernanceVotingEndedVoterNotification,
  ItemSoldNotification,
  LandRentalEndedNotification,
  LandRentedNotification,
  RoyaltiesEarnedNotification,
  WorldsAccessRestoredNotification,
  WorldsAccessRestrictedNotification,
  WorldsMissingResourcesNotification,
  EventsStartedNotification,
  EventsStartsSoonNotification,
  RewardAssignedNotification
} from './NotificationTypes'
import { FunctionComponent } from 'react'

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

export type DecentralandNotificationComponentByType<T> = {
  [k in DecentralandNotificationType]: T extends DCLNotification
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      FunctionComponent<CommonNotificationProps<any>>
    : never
}

export const NotificationComponentByType: DecentralandNotificationComponentByType<DCLNotification> =
  {
    [DecentralandNotificationType.ROYALTIES_EARNED]:
      RoyaltiesEarnedNotification,
    [DecentralandNotificationType.ITEM_SOLD]: ItemSoldNotification,
    [DecentralandNotificationType.BID_ACCEPTED]: BidAcceptedNotification,
    [DecentralandNotificationType.BID_RECEIVED]: BidReceivedNotification,
    [DecentralandNotificationType.GOVERNANCE_ANNOUNCEMENT]:
      GovernanceAnnouncementNotification,
    [DecentralandNotificationType.GOVERNANCE_COAUTHOR_REQUESTED]:
      GovernanceCoauthorRequestedNotification,
    [DecentralandNotificationType.GOVERNANCE_AUTHORED_PROPOSAL_FINISHED]:
      GovernanceAuthoredProposalFinishedNotification,
    [DecentralandNotificationType.GOVERNANCE_NEW_COMMENT_ON_PROPOSAL]:
      GovernanceNewCommentOnProposalNotification,
    [DecentralandNotificationType.GOVERNANCE_NEW_COMMENT_ON_PROJECT_UPDATE]:
      GovernanceNewCommentOnProjectUpdateNotification,
    [DecentralandNotificationType.GOVERNANCE_PROPOSAL_ENACTED]:
      GovernanceProposalEnactedNotification,
    [DecentralandNotificationType.GOVERNANCE_VOTING_ENDED_VOTER]:
      GovernanceVotingEndedVoterNotification,
    [DecentralandNotificationType.WORLDS_MISSING_RESOURCES]:
      WorldsMissingResourcesNotification,
    [DecentralandNotificationType.WORLDS_ACCESS_RESTORED]:
      WorldsAccessRestoredNotification,
    [DecentralandNotificationType.WORLDS_ACCESS_RESTRICTED]:
      WorldsAccessRestrictedNotification,
    [DecentralandNotificationType.LAND_RENTED]: LandRentedNotification,
    [DecentralandNotificationType.LAND_RENTAL_ENDED]:
      LandRentalEndedNotification,
    [DecentralandNotificationType.REWARD_ASSIGNED]: RewardAssignedNotification,
    [DecentralandNotificationType.EVENTS_STARTS_SOON]:
      EventsStartsSoonNotification,
    [DecentralandNotificationType.EVENTS_STARTED]: EventsStartedNotification
  }

export const CURRENT_AVAILABLE_NOTIFICATIONS = Object.values(
  DecentralandNotificationType
)
