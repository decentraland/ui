import React from 'react'

import NotificationItem from '../../NotificationItem'
import {
  GovernanceVotingEndedVoterNotification,
  CommonNotificationProps
} from '../../types'
import VotingEndedIcon from '../../../Icons/Notifications/VotingEndedIcon'

const i18N = {
  en: {
    description: (link: string): React.ReactNode => (
      <>
        <a href={link} className="dcl notification-link">
          Discover the results
        </a>{' '}
        of the proposal you participated in as a voter. Your input matters!
      </>
    ),
    title: 'Voting ended on a proposal you voted on'
  },
  es: {
    description: (link: string): React.ReactNode => (
      <>
        <a href={link} className="dcl notification-link">
          Descubre los resultados
        </a>{' '}
        de la propuesta en la que participaste como votante. Tu opinion es
        importante!
      </>
    ),
    title: 'La votacion ha finalizado en una propuesta que votaste'
  },
  zh: {
    description: (link: string): React.ReactNode => (
      <>
        <a href={link} className="dcl notification-link">
          了解您作为选民参与的提案的结果
        </a>
        . 您的意见很重要！
      </>
    ),
    title: '您已投票的提案投票结束'
  }
}

const GovernanceVotingEndedVoterNotification = ({
  notification,
  locale
}: CommonNotificationProps<GovernanceVotingEndedVoterNotification>) => (
  <NotificationItem
    image={{ image: <VotingEndedIcon width="48" height="48" /> }}
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

export default GovernanceVotingEndedVoterNotification
