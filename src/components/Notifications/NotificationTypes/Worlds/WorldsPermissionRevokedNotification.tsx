import React from 'react'

import {
  CommonNotificationProps,
  WorldsPermissionRevokedNotification
} from '../../types'
import NotificationItem from '../../NotificationItem'
import PermissionRevoked from '../../../Icons/Notifications/PermissionRevoked'
import AccessRestricted from '../../../Icons/Notifications/AccessRestrictedIcon'
import { replaceWithValues } from '../../utils'

export const i18N = {
  en: {
    title: 'World Permission Revoked',
    accessTitle: 'World Access Revoked',
    access: 'You have been revoked the permission to access World {world}',
    deployment:
      'The owner of the World {world} has revoked your permission to deploy in their world',
    streaming:
      'The owner of the World {world} has revoked your permission to stream in their world'
  },
  es: {
    title: 'Permiso para mundo revocado',
    accessTitle: 'Acceso a Mundo revocado',
    access: 'Te han removido el permiso para acceder al mundo {world}',
    deployment:
      'El propietario del mundo {world} ha revocado tu permiso para deployar en su mundo',
    streaming:
      'El propietario del mundo {world} ha revocado tu permiso para transmitir en su mundo'
  },
  zh: {
    title: '世界许可被撤销',
    accessTitle: '世界访问被撤销',
    access: '您已被撤销访问世界{workd}的许可',
    deployment: '世界所有者{world}已撤销您在其世界中部署的许可',
    streaming: '世界的所有者{world}已撤销了您在世界上流媒体的允许'
  }
}

const WorldsPermissionRevokedNotification = ({
  notification,
  locale
}: CommonNotificationProps<WorldsPermissionRevokedNotification>) => {
  const permission = notification.metadata.permissions[0]
  const isAccessNotification = permission === 'access'
  const Icon = isAccessNotification ? AccessRestricted : PermissionRevoked

  return (
    <NotificationItem
      image={{ image: <Icon width="48" height="48" /> }}
      timestamp={notification.timestamp}
      isNew={!notification.read}
      locale={locale}
    >
      <p className="dcl notification-item__content-title">
        {isAccessNotification ? i18N[locale].accessTitle : i18N[locale].title}
      </p>
      <p className="dcl notification-item__content-description">
        {replaceWithValues(i18N[locale][permission], {
          world: <strong>{notification.metadata.world}</strong>
        })}
      </p>
    </NotificationItem>
  )
}

export default WorldsPermissionRevokedNotification
