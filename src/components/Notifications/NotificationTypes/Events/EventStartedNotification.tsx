import React from 'react'

import { CommonNotificationProps, EventsStartedNotification } from '../../types'
import NotificationItem from '../../NotificationItem'
import EventStarted from '../../../Icons/Notifications/EventStarted'

const i18N = {
  en: {
    description: (
      metadata: EventsStartedNotification['metadata']
    ): React.ReactNode => (
      <>
        The event <a href={metadata.link}>{metadata.name}</a> has begun!
      </>
    ),
    title: 'Event started'
  },
  es: {
    description: (
      metadata: EventsStartedNotification['metadata']
    ): React.ReactNode => (
      <>
        El evento <a href={metadata.link}>{metadata.name}</a> ha empezado!
      </>
    ),
    title: 'Evento ha comenzado'
  },
  zh: {
    description: (
      metadata: EventsStartedNotification['metadata']
    ): React.ReactNode => (
      <>
        事件 <a href={metadata.link}>{metadata.name}</a> 已开始
      </>
    ),
    title: '事件开始'
  }
}

const EventsStartedNotification = ({
  notification,
  locale
}: CommonNotificationProps<EventsStartedNotification>) => (
  <NotificationItem
    image={{ image: <EventStarted width="48" height="48" /> }}
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

export default EventsStartedNotification
