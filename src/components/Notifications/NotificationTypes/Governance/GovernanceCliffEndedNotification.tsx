import React from 'react'
import {
  CommonNotificationProps,
  GovernanceCliffEndedNotification as GovernanceCliffEndedNotificationType
} from '../../types'
import NotificationItem from '../../NotificationItem'
import CliffEnded from '../../../Icons/Notifications/CliffEnded'

const i18N = {
  en: {
    description: (link: string): React.ReactNode => (
      <>
        The cliff period to vest funds has ended. Check the{' '}
        <a href={link} className="dcl notification-link">
          contract status
        </a>{' '}
        now!
      </>
    ),
    title: (proposalTitle: string): React.ReactNode => (
      <>
        Funds are ready to vest for your project "
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
        El período de espera para la adjudicación de fondos ha finalizado.
        ¡Revisa el{' '}
        <a href={link} className="dcl notification-link">
          estado del contrato
        </a>{' '}
        ahora!
      </>
    ),
    title: (proposalTitle: string): React.ReactNode => (
      <>
        Los fondos están listos para ser utilizados en tu proyecto "
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
        资金释放的等待期已结束。
        <a href={link} className="dcl notification-link">
          现在查看合同状态！
        </a>
      </>
    ),
    title: (proposalTitle: string): React.ReactNode => (
      <>
        您的项目“
        <span className="dcl notification-text-highlighted">
          {proposalTitle}
        </span>
        ”的资金已准备好释放
      </>
    )
  }
}

const GovernanceCliffEndedNotification = ({
  notification,
  locale
}: CommonNotificationProps<GovernanceCliffEndedNotificationType>) => (
  <NotificationItem
    image={{ image: <CliffEnded /> }}
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

export default GovernanceCliffEndedNotification
