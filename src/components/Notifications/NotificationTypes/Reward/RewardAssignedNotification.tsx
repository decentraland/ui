import React from 'react'

import ItemAirdropped from '../../../Icons/Notifications/ItemAirdropped'
import {
  CommonNotificationProps,
  RewardAssignedNotification
} from '../../types'
import NotificationItem from '../../NotificationItem'
import { getBGColorByRarity } from '../../utils'
import NotificationItemNFTLink from '../../NotificationItemNFTLink'

const i18N = {
  en: {
    description: (reward: RewardAssignedNotification['metadata']): React.ReactNode => (
      <>
        This
        <NotificationItemNFTLink
          rarity={reward.rarity}
          name={reward.nftName}
          link={reward.link}
        />
        was gifted to you
      </>
    ),
    title: 'Item Airdropped'
  },
  es: {
    description: (reward: RewardAssignedNotification['metadata']): React.ReactNode => (
      <>
        El item
        <NotificationItemNFTLink
          rarity={reward.rarity}
          name={reward.nftName}
          link={reward.link}
        />
        fue regalado para ti
      </>
    ),
    title: 'Regalo enviado'
  },
  zh: {
    description: (reward: RewardAssignedNotification['metadata']): React.ReactNode => (
      <>
        这
        <NotificationItemNFTLink
          rarity={reward.rarity}
          name={reward.nftName}
          link={reward.link}
        />
        被天赋
      </>
    ),
    title: '物品空调'
  }
}

export default function RewardAssignedNotification({
  notification,
  locale,
  renderProfile
}: CommonNotificationProps<RewardAssignedNotification>) {
  return (
    <NotificationItem
      image={{
        image: notification.metadata.image,
        backgroundColor: getBGColorByRarity(notification.metadata.rarity),
        icon: <ItemAirdropped />
      }}
      timestamp={notification.timestamp}
      isNew={!notification.read}
      locale={locale}
    >
      <p className="dcl notification-item__content-title">
        {i18N[locale].title}
      </p>
      <p className="dcl notification-item__content-description">
        {i18N[locale].description(notification.metadata)}
      </p>
    </NotificationItem>
  )
}
