import React from 'react'

import Reward from '../../../Icons/Notifications/Reward'
import {
  CommonNotificationProps,
  CampaignOutOfStockNotification
} from '../../types'
import NotificationItem from '../../NotificationItem'
import CampaignName from './CampaignName'

const i18N = {
  en: {
    description: (
      metadata: CampaignOutOfStockNotification['metadata']
    ): React.ReactNode => (
      <>
        The <CampaignName metadata={metadata} /> campaign has run out of stock.
      </>
    ),
    title: 'Campaign Out of Stock'
  },
  es: {
    description: (
      metadata: CampaignOutOfStockNotification['metadata']
    ): React.ReactNode => (
      <>
        La campaña <CampaignName metadata={metadata} /> se ha quedado sin stock.
      </>
    ),
    title: 'Campaña sin stock'
  },
  zh: {
    description: (
      metadata: CampaignOutOfStockNotification['metadata']
    ): React.ReactNode => (
      <>
        <CampaignName metadata={metadata} /> 活动库存不足。
      </>
    ),
    title: '活动资金不足'
  }
}

/**
 * @deprecated Should start using the same component migrated to UI2.
 */
export default function CampaignOutOfStockNotification({
  notification,
  locale
}: CommonNotificationProps<CampaignOutOfStockNotification>) {
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
