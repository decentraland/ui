import React from 'react'

import NotificationItemImage, {
  NotificationItemImageProps,
} from './NotificationItemImage'
import Time from '../../lib/time'

import './NotificationItem.css'
import NewNotification from '../Icons/Notifications/NewNotification'

interface NotificationItemProps {
  image: NotificationItemImageProps
  timestamp: number
  isNew: boolean
}

export default function NotificationItem({
  image,
  timestamp,
  isNew,
  children,
}: React.PropsWithChildren<NotificationItemProps>) {
  return (
    <div className="dcl notification-item">
      <div className="dcl notification-item__image">
        <NotificationItemImage {...image} />
      </div>
      <div className="dcl notification-item__content">
        {children}
        <p className="dcl notification-item__content-timestamp">
          {Time(timestamp).fromNow()}
        </p>
      </div>
      {isNew && <NewNotification />}
    </div>
  )
}
