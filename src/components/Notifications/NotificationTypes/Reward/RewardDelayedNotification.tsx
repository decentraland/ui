import React from 'react'

import Reward from '../../../Icons/Notifications/Reward'
import {
  CommonNotificationProps,
  RewardDelayedNotification as RewardDelayedNotificationType
} from '../../types'
import NotificationItem from '../../NotificationItem'
import { getBGColorByRarity } from '../../utils'
import NotificationItemNFTLink from '../../NotificationItemNFTLink'
import { config } from '../../../../config'

const i18N = {
  en: {
    description: (
      reward: RewardDelayedNotificationType['metadata']
    ): React.ReactNode => (
      <>
        We're working on delivering your
        <NotificationItemNFTLink
          rarity={reward.tokenRarity}
          name={reward.tokenName}
          link={config.get('EXPLORER_URL')}
        />
        as soon as possible.
      </>
    ),
    title: 'Your Gift is Delayed'
  },
  es: {
    description: (
      reward: RewardDelayedNotificationType['metadata']
    ): React.ReactNode => (
      <>
        Estamos trabajando en entregar tu
        <NotificationItemNFTLink
          rarity={reward.tokenRarity}
          name={reward.tokenName}
          link={config.get('EXPLORER_URL')}
        />
        lo antes posible.
      </>
    ),
    title: 'Tu regalo está retrasado'
  },
  zh: {
    description: (
      reward: RewardDelayedNotificationType['metadata']
    ): React.ReactNode => (
      <>
        我们正在尽快交付您的
        <NotificationItemNFTLink
          rarity={reward.tokenRarity}
          name={reward.tokenName}
          link={config.get('EXPLORER_URL')}
        />
        。
      </>
    ),
    title: '您的礼物延迟了'
  }
}

/**
 * @deprecated Should start using the same component migrated to UI2.
 */
export default function RewardDelayedNotification({
  notification,
  locale
}: CommonNotificationProps<RewardDelayedNotificationType>) {
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
