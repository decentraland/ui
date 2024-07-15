import React from 'react'

import { CommonNotificationProps, LandRentedNotification } from '../../types'
import NotificationItem from '../../NotificationItem'
import LandRentedIcon from '../../../Icons/Notifications/LandRented'
import { IconBadge } from '../../../IconBadge'

const i18N = {
  en: {
    description: (
      coords: string,
      tenant: JSX.Element | string,
      link: string
    ): React.ReactNode => (
      <>
        Your LAND at
        <IconBadge
          icon="places"
          text={coords}
          onClick={() => window.open(link, '_blank')}
        />
        was rented by {tenant}
      </>
    ),
    title: 'LAND Rented'
  },
  es: {
    description: (
      coords: string,
      tenant: JSX.Element | string,
      link: string
    ): React.ReactNode => (
      <>
        Tu LAND en
        <IconBadge
          icon="places"
          text={coords}
          onClick={() => window.open(link, '_blank')}
        />
        fue alquilada por {tenant}
      </>
    ),
    title: 'LAND alquilada'
  },
  zh: {
    description: (
      coords: string,
      tenant: JSX.Element | string,
      link: string
    ): React.ReactNode => (
      <>
        你的土地
        <IconBadge
          icon="places"
          text={coords}
          onClick={() => window.open(link, '_blank')}
        />
        租了 {tenant}
      </>
    ),
    title: '租用的土地'
  }
}

export default function LandRentedNotificationCmp({
  notification,
  locale,
  renderProfile
}: CommonNotificationProps<LandRentedNotification>) {
  return (
    <NotificationItem
      image={{ image: <LandRentedIcon width="48" height="48" /> }}
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
            : notification.metadata.tenant,
          notification.metadata.link
        )}
      </p>
    </NotificationItem>
  )
}
