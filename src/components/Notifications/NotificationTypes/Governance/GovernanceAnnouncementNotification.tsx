import React from 'react'

import {
  CommonNotificationProps,
  GovernanceAnnouncementNotification
} from '../../types'
import NotificationItem from '../../NotificationItem'
import GovernanceIcon from '../../../Icons/Notifications/GovernanceIcon'

const GovernanceAnnouncementNotification = ({
  notification,
  locale
}: CommonNotificationProps<GovernanceAnnouncementNotification>) => (
  <NotificationItem
    image={{ image: <GovernanceIcon width="48" height="48" /> }}
    timestamp={notification.timestamp}
    isNew={!notification.read}
    locale={locale}
  >
    <p className="dcl notification-item__content-title">
      {notification.metadata.title}
    </p>
    <a href={notification.metadata.link}>
      <p className="dcl notification-item__content-description">
        {notification.metadata.description}{' '}
      </p>
    </a>
  </NotificationItem>
)

export default GovernanceAnnouncementNotification
