import React, { useEffect, useMemo } from 'react'

import { Loader } from '../Loader/Loader'
import {
  NotificationActiveTab,
  DCLNotification,
  NotificationLocale
} from './types'

import EmptyInbox from '../Icons/Notifications/EmptyInbox'
import { Tabs } from '../Tabs/Tabs'
import { Button } from '../Button/Button'
import Time from '../../lib/time'
import { Mobile, NotMobile } from '../Media'
import { Modal, ModalProps } from '../Modal/Modal'
import { Close } from '../Close/Close'
import History from '../Icons/Notifications/History'

import './NotificationsFeed.css'
import { NotificationComponentByType } from './utils'

interface NotificationsFeedProps {
  items: DCLNotification[]
  isLoading: boolean
  locale: NotificationLocale
  isOnboarding: boolean
  activeTab: NotificationActiveTab
  isOpen: boolean
  renderProfile?: (address: string) => JSX.Element | string | null
  onChangeTab: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    newActiveTab: NotificationActiveTab
  ) => void
  onBegin: (e: React.MouseEvent<HTMLButtonElement>) => void
  onClose: (
    event: React.MouseEvent<HTMLElement> | MouseEvent,
    data?: ModalProps
  ) => void
}

const i18N = {
  en: {
    onboarding: {
      title: 'Welcome to Decentraland Notifications',
      description:
        "Never miss a thing! Now, you'll receive a notification each time something relevant happens with your account.",
      button: "Let's begin"
    },
    feed: {
      title: 'Notifications',
      tabs: {
        newest: 'New',
        read: 'Seen'
      },
      empty: {
        title: "You're all caught up!",
        description: 'No new notifications.'
      },
      history: {
        title: 'Notifications History',
        description: "You'll be able to access old notifications here."
      }
    }
  },
  es: {
    onboarding: {
      title: 'Tus Notificaciones de Decentraland',
      description:
        '¡No te pierdas nada nunca más! Ahora recibirás una notificación cada vez que ocurra algo relevante en tu cuenta.',
      button: 'Continuar'
    },
    feed: {
      title: 'Notificaciones',
      tabs: {
        newest: 'Reciente',
        read: 'Visto'
      },
      empty: {
        title: '¡Ya estas al día!',
        description: 'Te avisaremos si hay nuevas notificaciones para ti.'
      },
      history: {
        title: 'Historial de Notificaciones',
        description:
          'Aquí aparecerá una lista detallada de las Notificaciones pasadas'
      }
    }
  },
  zh: {
    onboarding: {
      title: '欢迎访问 Decentraland 通知',
      description:
        '不再错过任何信息！现在，每当您的账户发生相关事件，您都会收到通知。',
      button: '讓我們開始'
    },
    feed: {
      title: '通知',
      tabs: {
        newest: '新',
        read: '看到的'
      },
      empty: {
        title: '你们都赶上了！',
        description: '没有新通知。'
      },
      history: {
        title: '通知历史',
        description: '您可以在这里访问旧通知。'
      }
    }
  }
}

const NotificationHandler = ({
  locale,
  notification,
  renderProfile
}: {
  notification: DCLNotification
  locale: NotificationLocale
  renderProfile?: (address: string) => JSX.Element | string | null
}) => {
  const NotificationComponent = NotificationComponentByType[notification.type]
  return (
    <NotificationComponent
      notification={notification}
      locale={locale}
      renderProfile={renderProfile}
    />
  )
}

export default function NotificationsFeed({
  items,
  isLoading,
  locale,
  isOnboarding,
  activeTab,
  isOpen,
  renderProfile,
  onChangeTab,
  onBegin,
  onClose
}: NotificationsFeedProps) {
  const unreadNotifications = useMemo(
    () => items.filter((notification) => !notification.read),
    [items]
  )

  const previousNotifications = useMemo(
    () =>
      items.filter((notification) => {
        if (!notification.read) return false

        const diff = Time(notification.timestamp).diff(new Date(), 'hour')
        if (diff >= -48 && diff <= 0) {
          return true
        }
      }),
    [items]
  )

  const readNotifications = useMemo(
    () =>
      items.filter(
        (notification) =>
          notification.read &&
          !previousNotifications.find(({ id }) => id === notification.id)
      ),
    [items]
  )

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const element = document.querySelector('.notifications-feed')
      if (element && !element.contains(event.target as Node)) {
        event.preventDefault()
        event.stopPropagation()
        onClose(event)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  if (isOnboarding) {
    return (
      <>
        <Mobile>
          <Modal open={isOpen} size="fullscreen" closeIcon={<Close />}>
            <Modal.Content>
              <Onboarding locale={locale} onBegin={onBegin} />
            </Modal.Content>
          </Modal>
        </Mobile>
        <NotMobile>
          <div className="dcl notifications-feed">
            <Onboarding locale={locale} onBegin={onBegin} />
          </div>
        </NotMobile>
      </>
    )
  }

  return (
    <>
      <Mobile>
        <Modal
          open={isOpen}
          size="fullscreen"
          closeIcon={<Close />}
          closeOnDocumentClick
          closeOnTriggerClick
          onClose={onClose}
        >
          <div className="dcl notifications-feed-modal">
            <Feed
              locale={locale}
              previousNotifications={previousNotifications}
              readNotifications={readNotifications}
              unreadNotifications={unreadNotifications}
              onChangeTab={onChangeTab}
              activeTab={activeTab}
              isModal
              renderProfile={renderProfile}
            />
          </div>
        </Modal>
      </Mobile>
      <NotMobile>
        <div className="dcl notifications-feed">
          {isLoading ? (
            <div className="dcl notifications-feed__loader">
              <Loader active />
            </div>
          ) : (
            <Feed
              locale={locale}
              previousNotifications={previousNotifications}
              readNotifications={readNotifications}
              unreadNotifications={unreadNotifications}
              onChangeTab={onChangeTab}
              activeTab={activeTab}
              renderProfile={renderProfile}
            />
          )}
        </div>
      </NotMobile>
    </>
  )
}

const NoNotifications = ({ locale }: { locale: NotificationLocale }) => (
  <div className="dcl notifications-feed__emptyview">
    <EmptyInbox />
    <p className="dcl notifications-feed__emptyview-title">
      {i18N[locale].feed.empty.title}
    </p>
    <p className="dcl notifications-feed__emptyview-description">
      {i18N[locale].feed.empty.description}
    </p>
  </div>
)

const NoReadNotifications = ({ locale }: { locale: NotificationLocale }) => (
  <div className="dcl notifications-feed__emptyview">
    <History />
    <p className="dcl notifications-feed__emptyview-title">
      {i18N[locale].feed.history.title}
    </p>
    <p className="dcl notifications-feed__emptyview-description">
      {i18N[locale].feed.history.description}
    </p>
  </div>
)

const Onboarding = ({
  locale,
  onBegin
}: {
  locale: NotificationLocale
  onBegin: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => (
  <div className="dcl notifications-feed__content">
    <div className="dcl notifications-feed__onboarding">
      <div className="dcl notifications-feed__onboarding-bell"></div>
      <p className="dcl notifications-feed__emptyview-title">
        {i18N[locale].onboarding.title}
      </p>
      <p className="dcl notifications-feed__emptyview-description">
        {i18N[locale].onboarding.description}
      </p>
      <div>
        <Button inverted size="small" onClick={onBegin}>
          {i18N[locale].onboarding.button}
        </Button>
      </div>
    </div>
  </div>
)

const Feed = ({
  unreadNotifications,
  locale,
  previousNotifications,
  readNotifications,
  activeTab,
  isModal,
  renderProfile,
  onChangeTab
}: {
  unreadNotifications: DCLNotification[]
  previousNotifications: DCLNotification[]
  readNotifications: DCLNotification[]
  locale: NotificationLocale
  activeTab: NotificationActiveTab
  isModal?: boolean
  renderProfile?: (address: string) => JSX.Element | string | null
  onChangeTab: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    newActiveTab: NotificationActiveTab
  ) => void
}) => (
  <>
    <div className="dcl notifications-feed__header">
      <p className="dcl notifications-feed__title">{i18N[locale].feed.title}</p>
    </div>
    <div className="dcl notifications-feed__content">
      <Tabs className="notifications-feed__tabs">
        <Tabs.Tab
          active={activeTab === NotificationActiveTab.NEWEST}
          onClick={(e) => onChangeTab(e, NotificationActiveTab.NEWEST)}
        >
          {i18N[locale].feed.tabs.newest}
        </Tabs.Tab>
        <Tabs.Tab
          active={activeTab === NotificationActiveTab.READ}
          onClick={(e) => onChangeTab(e, NotificationActiveTab.READ)}
        >
          {i18N[locale].feed.tabs.read}
        </Tabs.Tab>
      </Tabs>
      <div
        className={`dcl ${
          isModal
            ? 'notifications-feed-modal__list-container'
            : 'notifications-feed__list-container'
        }`}
      >
        <div className="dcl notifications-feed__list">
          {activeTab == 'newest' ? (
            <>
              {!unreadNotifications.length && !previousNotifications.length ? (
                <NoNotifications locale={locale} />
              ) : (
                <>
                  <div>
                    {unreadNotifications.map((notification) => (
                      <NotificationHandler
                        key={notification.id}
                        notification={notification}
                        locale={locale}
                        renderProfile={renderProfile}
                      />
                    ))}
                  </div>
                  {previousNotifications.length > 0 && (
                    <div>
                      <p className="dcl notification-feed__list-previous-title">
                        Previous
                      </p>
                      {previousNotifications.map((notification) => (
                        <NotificationHandler
                          key={notification.id}
                          notification={notification}
                          locale={locale}
                          renderProfile={renderProfile}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {readNotifications.length > 0 ? (
                readNotifications.map((notification) => (
                  <NotificationHandler
                    key={notification.id}
                    notification={notification}
                    locale={locale}
                    renderProfile={renderProfile}
                  />
                ))
              ) : (
                <NoReadNotifications locale={locale} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  </>
)
