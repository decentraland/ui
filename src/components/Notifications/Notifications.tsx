import React from 'react'

import NotificationsFeed from './NotificationsFeed'
import { ActiveTab, DCLNotification, NotificationLocale } from './types'

import NotificationBell from '../Icons/Notifications/NotificationBell'
import NotificationBellActive from '../Icons/Notifications/NotificationBellActive'

import './Notifications.css'

export interface NotificationsProps {
  isOpen: boolean
  items: DCLNotification[]
  isLoading: boolean
  locale: NotificationLocale
  isOnboarding: boolean
  activeTab: ActiveTab
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onChangeTab: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    newActiveTab: ActiveTab
  ) => void
  onBegin: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Notifications({
  isOpen,
  items,
  isLoading,
  locale,
  isOnboarding,
  activeTab,
  onClick,
  onChangeTab,
  onBegin
}: NotificationsProps) {
  const newNotificationsCount = items.filter(
    (notification) => !notification.read
  ).length

  return (
    <div className="dcl notifications">
      <div>
        <button className="dcl notifications-bell" onClick={onClick}>
          {!isOpen ? <NotificationBell /> : <NotificationBellActive />}
        </button>
        {!isOpen && newNotificationsCount > 0 && (
          <div className="dcl notifications-counter">
            {newNotificationsCount > 9 ? '9+' : newNotificationsCount}
          </div>
        )}
      </div>
      {isOpen && (
        <NotificationsFeed
          items={items}
          isLoading={isLoading}
          locale={locale}
          isOnboarding={isOnboarding}
          activeTab={activeTab}
          onChangeTab={onChangeTab}
          onBegin={onBegin}
        />
      )}
    </div>
  )
}
