import React from 'react'

import {
  CommonNotificationProps,
  RoyalitesEarnedNotification
} from '../../types'
import NotificationItem from '../../NotificationItem'
import ManaMainnet from '../../../Icons/Notifications/ManaMainnet'
import ManaPolygon from '../../../Icons/Notifications/ManaPoly'
import { Network } from '@dcl/schemas'
import { formatMana, getBGColorByRarity } from '../../utils'
import { Mana } from '../../../Mana/Mana'
import NotificationItemNFTLink from '../../NotificationItemNFTLink'

const i18N = {
  en: {
    description: (
      mana: React.ReactNode,
      nftName: React.ReactNode
    ): React.ReactNode => (
      <>
        You've earned {mana} in royalties for {nftName}
      </>
    ),
    title: 'Royalties Earned'
  },
  es: {
    description: (
      mana: React.ReactNode,
      nftName: React.ReactNode
    ): React.ReactNode => (
      <>
        Ganaste {mana} en regalias por {nftName}
      </>
    ),
    title: 'Regalias ganadas'
  },
  zh: {
    description: (
      mana: React.ReactNode,
      nftName: React.ReactNode
    ): React.ReactNode => (
      <>
        您为 {nftName} 赢得了 {mana}
      </>
    ),
    title: '所得版税'
  }
}

const RoyaltiesEarnedNotification = ({
  notification,
  locale
}: CommonNotificationProps<RoyalitesEarnedNotification>) => {
  return (
    <NotificationItem
      image={{
        image: notification.metadata.image,
        backgroundColor: getBGColorByRarity(notification.metadata.rarity),
        icon:
          notification.metadata.network === 'ethereum' ? (
            <ManaMainnet />
          ) : (
            <ManaPolygon />
          )
      }}
      timestamp={notification.timestamp}
      isNew={!notification.read}
      locale={locale}
    >
      <p className="dcl notification-item__content-title">
        {i18N[locale].title}
      </p>
      <p className="dcl notification-item__content-description">
        {i18N[locale].description(
          <Mana
            inline
            network={
              notification.metadata.network === 'polygon'
                ? Network.MATIC
                : Network.ETHEREUM
            }
          >
            {formatMana(notification.metadata.royaltiesCut)}
          </Mana>,
          <NotificationItemNFTLink
            link={notification.metadata.link}
            rarity={notification.metadata.rarity}
            name={notification.metadata.nftName}
          />
        )}
      </p>
    </NotificationItem>
  )
}

export default RoyaltiesEarnedNotification
