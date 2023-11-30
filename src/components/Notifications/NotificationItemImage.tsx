import React, { ReactNode } from 'react'

import { Rarity } from '@dcl/schemas'

import './NotificationItemImage.css'

export interface NotificationItemImageProps {
  rarity?: Rarity
  backgroundColor?: string
  imageLink: string
  icon?: ReactNode
}

export default function NotificationItemImage({
  rarity,
  imageLink,
  backgroundColor,
  icon
}: NotificationItemImageProps) {
  const bgColor = rarity
    ? Rarity.getGradient(rarity).join()
    : backgroundColor
    ? backgroundColor
    : null

  return (
    <div className="dcl notification-image-container">
      <div
        className="dcl notification-image"
        style={{
          backgroundImage: `radial-gradient(${bgColor})`
        }}
      >
        <img src={imageLink} alt="Notification Image" />
      </div>
      {icon && <span className="dcl notification-icon">{icon}</span>}
    </div>
  )
}
