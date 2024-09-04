import React from 'react'
import { Rarity, NotificationType } from '@dcl/schemas'
import { CommonNotificationProps, DCLNotification } from './types'

import {
  BidAcceptedNotification,
  BidReceivedNotification,
  GovernanceAnnouncementNotification,
  GovernanceAuthoredProposalFinishedNotification,
  GovernanceCoauthorRequestedNotification,
  GovernanceCliffEndedNotification,
  GovernanceNewCommentOnProposalNotification,
  GovernanceNewCommentOnProjectUpdateNotification,
  GovernanceProposalEnactedNotification,
  GovernanceVotingEndedVoterNotification,
  GovernancePitchPassedNotification,
  GovernanceTenderPassedNotification,
  ItemSoldNotification,
  LandRentalEndedNotification,
  LandRentedNotification,
  RoyaltiesEarnedNotification,
  WorldsAccessRestoredNotification,
  WorldsAccessRestrictedNotification,
  WorldsMissingResourcesNotification,
  EventsStartedNotification,
  EventsStartsSoonNotification,
  RewardAssignedNotification,
  WorldsPermissionGrantedNotification,
  WorldsPermissionRevokedNotification,
  GovernanceWhaleVoteNotification,
  GovernanceVotedOnBehalfNotification
} from './NotificationTypes'
import { FunctionComponent } from 'react'
import RewardInProgressNotification from './NotificationTypes/Reward/RewardInProgressNotification'
import CampaignOutOfStockNotification from './NotificationTypes/Reward/CampaignOutOfStockNotification'
import CampaignGasPriceHigherThanExpectedNotification from './NotificationTypes/Reward/CampaignGasPriceHigherThanExpectedNotification'
import CampaignOutOfFundsNotification from './NotificationTypes/Reward/CampaignOutOfFundsNotification'
import RewardDelayedNotification from './NotificationTypes/Reward/RewardDelayedNotification'

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
  [k in NotificationType]: T extends DCLNotification
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      FunctionComponent<CommonNotificationProps<any>>
    : never
}

export const NotificationComponentByType: DecentralandNotificationComponentByType<DCLNotification> =
  {
    [NotificationType.ROYALTIES_EARNED]: RoyaltiesEarnedNotification,
    [NotificationType.ITEM_SOLD]: ItemSoldNotification,
    [NotificationType.BID_ACCEPTED]: BidAcceptedNotification,
    [NotificationType.BID_RECEIVED]: BidReceivedNotification,
    [NotificationType.GOVERNANCE_ANNOUNCEMENT]:
      GovernanceAnnouncementNotification,
    [NotificationType.GOVERNANCE_COAUTHOR_REQUESTED]:
      GovernanceCoauthorRequestedNotification,
    [NotificationType.GOVERNANCE_AUTHORED_PROPOSAL_FINISHED]:
      GovernanceAuthoredProposalFinishedNotification,
    [NotificationType.GOVERNANCE_NEW_COMMENT_ON_PROPOSAL]:
      GovernanceNewCommentOnProposalNotification,
    [NotificationType.GOVERNANCE_NEW_COMMENT_ON_PROJECT_UPDATE]:
      GovernanceNewCommentOnProjectUpdateNotification,
    [NotificationType.GOVERNANCE_PROPOSAL_ENACTED]:
      GovernanceProposalEnactedNotification,
    [NotificationType.GOVERNANCE_VOTING_ENDED_VOTER]:
      GovernanceVotingEndedVoterNotification,
    [NotificationType.GOVERNANCE_PITCH_PASSED]:
      GovernancePitchPassedNotification,
    [NotificationType.GOVERNANCE_TENDER_PASSED]:
      GovernanceTenderPassedNotification,
    [NotificationType.GOVERNANCE_WHALE_VOTE]: GovernanceWhaleVoteNotification,
    [NotificationType.GOVERNANCE_CLIFF_ENDED]: GovernanceCliffEndedNotification,
    [NotificationType.GOVERNANCE_VOTED_ON_BEHALF]:
      GovernanceVotedOnBehalfNotification,
    [NotificationType.WORLDS_MISSING_RESOURCES]:
      WorldsMissingResourcesNotification,
    [NotificationType.WORLDS_ACCESS_RESTORED]: WorldsAccessRestoredNotification,
    [NotificationType.WORLDS_ACCESS_RESTRICTED]:
      WorldsAccessRestrictedNotification,
    [NotificationType.LAND_RENTED]: LandRentedNotification,
    [NotificationType.LAND_RENTAL_ENDED]: LandRentalEndedNotification,
    [NotificationType.REWARD_ASSIGNED]: RewardAssignedNotification,
    [NotificationType.REWARD_IN_PROGRESS]: RewardInProgressNotification,
    [NotificationType.REWARD_DELAYED]: RewardDelayedNotification,
    [NotificationType.REWARD_CAMPAIGN_OUT_OF_FUNDS]:
      CampaignOutOfFundsNotification,
    [NotificationType.REWARD_CAMPAIGN_OUT_OF_STOCK]:
      CampaignOutOfStockNotification,
    [NotificationType.REWARD_CAMPAIGN_GAS_PRICE_HIGHER_THAN_EXPECTED]:
      CampaignGasPriceHigherThanExpectedNotification,
    [NotificationType.BADGE_GRANTED]: null,
    [NotificationType.EVENTS_STARTS_SOON]: EventsStartsSoonNotification,
    [NotificationType.EVENTS_STARTED]: EventsStartedNotification,
    [NotificationType.WORLDS_PERMISSION_GRANTED]:
      WorldsPermissionGrantedNotification,
    [NotificationType.WORLDS_PERMISSION_REVOKED]:
      WorldsPermissionRevokedNotification
  }

export const CURRENT_AVAILABLE_NOTIFICATIONS = Object.values(NotificationType)

export const replaceWithValues = (
  str: string,
  values: Record<string, string | JSX.Element>
): JSX.Element | string => {
  const parts = str.split(/{|}/)
  const jsxElements = parts.map((part, index) => {
    if (index % 2 === 0) {
      return part
    } else {
      const value = values[part.trim()]
      return value !== undefined ? value : `{${part}}`
    }
  })

  return <>{jsxElements}</>
}
