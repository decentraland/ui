import React from 'react'
import {
  CommonNotificationProps,
  GovernancePitchPassedNotification
} from '../../types'
import NotificationItem from '../../NotificationItem'
import PitchIcon from '../../../Icons/Notifications/PitchIcon'

const i18N = {
  en: {
    description: (link: string): React.ReactNode => (
      <>
        Help to advance this idea by proposing potential solutions{' '}
        <a href={link} className="dcl notification-link">
          here
        </a>
        .
      </>
    ),
    title: (proposalTitle: string): React.ReactNode => (
      <>
        The Pitch "
        <span className="dcl notification-text-highlighted">
          {proposalTitle}
        </span>
        " can now receive Tenders
      </>
    )
  },
  es: {
    description: (link: string): React.ReactNode => (
      <>
        Ayuda a avanzar esta idea proponiendo soluciones potenciales{' '}
        <a href={link} className="dcl notification-link">
          aquí
        </a>
        .
      </>
    ),
    title: (proposalTitle: string): React.ReactNode => (
      <>
        La Convocatoria "
        <span className="dcl notification-text-highlighted">
          {proposalTitle}
        </span>
        " ahora puede recibir licitaciones
      </>
    )
  },
  zh: {
    description: (link: string): React.ReactNode => (
      <>
        通过提出可能的解决方案来帮助推进这个想法{' '}
        <a href={link} className="dcl notification-link">
          这里
        </a>
        .
      </>
    ),
    title: (proposalTitle: string): React.ReactNode => (
      <>
        投标邀请 "
        <span className="dcl notification-text-highlighted">
          {proposalTitle}
        </span>
        " 现在可以接收投标
      </>
    )
  }
}

const GovernancePitchPassedNotification = ({
  notification,
  locale
}: CommonNotificationProps<GovernancePitchPassedNotification>) => (
  <NotificationItem
    image={{ image: <PitchIcon width="48" height="48" /> }}
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

export default GovernancePitchPassedNotification
