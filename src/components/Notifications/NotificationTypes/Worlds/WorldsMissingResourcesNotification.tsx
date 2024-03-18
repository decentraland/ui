import React from 'react'

import {
  CommonNotificationProps,
  WorldsMissingResourcesNotification
} from '../../types'
import NotificationItem from '../../NotificationItem'
import MissingResourcesIcon from '../../../Icons/Notifications/MissingResourcesIcon'

const i18N = {
  en: {
    description: (link: string): React.ReactNode => (
      <>
        WORLDS access at risk in 24hs.{' '}
        <a href={link} className="dcl notification-link">
          Rectify now
        </a>{' '}
        to percent disruption.
      </>
    ),
    title: 'Missing resources'
  },
  es: {
    description: (link: string): React.ReactNode => (
      <>
        El acceso a tus Mundos sera restringido en 24 horas.{' '}
        <a href={link} className="dcl notification-link">
          Rectifique ahora
        </a>{' '}
        para evitar interrupciones.
      </>
    ),
    title: 'Faltan recursos'
  },
  zh: {
    description: (link: string): React.ReactNode => (
      <>
        世界接入在 24 小时内面临风险.{' '}
        <a href={link} className="dcl notification-link">
          立即纠正
        </a>
        ，以减少中断
      </>
    ),
    title: '缺失的资源'
  }
}

const WorldsMissingResourcesNotification = ({
  notification,
  locale
}: CommonNotificationProps<WorldsMissingResourcesNotification>) => {
  return (
    <NotificationItem
      image={{ image: <MissingResourcesIcon width="48" height="48" /> }}
      timestamp={notification.timestamp}
      isNew={!notification.read}
      locale={locale}
    >
      <p className="dcl notification-item__content-title">
        {i18N[locale].title}
      </p>
      <p className="dcl notification-item__content-description">
        {i18N[locale].description(notification.metadata.url)}
      </p>
    </NotificationItem>
  )
}

export default WorldsMissingResourcesNotification
