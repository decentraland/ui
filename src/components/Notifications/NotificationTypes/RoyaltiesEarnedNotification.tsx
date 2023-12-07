import React from 'react'

import { NotificationLocale, RoyalitesEarnedNotification } from '../types'
import NotificationItem from '../NotificationItem'
import ManaMainnet from '../../Icons/Notifications/ManaMainnet'
import ManaPolygon from '../../Icons/Notifications/ManaPoly'
import { Network, Rarity } from '@dcl/schemas'
import { formatMana } from '../utils'
import { Mana } from '../../Mana/Mana'

interface RoyaltiesEarnedNotificationProps {
  notification: RoyalitesEarnedNotification
  locale: NotificationLocale
}

const i18N = {
  en: {
    description_1: `You earned `,
    description_2: `for selling `,
    title: 'Royalties Earned'
  },
  es: {
    description_1: `Ganaste `,
    description_2: `por vender `,
    title: 'Regalias ganadas'
  },
  zh: {
    description_1: `您通过出售 `,
    description_2: `赚取了 `,
    title: '所得版税'
  }
}

const RoyaltiesEarnedNotification = ({
  notification,
  locale
}: RoyaltiesEarnedNotificationProps) => {
  return (
    <NotificationItem
      image={{
        url: notification.metadata.image,
        rarity: notification.metadata.rarity,
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
      {locale == 'zh' ? (
        <p className="dcl notification-item__content-description">
          {i18N[locale].description_1}
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
          </span>{' '}
          {i18N[locale].description_2}
          <Mana
            inline
            network={
              notification.metadata.network === 'polygon'
                ? Network.MATIC
                : Network.ETHEREUM
            }
          >
            {formatMana(notification.metadata.royaltiesCut)}
          </Mana>
        </p>
      ) : (
        <p className="dcl notification-item__content-description">
          {i18N[locale].description_1}
          <Mana
            inline
            network={
              notification.metadata.network === 'polygon'
                ? Network.MATIC
                : Network.ETHEREUM
            }
          >
            {formatMana(notification.metadata.royaltiesCut)}
          </Mana>{' '}
          {i18N[locale].description_2}
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
        </p>
      )}
    </NotificationItem>
  )
}

export default RoyaltiesEarnedNotification
