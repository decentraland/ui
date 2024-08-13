import React from 'react'
import {
  CommonNotificationProps,
  GovernanceVotedOnBehalfNotification
} from '../../types'
import NotificationItem from '../../NotificationItem'
import VotedOnBehalf from '../../../Icons/Notifications/VotedOnBehalf'

const i18N = {
  en: {
    description: (link: string): React.ReactNode => (
      <>
        <a href={link} className="dcl notification-link">
          See if their vote is aligned
        </a>
        with your vision. You can always override their decision by voting on
        your own.
      </>
    ),
    title: (proposalTitle: string): React.ReactNode => (
      <>
        Your delegate voted on the proposal "
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
        <a href={link} className="dcl notification-link">
          Verifica si su voto está alineado
        </a>
        con tu visión. Siempre puedes anular su decisión votando por tu cuenta.
      </>
    ),
    title: (proposalTitle: string): React.ReactNode => (
      <>
        Tu delegado votó en la propuesta "
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
          查看他们的投票是否符合您的愿景。
        </a>
        您始终可以通过自己投票来推翻他们的决定。
      </>
    ),
    title: (proposalTitle: string): React.ReactNode => (
      <>
        您的委托人在提案"
        <span className="dcl notification-text-highlighted">
          {proposalTitle}
        </span>
        "上投了票
      </>
    )
  }
}

const GovernanceVotedOnBehalfNotification = ({
  notification,
  locale
}: CommonNotificationProps<GovernanceVotedOnBehalfNotification>) => (
  <NotificationItem
    image={{ image: <VotedOnBehalf /> }}
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

export default GovernanceVotedOnBehalfNotification
