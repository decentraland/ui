import React from 'react'

import NotificationItem from '../../NotificationItem'
import {
  CommonNotificationProps,
  GovernanceCoauthorRequestedNotification
} from '../../types'
import CoauthorIcon from '../../../Icons/Notifications/CoauthorIcon'

const i18N = {
  en: {
    description: (link: string): React.ReactNode => (
      <>
        You've been invited to collaborate as a co-author on a published
        proposal. Accept it or reject it{' '}
        <a href={link} className="dcl notification-link">
          here
        </a>
        .
      </>
    ),
    title: 'Co-author request received'
  },
  es: {
    description: (link: string): React.ReactNode => (
      <>
        Has sido invitado a colaborar como coautor en un propuesta publicada.
        Aceptala o rechazala{' '}
        <a href={link} className="dcl notification-link">
          aqui
        </a>
        .
      </>
    ),
    title: 'Solicitud de coautoria'
  },
  zh: {
    description: (link: string): React.ReactNode => (
      <>
        您受邀作为共同作者参与一项已发表提案的合作.{' '}
        <a href={link} className="dcl notification-link">
          在此接受或拒绝
        </a>
        .
      </>
    ),
    title: '收到共同作者申请'
  }
}

const GovernanceCoauthorRequestedNotification = ({
  notification,
  locale
}: CommonNotificationProps<GovernanceCoauthorRequestedNotification>) => (
  <NotificationItem
    image={{ image: <CoauthorIcon width="48" height="48" /> }}
    timestamp={notification.timestamp}
    isNew={!notification.read}
    locale={locale}
  >
    <p className="dcl notification-item__content-title">
      {i18N[locale].title}{' '}
      <span className="dcl notification-text-highlighted">
        {notification.metadata.proposalTitle}
      </span>
    </p>
    <p className="dcl notification-item__content-description">
      {i18N[locale].description(notification.metadata.link)}
    </p>
  </NotificationItem>
)

export default GovernanceCoauthorRequestedNotification
