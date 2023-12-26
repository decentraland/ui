import React, { useCallback } from 'react'
import classNames from 'classnames'

import { ManaBalances } from './ManaBalances'
import {
  SignedInProps,
  UserMenuLabelsType,
} from './UserMenu.types'
import './UserMenu.css'
import { AvatarFace } from '../AvatarFace/AvatarFace'
import { Button } from '../Button/Button'
import { config } from '../../config'
import ActivityIcon from '../Icons/ActivityIcon'
import LogoutIcon from '../Icons/LogoutIcon'
import { WearablePreview } from '../WearablePreview/WearablePreview'
import Notifications from '../Notifications/Notifications'

export const SignedIn = (props: SignedInProps) => {
  const {
    manaBalances,
    onClickProfile,
    onClickSettings,
    onSignOut,
    avatar,
    hasActivity,
    isClickable,
    isOpen,
    trackingId,
    notifications,
    onClickToggle,
    onClickBalance,
    onClickActivity,
    onClickMyAssets,
    onClickMyLists,
    onClickMenuItem,
    onClickAccount,
  } = props

  const handleClickActivity = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onClickMenuItem &&
        onClickMenuItem(event, UserMenuLabelsType.ACTIVITY, trackingId)
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
        onClickMenuItem(event, UserMenuLabelsType.MY_ASSETS, trackingId)

      setTimeout(
        () => {
          onClickMyAssets
            ? onClickMyAssets(event)
            : window.open(
                `${config.get('MARKETPLACE_URL')}/account?section=collections`,
                '_blank',
                'noopener'
              )
        },
        onClickMenuItem ? 300 : 0
      )
    },
    [onClickMyAssets, onClickMenuItem, trackingId]
  )

  const handleClickSettings = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onClickMenuItem &&
        onClickMenuItem(event, UserMenuLabelsType.SETTINGS, trackingId)

      setTimeout(
        () => {
          onClickSettings
            ? onClickSettings(event)
            : window.open(
                `${config.get('MARKETPLACE_URL')}/settings`,
                '_blank',
                'noopener'
              )
        },
        onClickMenuItem ? 300 : 0
      )
    },
    [onClickSettings, onClickMenuItem, trackingId]
  )

  const handleClickMyLists = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onClickMenuItem &&
        onClickMenuItem(event, UserMenuLabelsType.MY_LISTS, trackingId)

      setTimeout(
        () => {
          onClickMyLists
            ? onClickMyLists(event)
            : window.open(
                `${config.get('MARKETPLACE_URL')}/lists`,
                '_blank',
                'noopener'
              )
        },
        onClickMenuItem ? 300 : 0
      )
    },
    [onClickMyLists, onClickMenuItem, trackingId]
  )

  const handleClickAccount = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onClickMenuItem &&
        onClickMenuItem(event, UserMenuLabelsType.ACCOUNT, trackingId)

      setTimeout(
        () => {
          onClickAccount
            ? onClickAccount(event)
            : window.open(config.get('ACCOUNT_URL'), '_blank', 'noopener')
        },
        onClickMenuItem ? 300 : 0
      )
    },
    [onClickAccount, onClickMenuItem, trackingId]
  )

  const handleClickProfile = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onClickMenuItem &&
        onClickMenuItem(event, UserMenuLabelsType.PROFILE, trackingId)

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

  const handleSignOut = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onSignOut(event, trackingId)
    },
    [onSignOut, trackingId]
  )

  const handleClickToggle = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onClickToggle(event)
    },
    [onClickToggle, trackingId]
  )

  return (
    <>
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
          {/* <img src={avatar.avatar.snapshots.body} /> */}
          <WearablePreview profile={avatar.ethAddress} disableBackground />
        </div>
        <div className="menu-actions__wrapper">
          <div
            className={classNames('menu-info', onClickProfile && 'clickable')}
            onClick={handleClickProfile}
          >
            {avatar?.name || UserMenuLabelsType.GUEST}{' '}
            {!avatar.hasClaimedName && (
              <span>
                #{avatar.ethAddress.substring(avatar.ethAddress.length - 4)}
              </span>
            )}
          </div>
          <ul className="menu-actions">
            <div onClick={handleClickAccount}>
              <li>{UserMenuLabelsType.WALLET}</li>
            </div>
            <div onClick={handleClickMyAssets}>
              <li>{UserMenuLabelsType.MY_ASSETS}</li>
            </div>
            <div onClick={handleClickMyLists}>
              <li>{UserMenuLabelsType.MY_LISTS}</li>
            </div>
            <div onClick={handleClickSettings}>
              <li>{UserMenuLabelsType.SETTINGS}</li>
            </div>
          </ul>
          <div onClick={handleSignOut} className="menu-option__sign-out">
            {UserMenuLabelsType.SIGN_OUT}
            <LogoutIcon />
          </div>
        </div>
      </div>
    </>
  )
}