import React, { useMemo } from 'react'

import { Loader } from '../Loader/Loader'
import { ActiveTab, DCLNotification, NotificationLocale } from './types'

import './NotificationsFeed.css'
import ItemSoldNotification from './NotificationTypes/ItemSoldNotification'
import EmptyInbox from '../Icons/Notifications/EmptyInbox'
import { Tabs } from '../Tabs/Tabs'
import { Button } from '../Button/Button'
import Time from '../../lib/time'
import RoyaltiesEarnedNotification from './NotificationTypes/RoyaltiesEarnedNotification'

interface NotificationsFeedProps {
  userNotifications: DCLNotification[]
  isLoading: boolean
  locale: NotificationLocale
  isOnboarding: boolean
  activeTab: ActiveTab
  onChangeTab: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    newActiveTab: ActiveTab
  ) => void
  onBegin: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const i18N = {
  en: {
    onboarding: {
      title: 'Introducing Decentraland Inbox System',
      description:
        'Never miss anything anymore! Now you will get notified every time something relevant happens to your account.',
      button: "Let's begin"
    },
    feed: {
      title: 'Notifications',
      tabs: {
        newest: 'Newest',
        read: 'Read'
      },
      empty: {
        title: "You're all caught up!",
        description:
          "We'll let you know if there are new notifications for you."
      }
    }
  },
  es: {
    onboarding: {
      title: 'Presentacion de Decentraland Inbox',
      description:
        '¡No te pierdas nada nunca más! Ahora recibirás una notificación cada vez que ocurra algo relevante en tu cuenta.',
      button: 'Continuar'
    },
    feed: {
      title: 'Notificaciones',
      tabs: {
        newest: 'Mas reciente',
        read: 'Leidas'
      },
      empty: {
        title: '¡Ya estas al día!',
        description: 'Te avisaremos si hay nuevas notificaciones para ti.'
      }
    }
  },
  zh: {
    onboarding: {
      title: '介绍 Decentraland 收件箱系统 ',
      description:
        '不再错过任何信息！现在，每当您的账户发生相关事件，您都会收到通知。',
      button: '讓我們開始'
    },
    feed: {
      title: '通知',
      tabs: {
        newest: '最新',
        read: '阅读'
      },
      empty: {
        title: '你们都赶上了！',
        description: '如果有新的通知，我们会及时通知您'
      }
    }
  }
}

const NotificationHandler = ({ locale, notification }: { notification: DCLNotification, locale: NotificationLocale }) => {
  switch (notification.type) {
    case 'item_sold':
      return (
        <ItemSoldNotification
        notification={notification}
        locale={locale}
      />
    )
    case 'royalties_earned': 
    return (
      <RoyaltiesEarnedNotification 
        notification={notification}
        locale={locale}
      />
    )
    default:
      return null
  }
}

export default function NotificationsFeed({
  userNotifications,
  isLoading,
  locale,
  isOnboarding,
  activeTab,
  onChangeTab,
  onBegin
}: NotificationsFeedProps) {
  const unreadNotifications = useMemo(
    () => userNotifications.filter((notification) => !notification.read),
    [userNotifications]
  )
  const previousNotifications = useMemo(
    () =>
      userNotifications.filter((notification) => {
        if (!notification.read) return false

        const diff = Time(notification.timestamp).diff(new Date(), 'hour')
        if (diff >= -24 && diff < 0) {
          return true
        }
      }),
    [userNotifications]
  )
  const readNotifications = useMemo(
    () => userNotifications.filter((notification) => notification.read),
    [userNotifications]
  )

  if (isOnboarding) {
    return (
      <div className="dcl notifications-feed">
        <div className="dcl notifications-feed__content">
          <div className="dcl notifications-feed__onboarding">
            <div className="dcl notifications-feed__onboarding-bell"></div>
            <p className="dcl notifications-feed__emptyview__title">
              {i18N[locale].onboarding.title}
            </p>
            <p className="dcl notifications-feed__emptyview__description">
              {i18N[locale].onboarding.description}
            </p>
            <div>
              <Button inverted size="small" onClick={onBegin}>
                {i18N[locale].onboarding.button}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dcl notifications-feed">
      <div className="dcl notifications-feed__header">
        <p className="dcl notifications-feed__title">
          {i18N[locale].feed.title}
        </p>
      </div>
      {!isLoading && (
        <div className="dcl notifications-feed__content">
          {userNotifications.length > 0 && (
            <Tabs>
              <Tabs.Tab
                active={activeTab === 'newest'}
                onClick={(e) => onChangeTab(e, 'newest')}
              >
                {i18N[locale].feed.tabs.newest}
              </Tabs.Tab>
              <Tabs.Tab
                active={activeTab === 'read'}
                onClick={(e) => onChangeTab(e, 'read')}
              >
                {i18N[locale].feed.tabs.read}
              </Tabs.Tab>
            </Tabs>
          )}
          {userNotifications.length > 0 && (
            <div className="dcl notifications-feed__list-container">
              <div className="dcl notifications-feed__list">
                {activeTab == 'newest' ? (
                  <>
                    <div>
                      {unreadNotifications.map((notification) => <NotificationHandler notification={notification} locale={locale} /> )}
                    </div>
                    {
                      previousNotifications.length > 0 && (
                        <div>
                        <p
                          style={{
                            fontSize: '16px',
                            fontWeight: 600,
                            paddingLeft: '16px',
                            marginBottom: 0
                          }}
                        >
                          Previous
                        </p>
                        {previousNotifications.map((notification) => <NotificationHandler notification={notification} locale={locale} />)}
                      </div>
                      )
                    }
                  </>
                ) : (
                  <>
                    {readNotifications.map((notification) =>  <NotificationHandler notification={notification} locale={locale} />)}
                  </>
                )}
              </div>
            </div>
          )}
          {!userNotifications.length && (
            <div className="dcl notifications-feed__emptyview">
              <EmptyInbox />
              <p className="dcl notifications-feed__emptyview__title">
                {i18N[locale].feed.empty.title}
              </p>
              <p className="dcl notifications-feed__emptyview__description">
                {i18N[locale].feed.empty.description}
              </p>
            </div>
          )}
        </div>
      )}
      {isLoading && <Loader active />}
    </div>
  )
}
