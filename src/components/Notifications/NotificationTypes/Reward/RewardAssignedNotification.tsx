import React from 'react'

import Reward from '../../../Icons/Notifications/Reward'
import {
  CommonNotificationProps,
  RewardAssignedNotification
} from '../../types'
import NotificationItem from '../../NotificationItem'
import { getBGColorByRarity } from '../../utils'
import NotificationItemNFTLink from '../../NotificationItemNFTLink'
import { config } from '../../../../config'

const i18N = {
  en: {
    description: (
      reward: RewardAssignedNotification['metadata']
    ): React.ReactNode => (
      <>
        This
        <NotificationItemNFTLink
          rarity={reward.tokenRarity}
          name={reward.tokenName}
          link={config.get('EXPLORER_URL')}
        />
        is already in your backpack
      </>
    ),
    title: 'New Item Received'
  },
  es: {
    description: (
      reward: RewardAssignedNotification['metadata']
    ): React.ReactNode => (
      <>
        El item
        <NotificationItemNFTLink
          rarity={reward.tokenRarity}
          name={reward.tokenName}
          link={config.get('EXPLORER_URL')}
        />
        ya esta disponible en tu backpack
      </>
    ),
    title: 'Nuevo artículo recibido'
  },
  zh: {
    description: (
      reward: RewardAssignedNotification['metadata']
    ): React.ReactNode => (
      <>
        这
        <NotificationItemNFTLink
          rarity={reward.tokenRarity}
          name={reward.tokenName}
          link={config.get('EXPLORER_URL')}
        />
        已经在您的背包里
      </>
    ),
    title: '收到的新项目'
  }
}

export default function RewardAssignedNotification({
  notification,
  locale
}: CommonNotificationProps<RewardAssignedNotification>) {
  return (
    <NotificationItem
      image={{
        image: notification.metadata.tokenImage,
        backgroundColor: getBGColorByRarity(notification.metadata.tokenRarity),
        icon: <Reward />
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
