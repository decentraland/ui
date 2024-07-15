import React, { useMemo } from 'react'
import classNames from 'classnames'

import NotificationsFeed from './NotificationsFeed'
import {
  NotificationActiveTab,
  DCLNotification,
  NotificationLocale
} from './types'

import NotificationBell from '../Icons/Notifications/NotificationBell'
import NotificationBellActive from '../Icons/Notifications/NotificationBellActive'
import { ModalProps } from '../Modal/Modal'
import Counter from '../Icons/Notifications/CounterIcons'

import './Notifications.css'

export interface NotificationsProps {
  isOpen: boolean
  items: DCLNotification[]
  isLoading: boolean
  locale: NotificationLocale
  isOnboarding: boolean
  activeTab: NotificationActiveTab
  renderProfile?: (address: string) => JSX.Element | string | null
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
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

export default function Notifications({
  isOpen,
  items,
  isLoading,
  locale,
  isOnboarding,
  activeTab,
  renderProfile,
  onClick,
  onChangeTab,
  onBegin,
  onClose
}: NotificationsProps) {
  const newNotificationsCount = useMemo(() => {
    return items.filter((notification) => !notification.read).length
  }, [items])

  return (
    <div className="dcl notifications">
      <div>
        <button
          className={classNames('dcl notifications-bell', {
            'notifications-active': newNotificationsCount > 0
          })}
          onClick={onClick}
        >
          {!isOpen ? <NotificationBell /> : <NotificationBellActive />}
        </button>
        {!isOpen && newNotificationsCount > 0 && (
          <div className="dcl notifications-counter">
            <Counter count={newNotificationsCount} />
          </div>
        )}
      </div>
      {isOpen && (
        <NotificationsFeed
          isOpen={isOpen}
          items={items}
          isLoading={isLoading}
          locale={locale}
          isOnboarding={isOnboarding}
          activeTab={activeTab}
          onChangeTab={onChangeTab}
          onBegin={onBegin}
          onClose={onClose}
          renderProfile={renderProfile}
        />
      )}
    </div>
  )
}
