import React from 'react'
import {
  CommonNotificationProps,
  GovernanceWhaleVoteNotification
} from '../../types'
import NotificationItem from '../../NotificationItem'
import WhaleVote from '../../../Icons/Notifications/WhaleVote'

const i18N = {
  en: {
    description: (link: string): React.ReactNode => (
      <>
        A wallet holding over 250k VP has just{' '}
        <a href={link} className="dcl notification-link">
          cast a vote
        </a>
        . Stay informed and see how this significant vote impacts the outcome.
      </>
    ),
    title: (proposalTitle: string): React.ReactNode => (
      <>
        A whale voted on your proposal "
        <span className="dcl notification-text-highlighted">
          {proposalTitle}
        </span>
        "
      </>
    )
  },
  es: {
    description: (link: string): React.ReactNode => (
      <>
        Una billetera con más de 250k VP acaba de{' '}
        <a href={link} className="dcl notification-link">
          emitir un voto
        </a>
        . Mantente informado y revisa cómo este voto significativo impacta el
        resultado.
      </>
    ),
    title: (proposalTitle: string): React.ReactNode => (
      <>
        Una ballena votó en tu propuesta "
        <span className="dcl notification-text-highlighted">
          {proposalTitle}
        </span>
        "
      </>
    )
  },
  zh: {
    description: (link: string): React.ReactNode => (
      <>
        <a href={link} className="dcl notification-link">
          一个持有超过25万VP的钱包刚刚投票。
        </a>
        保持关注，看看这一重要投票如何影响最终结果。
      </>
    ),
    title: (proposalTitle: string): React.ReactNode => (
      <>
        一位鲸鱼对您的提案“
        <span className="dcl notification-text-highlighted">
          {proposalTitle}
        </span>
        ”进行了投票
      </>
    )
  }
}

const GovernanceWhaleVoteNotification = ({
  notification,
  locale
}: CommonNotificationProps<GovernanceWhaleVoteNotification>) => (
  <NotificationItem
    image={{ image: <WhaleVote /> }}
    timestamp={notification.timestamp}
    isNew={!notification.read}
    locale={locale}
  >
    <p className="dcl notification-item__content-title">
      {i18N[locale].title(notification.metadata.proposalTitle)}
    </p>
    <p className="dcl notification-item__content-description">
      {i18N[locale].description(notification.metadata.link)}
    </p>
  </NotificationItem>
)

export default GovernanceWhaleVoteNotification
