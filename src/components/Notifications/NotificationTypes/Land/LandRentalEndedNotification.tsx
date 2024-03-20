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
    description: (coords: string): React.ReactNode => (
      <>
        The rent on your LAND <IconBadge icon="places" text={coords} /> has
        ended
      </>
    ),
    title: 'Rent Period Ended'
  },
  es: {
    description: (coords: string): React.ReactNode => (
      <>
        El alquiler de su LAND <IconBadge icon="places" text={coords} /> ha
        terminado
      </>
    ),
    title: 'Período de alquiler finalizado'
  },
  zh: {
    description: (coords: string): React.ReactNode => (
      <>
        土地上的租金 <IconBadge icon="places" text={coords} /> 结束了
      </>
    ),
    title: '租金期结束'
  }
}

export default function LandRentalEndedNotificationCmp({
  notification,
  locale
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
        {i18N[locale].description(notification.metadata.land)}
      </p>
    </NotificationItem>
  )
}
