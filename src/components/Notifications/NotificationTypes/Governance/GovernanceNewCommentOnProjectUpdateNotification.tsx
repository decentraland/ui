import React from 'react'

import NotificationItem from '../../NotificationItem'
import {
  CommonNotificationProps,
  GovernanceNewCommentOnProjectUpdateNotification
} from '../../types'
import NewCommentIcon from '../../../Icons/Notifications/NewCommentIcon'

const i18N = {
  en: {
    description: (link: string): React.ReactNode => (
      <>
        Engage in a productive conversation by replying to{' '}
        <a href={link} className="dcl notification-link">
          this comment
        </a>
        .
      </>
    ),
    title: 'New comment on your update for your project'
  },
  es: {
    description: (link: string): React.ReactNode => (
      <>
        Participe en una conversación productiva respondiendo a{' '}
        <a href={link} className="dcl notification-link">
          este comentario
        </a>
        .
      </>
    ),
    title: 'Nuevo comentario en la actualización del proyecto'
  },
  zh: {
    description: (link: string): React.ReactNode => (
      <>
        <a href={link} className="dcl notification-link">
          通过回复此评论
        </a>
        ，参与到富有成效的对话中。
      </>
    ),
    title: '您的更新收到了新评论'
  }
}

const GovernanceNewCommentOnProjectUpdateNotification = ({
  notification,
  locale
}: CommonNotificationProps<GovernanceNewCommentOnProjectUpdateNotification>) => (
  <NotificationItem
    image={{ image: <NewCommentIcon height="48" width="48" /> }}
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

export default GovernanceNewCommentOnProjectUpdateNotification
