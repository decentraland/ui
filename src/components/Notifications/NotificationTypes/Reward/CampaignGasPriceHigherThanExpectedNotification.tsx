import React from 'react'

import Reward from '../../../Icons/Notifications/Reward'
import {
  CommonNotificationProps,
  CampaignGasPriceHigherThanExpectedNotification
} from '../../types'
import NotificationItem from '../../NotificationItem'
import CampaignName from './CampaignName'

const i18N = {
  en: {
    description: (
      metadata: CampaignGasPriceHigherThanExpectedNotification['metadata']
    ): React.ReactNode => (
      <>
        The gas price for the <CampaignName metadata={metadata} /> campaign is
        lower than expected, and the transactions may not be processed.
      </>
    ),
    title: 'Gas Price Higher Than Expected'
  },
  es: {
    description: (
      metadata: CampaignGasPriceHigherThanExpectedNotification['metadata']
    ): React.ReactNode => (
      <>
        El precio del gas para la campaña <CampaignName metadata={metadata} />{' '}
        es más alto de lo esperado, y las transacciones pueden no ser
        procesadas.
      </>
    ),
    title: 'Precio del Gas Más Alto de lo Esperado'
  },
  zh: {
    description: (
      metadata: CampaignGasPriceHigherThanExpectedNotification['metadata']
    ): React.ReactNode => (
      <>
        <CampaignName metadata={metadata} />{' '}
        活动的燃气价格高于预期，交易可能无法处理。
      </>
    ),
    title: '燃气价格高于预期'
  }
}

/**
 * @deprecated Should start using the same component migrated to UI2.
 */
export default function CampaignGasPriceHigherThanExpectedNotification({
  notification,
  locale
}: CommonNotificationProps<CampaignGasPriceHigherThanExpectedNotification>) {
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
