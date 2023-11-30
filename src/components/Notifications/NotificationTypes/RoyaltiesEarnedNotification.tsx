import React from 'react'

import { NotificationLocale, RoyalitesEarnedNotification } from '../types'
import NotificationItem from '../NotificationItem'
import ManaMainnet from '../../Icons/Notifications/ManaMainnet'
import ManaPolygon from '../../Icons/Notifications/ManaPoly'
import { Rarity } from '@dcl/schemas'

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
        imageLink: notification.metadata.image,
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
    >
      <p className="dcl notification-item__content__title">
        {i18N[locale].title}
      </p>
      {
        locale == "zh" ? 
        (
          <p className="dcl notification-item__content__description">
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
            </span>
            {' '}{i18N[locale].description_2}{Number(notification.metadata.royaltiesCut)}
          </p>
        ) : 
        <p className="dcl notification-item__content__description">
          {i18N[locale].description_1}{Number(notification.metadata.royaltiesCut)}
          {' '}{i18N[locale].description_2}
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
      }
    </NotificationItem>
  )
}

export default RoyaltiesEarnedNotification
