import React from 'react'

import NotificationsFeed from './NotificationsFeed'
import { ActiveTab, DCLNotification, NotificationLocale } from './types'

import NotificationBell from '../Icons/Notifications/NotificationBell'
import NotificationBellActive from '../Icons/Notifications/NotificationBellActive'

import './Notifications.css'

export interface NotificationsProps {
  isOpen: boolean
  userNotifications: DCLNotification[]
  isLoading: boolean
  locale: NotificationLocale
  isOnboarding: boolean
  activeTab: ActiveTab
  onClickToggle: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onChangeTab: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    newActiveTab: ActiveTab
  ) => void
  onBegin: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Notifications({
  isOpen,
  userNotifications,
  isLoading,
  locale,
  isOnboarding,
  activeTab,
  onClickToggle,
  onChangeTab,
  onBegin
}: NotificationsProps) {
  const unseenNotifications = userNotifications.filter(
    (notification) => !notification.read
  ).length

  return (
    <div className="dcl notifications">
      <div>
        <button className="dcl notifications-bell" onClick={onClickToggle}>
          {!isOpen ? <NotificationBell /> : <NotificationBellActive />}
        </button>
        {!isOpen && unseenNotifications > 0 && (
          <div className="dcl notifications-counter">
            {unseenNotifications > 9 ? '9+' : unseenNotifications}
          </div>
        )}
      </div>
      {isOpen && (
        <NotificationsFeed
          userNotifications={userNotifications}
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
