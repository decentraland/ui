import React from 'react'

import NotificationItemImage, {
  NotificationItemImageProps
} from './NotificationItemImage'
import Time from '../../lib/time'

import './NotificationItem.css'
import NewNotification from '../Icons/Notifications/NewNotification'
import { NotificationLocale } from './types'

interface NotificationItemProps {
  image: NotificationItemImageProps
  timestamp: number
  isNew: boolean
  locale: NotificationLocale
}

export default function NotificationItem({
  image,
  timestamp,
  isNew,
  children,
  locale
}: React.PropsWithChildren<NotificationItemProps>) {
  return (
    <div className="dcl notification-item">
      <div className="dcl notification-item__image">
        <NotificationItemImage {...image} />
      </div>
      <div className="dcl notification-item__content">
        {children}
        <p className="dcl notification-item__content-timestamp">
          {Time(timestamp).locale(locale).fromNow()}
        </p>
      </div>
      {isNew && <NewNotification width="12px" height="12px" />}
    </div>
  )
}
