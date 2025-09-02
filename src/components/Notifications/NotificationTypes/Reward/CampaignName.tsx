import React from 'react'

import { CampaignOutOfStockNotification } from '../../types'

type CampaignNameProps = {
  metadata: CampaignOutOfStockNotification['metadata']
}

/**
 * @deprecated Should start using the same component migrated to UI2.
 */
export default function CampaignName(props: CampaignNameProps) {
  const { metadata } = props

  if (metadata.link) {
    return <a href={metadata.link}>{metadata.campaignName}</a>
  }

  return <strong>{metadata.campaignName}</strong>
}
