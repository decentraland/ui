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
    description: (coords: string, link: string): React.ReactNode => (
      <>
        The rent on your LAND at
        <IconBadge
          icon="places"
          text={coords}
          onClick={() => window.open(link, '_blank')}
        />
        has ended
      </>
    ),
    title: 'Rent Period Ended'
  },
  es: {
    description: (coords: string, link: string): React.ReactNode => (
      <>
        El alquiler de su LAND en
        <IconBadge
          icon="places"
          text={coords}
          onClick={() => window.open(link, '_blank')}
        />
        ha terminado
      </>
    ),
    title: 'Período de alquiler finalizado'
  },
  zh: {
    description: (coords: string, link: string): React.ReactNode => (
      <>
        土地上的租金
        <IconBadge
          icon="places"
          text={coords}
          onClick={() => window.open(link, '_blank')}
        />
        结束了
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
        {i18N[locale].description(
          notification.metadata.land,
          notification.metadata.link
        )}
      </p>
    </NotificationItem>
  )
}
