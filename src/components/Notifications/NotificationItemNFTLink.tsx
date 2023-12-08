import { Rarity } from '@dcl/schemas'
import React from 'react'

interface NotificationItemNFTLinkProps {
  link: string
  rarity: Rarity
  name: string
}

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
