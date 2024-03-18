import React from 'react'

import {
  CommonNotificationProps,
  WorldsAccessRestoredNotification
} from '../../types'
import NotificationItem from '../../NotificationItem'
import AccessRestored from '../../../Icons/Notifications/AccessRestoredIcon'

const i18N = {
  en: {
    description: 'Access to your Worlds has been restored.',
    title: 'Worlds available'
  },
  es: {
    description: 'El acceso a tus Mundos ha sido restaurado.',
    title: 'Mundos disponible'
  },
  zh: {
    description: '您的 "世界 "访问权限已恢复.',
    title: '可用的世界'
  }
}

const WorldsAccessRestoredNotification = ({
  notification,
  locale
}: CommonNotificationProps<WorldsAccessRestoredNotification>) => {
  return (
    <NotificationItem
      image={{ image: <AccessRestored width="48" height="48" /> }}
      timestamp={notification.timestamp}
      isNew={!notification.read}
      locale={locale}
    >
      <p className="dcl notification-item__content-title">
        {i18N[locale].title}
      </p>
      <p className="dcl notification-item__content-description">
        {i18N[locale].description}
      </p>
    </NotificationItem>
  )
}

export default WorldsAccessRestoredNotification
