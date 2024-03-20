import React, { ReactNode } from 'react'

import './NotificationItemImage.css'

export interface NotificationItemImageProps {
  backgroundColor?: string
  image: string | ReactNode
  icon?: ReactNode
}

export default function NotificationItemImage({
  image,
  backgroundColor,
  icon
}: NotificationItemImageProps) {
  return (
    <div className="dcl notification-image__container">
      {typeof image === 'string' ? (
        <div
          className="dcl notification-image"
          style={
            backgroundColor && {
              backgroundImage: `radial-gradient(${backgroundColor})`
            }
          }
        >
          <img src={image} alt="Notification Image" />
        </div>
      ) : (
        image
      )}
      {icon && <span className="dcl notification-icon">{icon}</span>}
    </div>
  )
}
