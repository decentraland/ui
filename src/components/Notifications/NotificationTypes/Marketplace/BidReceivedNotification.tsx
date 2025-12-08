import React from 'react'

import {
  BidReceivedNotification as BidReceivedNotificationType,
  CommonNotificationProps
} from '../../types'
import NotificationItem from '../../NotificationItem'
import BidAccepted from '../../../Icons/Notifications/BidAccepted'
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
        You received an offer of {mana} for {nftName}
      </>
    ),
    title: 'Offer Received'
  },
  es: {
    description: (
      mana: React.ReactNode,
      nftName: React.ReactNode
    ): React.ReactNode => (
      <>
        Recibiste una oferta de {mana} para {nftName}
      </>
    ),
    title: 'Oferta recibida'
  },
  zh: {
    description: (
      mana: React.ReactNode,
      nftName: React.ReactNode
    ): React.ReactNode => (
      <>
        您为 {nftName} 出价 {mana} 已被接受
      </>
    ),
    title: '收到报价'
  }
}

/**
 * @deprecated Should start using the same component migrated to UI2.
 */
const BidReceivedNotification = ({
  notification,
  locale
}: CommonNotificationProps<BidReceivedNotificationType>) => {
  return (
    <NotificationItem
      image={{
        image: notification.metadata.image,
        backgroundColor: getBGColorByRarity(notification.metadata.rarity),
        icon: <BidAccepted />
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
            {formatMana(notification.metadata.price)}
          </Mana>,
          <NotificationItemNFTLink
            name={notification.metadata.nftName}
            rarity={notification.metadata.rarity}
            link={notification.metadata.link}
          />
        )}
      </p>
    </NotificationItem>
  )
}

export default BidReceivedNotification
