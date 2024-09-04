import React from 'react'

import Reward from '../../../Icons/Notifications/Reward'
import {
  CommonNotificationProps,
  CampaignOutOfFundsNotification
} from '../../types'
import NotificationItem from '../../NotificationItem'
import CampaignName from './CampaignName'

const i18N = {
  en: {
    description: (
      metadata: CampaignOutOfFundsNotification['metadata']
    ): React.ReactNode => (
      <>
        The <CampaignName metadata={metadata} /> campaign has run out of funds.
      </>
    ),
    title: 'Campaign Out of Funds'
  },
  es: {
    description: (
      metadata: CampaignOutOfFundsNotification['metadata']
    ): React.ReactNode => (
      <>
        La campaña <CampaignName metadata={metadata} /> se ha quedado sin
        fondos.
      </>
    ),
    title: 'Campaña sin fondos'
  },
  zh: {
    description: (
      metadata: CampaignOutOfFundsNotification['metadata']
    ): React.ReactNode => (
      <>
        <CampaignName metadata={metadata} /> 活动资金不足。
      </>
    ),
    title: '活动资金不足'
  }
}

export default function CampaignOutOfFundsNotification({
  notification,
  locale
}: CommonNotificationProps<CampaignOutOfFundsNotification>) {
  return (
    <NotificationItem
      image={{
        image: <Reward width="48" height="48" />
      }}
      timestamp={notification.timestamp}
      isNew={!notification.read}
      locale={locale}
    >
      <p className="dcl notification-item__content-title">
        {i18N[locale].title}
      </p>
      <p className="dcl notification-item__content-description">
        {i18N[locale].description(notification.metadata)}
      </p>
    </NotificationItem>
  )
}
