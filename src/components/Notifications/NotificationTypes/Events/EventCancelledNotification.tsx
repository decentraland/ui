import React from 'react'

import {
  CommonNotificationProps,
  EventsCancelledNotification
} from '../../types'
import NotificationItem from '../../NotificationItem'
import EventCancelled from '../../../Icons/Notifications/EventCancelled'

const i18N = {
  en: {
    description: (
      metadata: EventsCancelledNotification['metadata']
    ): React.ReactNode => (
      <>
        The event <a href={metadata.link}>{metadata.name}</a> has been cancelled
      </>
    ),
    title: 'Event cancelled'
  },
  es: {
    description: (
      metadata: EventsCancelledNotification['metadata']
    ): React.ReactNode => (
      <>
        El evento <a href={metadata.link}>{metadata.name}</a> ha sido cancelado
      </>
    ),
    title: 'Evento cancelado'
  },
  zh: {
    description: (
      metadata: EventsCancelledNotification['metadata']
    ): React.ReactNode => (
      <>
        事件 <a href={metadata.link}>{metadata.name}</a> 已经取消
      </>
    ),
    title: '事件取消了'
  }
}

const EventsCancelledNotification = ({
  notification,
  locale
}: CommonNotificationProps<EventsCancelledNotification>) => (
  <NotificationItem
    image={{ image: <EventCancelled width="48" height="48" /> }}
    timestamp={notification.timestamp}
    isNew={!notification.read}
    locale={locale}
  >
    <p className="dcl notification-item__content-title">{i18N[locale].title}</p>
    <a href={notification.metadata.link}>
      <p className="dcl notification-item__content-description">
        {i18N[locale].description(notification.metadata)}
      </p>
    </a>
  </NotificationItem>
)

export default EventsCancelledNotification
