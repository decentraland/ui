import React from 'react'

import NotificationItem from '../../NotificationItem'
import {
  CommonNotificationProps,
  GovernanceProposalEnactedNotification
} from '../../types'
import ProjectEnactedIcon from '../../../Icons/Notifications/ProjectEnactedIcon'

const i18N = {
  en: {
    description: (link: string): React.ReactNode => (
      <>
        Congratulations!{' '}
        <a className="dcl notification-link" href={link}>
          Your Project
        </a>{' '}
        has been successfully enacted and a funding Vesting Contract was
        created.
      </>
    ),
    title: 'Your Project has been funded'
  },
  es: {
    description: (link: string): React.ReactNode => (
      <>
        Felicitaciones!{' '}
        <a className="dcl notification-link" href={link}>
          Tu proyecto
        </a>{' '}
        ha sido aprobado y un Vesting Contract de financiamiento fue creado.
      </>
    ),
    title: 'Su proyecto ha sido financiado'
  },
  zh: {
    description: (link: string): React.ReactNode => (
      <>
        恭喜您！
        <a className="dcl notification-link" href={link}>
          您的项目已成功立项
        </a>
        ，并签订了资金归属合同.
      </>
    ),
    title: '您的项目已获得资助'
  }
}

const GovernanceProposalEnactedNotification = ({
  notification,
  locale
}: CommonNotificationProps<GovernanceProposalEnactedNotification>) => (
  <NotificationItem
    image={{ image: <ProjectEnactedIcon width="48" height="48" /> }}
    timestamp={notification.timestamp}
    isNew={!notification.read}
    locale={locale}
  >
    <p className="dcl notification-item__content-title">{i18N[locale].title}</p>
    <p className="dcl notification-item__content-description">
      {i18N[locale].description(notification.metadata.link)}
    </p>
  </NotificationItem>
)

export default GovernanceProposalEnactedNotification
