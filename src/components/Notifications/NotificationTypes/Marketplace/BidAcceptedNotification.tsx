import React from 'react'

import { BidAcceptedNotification, CommonNotificationProps } from '../../types'
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
        Your offer of {mana} was accepted for {nftName}
      </>
    ),
    title: 'Offer Accepted'
  },
  es: {
    description: (
      mana: React.ReactNode,
      nftName: React.ReactNode
    ): React.ReactNode => (
      <>
        Tu oferta de {mana} fue aceptada para {nftName}
      </>
    ),
    title: 'Oferta aceptada'
  },
  zh: {
    description: (
      mana: React.ReactNode,
      nftName: React.ReactNode
    ): React.ReactNode => (
      <>
        您的出价 {mana} 已被接受 {nftName}
      </>
    ),
    title: '接受报价'
  }
}

const BidAcceptedNotification = ({
  notification,
  locale
}: CommonNotificationProps<BidAcceptedNotification>) => {
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

export default BidAcceptedNotification
