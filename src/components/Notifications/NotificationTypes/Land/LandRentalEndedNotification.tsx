import React from 'react'

import {
  CommonNotificationProps,
  LandRentalEndedNotification
} from '../../types'
import NotificationItem from '../../NotificationItem'
import RentPeriodEnding from '../../../Icons/Notifications/RentPeriodEnding'
import { IconBadge } from '../../../IconBadge'

const i18N = {
  en: {
    description: (
      coords: string,
      tenant: JSX.Element | string
    ): React.ReactNode => (
      <>
        The rent on your LAND <IconBadge icon="places" text={coords} /> has
        ended {tenant}
      </>
    ),
    title: 'Rent Period Ended'
  },
  es: {
    description: (
      coords: string,
      tenant: JSX.Element | string
    ): React.ReactNode => (
      <>
        El alquiler de su LAND <IconBadge icon="places" text={coords} /> ha
        terminado {tenant}
      </>
    ),
    title: 'Período de alquiler finalizado'
  },
  zh: {
    description: (
      coords: string,
      tenant: JSX.Element | string
    ): React.ReactNode => (
      <>
        土地上的租金 <IconBadge icon="places" text={coords} /> 结束了 {tenant}
      </>
    ),
    title: '租金期结束'
  }
}

export default function LandRentalEndedNotificationCmp({
  notification,
  locale,
  renderProfile
}: CommonNotificationProps<LandRentalEndedNotification>) {
  return (
    <NotificationItem
      image={{ image: <RentPeriodEnding width="48" height="48" /> }}
      timestamp={notification.timestamp}
      isNew={!notification.read}
      locale={locale}
    >
      <p className="dcl notification-item__content-title">
        {i18N[locale].title}
      </p>
      <p className="dcl notification-item__content-description">
        {i18N[locale].description(
          notification.metadata.land,
          renderProfile
            ? renderProfile(notification.metadata.tenant)
            : notification.metadata.tenant
        )}
      </p>
    </NotificationItem>
  )
}
