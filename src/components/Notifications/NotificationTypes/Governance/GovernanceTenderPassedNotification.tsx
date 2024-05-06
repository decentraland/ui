import React from 'react'
import {
  CommonNotificationProps,
  GovernanceTenderPassedNotification
} from '../../types'
import NotificationItem from '../../NotificationItem'
import TenderIcon from '../../../Icons/Notifications/TenderIcon'

const i18N = {
  en: {
    description: (link: string): React.ReactNode => (
      <>
        If think you can tackle this solution, propose a Project and get funding
        from the DAO{' '}
        <a href={link} className="dcl notification-link">
          here
        </a>
        .
      </>
    ),
    title: (proposalTitle: string): React.ReactNode => (
      <>
        The Tender "
        <span className="dcl notification-text-highlighted">
          {proposalTitle}
        </span>
        " can now receive Bid Projects
      </>
    )
  },
  es: {
    description: (link: string): React.ReactNode => (
      <>
        Si crees que puedes abordar esta solución, propón un proyecto y obtén
        financiación del DAO{' '}
        <a href={link} className="dcl notification-link">
          aquí
        </a>
        .
      </>
    ),
    title: (proposalTitle: string): React.ReactNode => (
      <>
        La Licitación "
        <span className="dcl notification-text-highlighted">
          {proposalTitle}
        </span>
        " ahora puede recibir Proyectos de Oferta
      </>
    )
  },
  zh: {
    description: (link: string): React.ReactNode => (
      <>
        如果你认为可以解决这个问题，提出一个项目并从DAO获得资金支持{' '}
        <a href={link} className="dcl notification-link">
          这里
        </a>
        .
      </>
    ),
    title: (proposalTitle: string): React.ReactNode => (
      <>
        投标 "
        <span className="dcl notification-text-highlighted">
          {proposalTitle}
        </span>
        " 现在可以接收项目投标
      </>
    )
  }
}

const GovernanceTenderPassedNotification = ({
  notification,
  locale
}: CommonNotificationProps<GovernanceTenderPassedNotification>) => (
  <NotificationItem
    image={{ image: <TenderIcon width="48" height="48" /> }}
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

export default GovernanceTenderPassedNotification
