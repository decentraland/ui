import React from 'react'

import {
  CommonNotificationProps,
  WorldsPermissionGrantedNotification
} from '../../types'
import NotificationItem from '../../NotificationItem'
import PermissionGranted from '../../../Icons/Notifications/PermissionGranted'
import { config } from '../../../../config'
import AccessRestored from '../../../Icons/Notifications/AccessRestoredIcon'
import { replaceWithValues } from '../../utils'

const WORLDS_COLLABORATOR_URL = `${config.get(
  'BUILDER_URL'
)}/worlds?tab=collaborator`

const WORLD_WITH_REALM_URL = `${config.get('EXPLORER_URL')}?realm=`

export const i18N = {
  en: {
    title: 'World Permission Granted',
    accessTitle: 'World Access',
    access: 'You have been given permission to access World {world}',
    deployment: 'You have been granted deployer permission to World {world}',
    streaming: 'You have been granted streamer permission to World {world}'
  },
  es: {
    title: 'Permiso para mundo otorgado',
    accessTitle: 'Acceso a Mundo',
    access: 'Te han dado permiso para acceder al mundo {world}',
    deployment: 'Te han otorgado permiso de deployar al mundo {world}',
    streaming: 'Te han otorgado permiso de trasmitir en el mundo {world}'
  },
  zh: {
    title: '获得世界许可',
    accessTitle: '世界访问',
    access: '您已获得访问世界的许可 {world}',
    deployment: '您已被授予部署者的许可 {world}',
    streaming: '您已获得流媒体的许可 {world}'
  }
}

/**
 * @deprecated Should start using the same component migrated to UI2.
 */
const WorldsPermissionGrantedNotification = ({
  notification,
  locale
}: CommonNotificationProps<WorldsPermissionGrantedNotification>) => {
  const permission = notification.metadata.permissions[0] // for now only one permission is allowed per notification
  const isAccessNotification = permission === 'access'
  const world = notification.metadata.world
  const Icon = isAccessNotification ? AccessRestored : PermissionGranted
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
          world: (
            <a
              href={
                isAccessNotification
                  ? `${WORLD_WITH_REALM_URL}${world}`
                  : WORLDS_COLLABORATOR_URL
              }
              className="dcl notification-link"
              target="_blank"
            >
              {world}
            </a>
          )
        })}
      </p>
    </NotificationItem>
  )
}

export default WorldsPermissionGrantedNotification
