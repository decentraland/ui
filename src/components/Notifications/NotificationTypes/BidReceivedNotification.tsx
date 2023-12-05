import React from 'react'

import { BidReceivedNotification, NotificationLocale } from '../types'
import NotificationItem from '../NotificationItem'
import BidAccepted from '../../Icons/Notifications/BidAccepted'
import { Rarity } from '@dcl/schemas'
import { formatMana } from '../utils'

interface BidReceivedNotificationProps {
  notification: BidReceivedNotification
  locale: NotificationLocale
}

const i18N = {
  en: {
    description: (
      mana: React.ReactNode,
      nftName: React.ReactNode
    ): React.ReactNode =>
      <>Your received a bid of {mana} MANA was accepted for {nftName}</>,
    title: 'Bid Received'
  },
  es: {
    description: (
      mana: React.ReactNode,
      nftName: React.ReactNode
    ): React.ReactNode =>
      <>Recibiste una oferta de {mana} MANA para {nftName}</>,
    title: 'Oferta aceptada'
  },
  zh: {
    description: (
      mana: React.ReactNode,
      nftName: React.ReactNode
    ): React.ReactNode => <>您为 {nftName} 出价 {mana} MANA 已被接受</>,
    title: '收到的投标'
  }
}

const BidReceivedNotification = ({
  notification,
  locale
}: BidReceivedNotificationProps) => {
  return (
    <NotificationItem
      image={{
        imageLink: notification.metadata.image,
        rarity: notification.metadata.rarity,
        icon: <BidAccepted />
      }}
      timestamp={notification.timestamp}
      isNew={!notification.read}
    >
      <p className="dcl notification-item__content__title">
        {i18N[locale].title}
      </p>
      <p className="dcl notification-item__content__description">
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

export default BidReceivedNotification
