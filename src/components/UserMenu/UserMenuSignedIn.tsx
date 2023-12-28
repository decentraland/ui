import React, { useCallback } from 'react'
import classNames from 'classnames'

import { ManaBalances } from './ManaBalances'
import { UserMenuSignedInProps, UserMenuLabels } from './UserMenu.types'
import { AvatarFace } from '../AvatarFace/AvatarFace'
import { Button } from '../Button/Button'
import ActivityIcon from '../Icons/ActivityIcon'
import LogoutIcon from '../Icons/LogoutIcon'
import Notifications from '../Notifications/Notifications'
import { config } from '../../config'

import './UserMenu.css'
import './UserMenuSignedIn.css'

export const UserMenuSignedIn = (props: UserMenuSignedInProps) => {
  const {
    manaBalances,
    avatar,
    hasActivity,
    isClickable,
    isOpen,
    trackingId,
    notifications,
    onClickAccountSettings,
    onClickActivity,
    onClickBalance,
    onClickMenuItem,
    onClickMyAssets,
    onClickProfile,
    onClickSignOut,
    onClickToggle,
    onClickWallet
  } = props

  const handleClickActivity = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onClickMenuItem &&
        onClickMenuItem(event, UserMenuLabels.ACTIVITY, trackingId)
      setTimeout(
        () => {
          onClickActivity
            ? onClickActivity(event)
            : window.open(
                `${config.get('MARKETPLACE_URL')}/activity`,
                '_blank',
                'noopener'
              )
        },
        onClickActivity ? 300 : 0
      )
    },
    [onClickActivity, trackingId]
  )

  const handleClickMyAssets = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onClickMenuItem &&
        onClickMenuItem(event, UserMenuLabels.MY_ASSETS, trackingId)

      setTimeout(
        () => {
          onClickMyAssets
            ? onClickMyAssets(event)
            : window.open(
                `${config.get('MARKETPLACE_MY_ASSETS_URL')}`,
                '_blank',
                'noopener'
              )
        },
        onClickMenuItem ? 300 : 0
      )
    },
    [onClickMyAssets, onClickMenuItem, trackingId]
  )

  const handleClickAccountSettings = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onClickMenuItem &&
        onClickMenuItem(event, UserMenuLabels.SETTINGS, trackingId)

      setTimeout(
        () => {
          onClickAccountSettings
            ? onClickAccountSettings(event)
            : window.open(
                `${config.get('MARKETPLACE_SETTINGS_URL')}`,
                '_blank',
                'noopener'
              )
        },
        onClickMenuItem ? 300 : 0
      )
    },
    [onClickAccountSettings, onClickMenuItem, trackingId]
  )

  const handleClickProfile = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onClickMenuItem &&
        onClickMenuItem(event, UserMenuLabels.PROFILE, trackingId)

      setTimeout(
        () => {
          onClickProfile
            ? onClickProfile(event)
            : window.open(config.get('PROFILE_URL'), '_blank', 'noopener')
        },
        onClickMenuItem ? 300 : 0
      )
    },
    [onClickProfile, onClickMenuItem, trackingId]
  )

  const handleClickWallet = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onClickMenuItem &&
        onClickMenuItem(event, UserMenuLabels.WALLET, trackingId)

      setTimeout(
        () => {
          onClickWallet
            ? onClickWallet(event)
            : window.open(config.get('ACCOUNT_URL'), '_blank', 'noopener')
        },
        onClickMenuItem ? 300 : 0
      )
    },
    [onClickWallet, onClickMenuItem, trackingId]
  )

  const handleClickSignOut = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onClickSignOut(event, trackingId)
    },
    [onClickSignOut, trackingId]
  )

  const handleClickToggle = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onClickToggle(event)
    },
    [onClickToggle, trackingId]
  )

  return (
    <div className={classNames('dcl', 'user-menu-sign-in')}>
      {notifications && <Notifications {...notifications} />}
      <Button basic onClick={handleClickActivity} className="activity-icon">
        <ActivityIcon hasActivity={hasActivity} />
      </Button>
      <ManaBalances
        manaBalances={manaBalances}
        onClickBalance={onClickBalance}
      />
      <div className="toggle" onClick={handleClickToggle}>
        <AvatarFace size="medium" avatar={avatar} />
      </div>
      <div
        className={classNames(
          'menu-wrapper',
          isOpen && 'open',
          isClickable && 'clickable'
        )}
      >
        <div className="menu-wearable-preview">
          <img src={avatar.avatar.snapshots.body} />
          {/* <WearablePreview profile={avatar.ethAddress} disableBackground /> */}
        </div>
        <div className="menu-actions__wrapper">
          <div className={'menu-info'}>
            {avatar?.name || UserMenuLabels.GUEST}{' '}
            {!avatar.hasClaimedName && (
              <span>
                #{avatar.ethAddress.substring(avatar.ethAddress.length - 4)}
              </span>
            )}
          </div>
          <ul className="menu-actions">
            <div onClick={handleClickProfile}>
              <li>{UserMenuLabels.VIEW_PROFILE}</li>
            </div>
            <div onClick={handleClickMyAssets}>
              <li>{UserMenuLabels.MY_ASSETS}</li>
            </div>
            <div onClick={handleClickWallet}>
              <li>{UserMenuLabels.WALLET}</li>
            </div>
            <div onClick={handleClickAccountSettings}>
              <li>{UserMenuLabels.SETTINGS}</li>
            </div>
          </ul>
          <div onClick={handleClickSignOut} className="menu-option__sign-out">
            {UserMenuLabels.SIGN_OUT}
            <LogoutIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
