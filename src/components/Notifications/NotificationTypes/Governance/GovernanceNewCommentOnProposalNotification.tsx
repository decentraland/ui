import React from 'react'

import NotificationItem from '../../NotificationItem'
import {
  CommonNotificationProps,
  GovernanceNewCommentOnProposalNotification
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
    title: 'New comment posted on proposal'
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
    title: 'Nuevo comentario en tu propuesta'
  },
  zh: {
    description: (link: string): React.ReactNode => (
      <>
        <a href={link} className="dcl notification-link">
          回复此评论
        </a>
        ，参与富有成效的对话
      </>
    ),
    title: '就提案发表的新评论'
  }
}

const GovernanceNewCommentOnProposalNotification = ({
  notification,
  locale
}: CommonNotificationProps<GovernanceNewCommentOnProposalNotification>) => (
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

export default GovernanceNewCommentOnProposalNotification
