import React from 'react'

import { ItemSoldNotification, NotificationLocale } from '../types'
import NotificationItem from '../NotificationItem'
import ItemSold from '../../Icons/Notifications/ItemSold'
import { Rarity } from '@dcl/schemas'

interface ItemSoldNotificationProps {
  notification: ItemSoldNotification
  locale: NotificationLocale
}

const i18N = {
  en: { description: 'You just sold ', title: 'Item Sold' },
  es: { description: 'Vendiste ', title: 'Item vendido' },
  zh: { description: '你剛剛賣了 ', title: '已售商品' },
}

const ItemSoldNotification = ({
  notification,
  locale,
}: ItemSoldNotificationProps) => {
  return (
    <NotificationItem
      image={{
        url: notification.metadata.image,
        rarity: notification.metadata.rarity,
        icon: <ItemSold />,
      }}
      timestamp={notification.timestamp}
      isNew={!notification.read}
    >
      <p className="dcl notification-item__content-title">
        {i18N[locale].title}
      </p>
      <p className="dcl notification-item__content-description">
        {i18N[locale].description}{' '}
        <span>
          <a
            href={notification.metadata.link}
            style={{
              color: `${Rarity.getColor(notification.metadata.rarity)}`,
              textDecoration: 'underline',
            }}
          >
            {notification.metadata.nftName}
          </a>
        </span>
      </p>
    </NotificationItem>
  )
}

export default ItemSoldNotification
