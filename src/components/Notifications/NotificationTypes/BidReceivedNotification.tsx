import React from 'react'

import { BidReceivedNotification, NotificationLocale } from '../types'
import NotificationItem from '../NotificationItem'
import BidAccepted from '../../Icons/Notifications/BidAccepted'
import { Network, Rarity } from '@dcl/schemas'
import { formatMana } from '../utils'
import { Mana } from '../../Mana/Mana'

interface BidReceivedNotificationProps {
  notification: BidReceivedNotification
  locale: NotificationLocale
}

const i18N = {
  en: {
    description: (
      mana: React.ReactNode,
      nftName: React.ReactNode
    ): React.ReactNode => (
      <>
        Your received a bid of {mana} for {nftName}
      </>
    ),
    title: 'Bid Received'
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
    title: 'Oferta aceptada'
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

export default BidReceivedNotification
