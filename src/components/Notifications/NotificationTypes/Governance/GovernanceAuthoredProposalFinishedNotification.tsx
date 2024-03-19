import React from 'react'

import NotificationItem from '../../NotificationItem'
import {
  CommonNotificationProps,
  GovernanceAuthoredProposalFinishedNotification
} from '../../types'
import ProposalFinishedIcon from '../../../Icons/Notifications/ProposalFinishedIcon'

const i18N = {
  en: {
    description: (link: string): React.ReactNode => (
      <>
        The votes are in! Find out the outcome of the voting on{' '}
        <a className="dcl notification-link" href={link}>
          {' '}
          your proposal
        </a>
        .
      </>
    ),
    title: 'Voting ended on your proposal'
  },
  es: {
    description: (link: string): React.ReactNode => (
      <>
        Ya estan los votos! Descubre el resultado de la votacion en{' '}
        <a href={link} className="dcl notification-link">
          tu propuesta
        </a>
        .
      </>
    ),
    title: 'La votacion finalizo en tu propuesta'
  },
  zh: {
    description: (link: string): React.ReactNode => (
      <>
        投票结果出来了！
        <a href={link} className="dcl notification-link">
          了解您提案的投票结果
        </a>
        .
      </>
    ),
    title: '您的提案投票结束'
  }
}

const GovernanceAuthoredProposalFinishedNotification = ({
  notification,
  locale
}: CommonNotificationProps<GovernanceAuthoredProposalFinishedNotification>) => (
  <NotificationItem
    image={{ image: <ProposalFinishedIcon width="48" height="48" /> }}
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

export default GovernanceAuthoredProposalFinishedNotification
