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
  GovernanceProposalEnactedNotification,
  GovernanceVotingEndedVoterNotification,
  ItemSoldNotification,
  RoyaltiesEarnedNotification,
  WorldsAccessRestoredNotification,
  WorldsAccessRestrictedNotification,
  WorldsMissingResourcesNotification
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

export type DecentralandNotificationCmp<T> = T extends DCLNotification
  ? FunctionComponent<CommonNotificationProps<T>>
  : never

export const NotificationByType: Record<
  DecentralandNotificationType,
  DecentralandNotificationCmp<DCLNotification>
> = {
  [DecentralandNotificationType.ROYALTIES_EARNED]: RoyaltiesEarnedNotification,
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
  [DecentralandNotificationType.GOVERNANCE_PROPOSAL_ENACTED]:
    GovernanceProposalEnactedNotification,
  [DecentralandNotificationType.GOVERNANCE_VOTING_ENDED_VOTER]:
    GovernanceVotingEndedVoterNotification,
  [DecentralandNotificationType.WORLDS_MISSING_RESOURCES]:
    WorldsMissingResourcesNotification,
  [DecentralandNotificationType.WORLDS_ACCESS_RESTORED]:
    WorldsAccessRestoredNotification,
  [DecentralandNotificationType.WORLDS_ACCESS_RESTRICTED]:
    WorldsAccessRestrictedNotification
}
