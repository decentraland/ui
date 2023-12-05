import React, { ReactNode } from 'react'

import { Rarity } from '@dcl/schemas'

import './NotificationItemImage.css'

export interface NotificationItemImageProps {
  rarity?: Rarity
  backgroundColor?: string
  url: string
  icon?: ReactNode
}

export default function NotificationItemImage({
  rarity,
  url,
  backgroundColor,
  icon
}: NotificationItemImageProps) {
  const bgColor = rarity
    ? Rarity.getGradient(rarity).join()
    : backgroundColor
    ? backgroundColor
    : null

  return (
    <div className="dcl notification-image__container">
      <div
        className="dcl notification-image"
        style={{
          backgroundImage: `radial-gradient(${bgColor})`
        }}
      >
        <img src={url} alt="Notification Image" />
      </div>
      {icon && <span className="dcl notification-icon">{icon}</span>}
    </div>
  )
}
