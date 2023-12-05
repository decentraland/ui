import React from 'react'

import { BidAcceptedNotification, NotificationLocale } from '../types'
import NotificationItem from '../NotificationItem'
import BidAccepted from '../../Icons/Notifications/BidAccepted'
import { Rarity } from '@dcl/schemas'
import { formatMana } from '../utils'

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
        Your bid of {mana} MANA was accepted for {nftName}
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
        Tu oferta de {mana} MANA fue aceptada para {nftName}
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
        您的出价 {mana} MANA 已被接受 {nftName}
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
    >
      <p className="dcl notification-item__content-title">
        {i18N[locale].title}
      </p>
      <p className="dcl notification-item__content-description">
        {i18N[locale].description(
          formatMana(notification.metadata.price),
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
