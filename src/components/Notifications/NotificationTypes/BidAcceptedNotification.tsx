import React from 'react'

import { BidAcceptedNotification, NotificationLocale } from '../types'
import NotificationItem from '../NotificationItem'
import BidAccepted from '../../Icons/Notifications/BidAccepted'
import { Network, Rarity } from '@dcl/schemas'
import { formatMana } from '../utils'
import { Mana } from '../../Mana/Mana'

interface BidAcceptedNotificationProps {
  notification: BidAcceptedNotification
  locale: NotificationLocale
}

const i18N = {
  en: {
    description: (
      mana: React.ReactNode,
      nftName: React.ReactNode
    ): React.ReactNode => (
      <>
        Your bid of {mana} was accepted for {nftName}
      </>
    ),
    title: 'Bid Accepted'
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
    title: '接受投标'
  }
}

const BidAcceptedNotification = ({
  notification,
  locale
}: BidAcceptedNotificationProps) => {
  return (
    <NotificationItem
      image={{
        url: notification.metadata.image,
        rarity: notification.metadata.rarity,
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
          <span>
            <a
              href={notification.metadata.link}
              style={{
                color: `${Rarity.getColor(notification.metadata.rarity)}`,
                textDecoration: 'underline'
              }}
            >
              {notification.metadata.nftName}
            </a>
          </span>
        )}
      </p>
    </NotificationItem>
  )
}

export default BidAcceptedNotification
