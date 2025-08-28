import React from 'react'

import Reward from '../../../Icons/Notifications/Reward'
import {
  CommonNotificationProps,
  RewardInProgressNotification
} from '../../types'
import NotificationItem from '../../NotificationItem'
import { getBGColorByRarity } from '../../utils'
import NotificationItemNFTLink from '../../NotificationItemNFTLink'
import { config } from '../../../../config'

const i18N = {
  en: {
    description: (
      reward: RewardInProgressNotification['metadata']
    ): React.ReactNode => (
      <>
        You've received a
        <NotificationItemNFTLink
          rarity={reward.tokenRarity}
          name={reward.tokenName}
          link={config.get('EXPLORER_URL')}
        />
        for free. Try it out once it arrives!
      </>
    ),
    title: 'A Gift is on its way!'
  },
  es: {
    description: (
      reward: RewardInProgressNotification['metadata']
    ): React.ReactNode => (
      <>
        Recibiste un
        <NotificationItemNFTLink
          rarity={reward.tokenRarity}
          name={reward.tokenName}
          link={config.get('EXPLORER_URL')}
        />
        gratis. ¡Pruebalo cuando llegue!
      </>
    ),
    title: '¡Un regalo está en camino!'
  },
  zh: {
    description: (
      reward: RewardInProgressNotification['metadata']
    ): React.ReactNode => (
      <>
        您已免费收到一个
        <NotificationItemNFTLink
          rarity={reward.tokenRarity}
          name={reward.tokenName}
          link={config.get('EXPLORER_URL')}
        />
        。一旦到达，立即试试吧！
      </>
    ),
    title: '一份礼物正在路上！'
  }
}

/**
 * @deprecated Should start using the same component migrated to UI2.
 */
export default function RewardInProgressNotification({
  notification,
  locale
}: CommonNotificationProps<RewardInProgressNotification>) {
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
