import React from 'react'

import {
  CommonNotificationProps,
  WorldsAccessRestrictedNotification
} from '../../types'
import NotificationItem from '../../NotificationItem'
import AccessRestrictedIcon from '../../../Icons/Notifications/AccessRestrictedIcon'

const i18N = {
  en: {
    description: (link: string): React.ReactNode => (
      <>
        Access to your Worlds has been restricted due to{' '}
        <a href={link} className="dcl notification-link">
          insufficient resources
        </a>
        .
      </>
    ),
    title: 'Worlds restricted'
  },
  es: {
    description: (link: string): React.ReactNode => (
      <>
        El acceso a tus Mundos ha sido restringido debido a{' '}
        <a href={link} className="dcl notification-link">
          falta de recursos
        </a>
        .
      </>
    ),
    title: 'Mundos restringidos'
  },
  zh: {
    description: (link: string): React.ReactNode => (
      <>
        由于资源不足，
        <a href={link} className="dcl notification-link">
          访问您的世界受到限制
        </a>
        .
      </>
    ),
    title: '世界限制'
  }
}

const WorldsAccessRestrictedNotification = ({
  notification,
  locale
}: CommonNotificationProps<WorldsAccessRestrictedNotification>) => {
  return (
    <NotificationItem
      image={{ image: <AccessRestrictedIcon width="48" height="48" /> }}
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

export default WorldsAccessRestrictedNotification
