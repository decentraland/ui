import { Rarity } from '@dcl/schemas'
import React from 'react'

interface NotificationItemNFTLinkProps {
  link: string
  rarity: Rarity
  name: string
}

/**
 * @deprecated Should start using the same component migrated to UI2.
 */
const NotificationItemNFTLink = ({
  link,
  rarity,
  name
}: NotificationItemNFTLinkProps) => {
  return (
    <a
      href={link}
      style={{
        color: `${Rarity.getColor(rarity)}`,
        textDecoration: 'underline'
      }}
    >
      {name}
    </a>
  )
}

export default NotificationItemNFTLink
