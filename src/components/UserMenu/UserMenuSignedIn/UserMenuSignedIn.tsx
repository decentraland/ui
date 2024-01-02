import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'

import { ManaBalances } from '../ManaBalances/ManaBalances'
import { i18n } from '../UserMenu.i18n'
import { UserMenuSignedInProps } from './UserMenuSignedIn.types'
import { AvatarFace } from '../../AvatarFace/AvatarFace'
import { Button } from '../../Button/Button'
import ActivityIcon from '../../Icons/ActivityIcon'
import LogoutIcon from '../../Icons/LogoutIcon'
import Notifications from '../../Notifications/Notifications'
import ArrowIcon from '../../Icons/ArrowIcon'
import { config } from '../../../config'
import mansDefault from '../../../assets/man-default.png'

import '../UserMenu.css'
import './UserMenuSignedIn.css'

export const UserMenuSignedIn = (props: UserMenuSignedInProps) => {
  const {
    manaBalances,
    avatar,
    address,
    hasActivity,
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
      onClickMenuItem && onClickMenuItem(event, i18n.activity, trackingId)
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
      onClickMenuItem && onClickMenuItem(event, i18n.myAssets, trackingId)

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
      onClickMenuItem && onClickMenuItem(event, i18n.settings, trackingId)

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
      onClickMenuItem && onClickMenuItem(event, i18n.profile, trackingId)

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
      onClickMenuItem && onClickMenuItem(event, i18n.wallet, trackingId)

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

  const userAddress = useMemo(
    () => avatar?.ethAddress || address,
    [avatar, address]
  )

  return (
    <div className={classNames('dui-user-menu-sign-in')}>
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
        className={classNames('menu-wrapper', isOpen && 'open')}
        onMouseLeave={handleClickToggle}
      >
        <div
          className={classNames(
            'menu-wearable-preview',
            !avatar && 'default-avatar'
          )}
        >
          <img src={avatar?.avatar?.snapshots?.body || mansDefault} />
        </div>
        <div className="menu-actions__wrapper">
          <div className={'menu-info'}>
            {avatar?.name || i18n.guest}{' '}
            {!avatar?.hasClaimedName && userAddress && (
              <span>#{userAddress.substring(userAddress.length - 4)}</span>
            )}
          </div>
          <ul className="menu-actions">
            <div onClick={handleClickProfile}>
              <li>
                {i18n.viewProfile}
                <ArrowIcon />
              </li>
            </div>
            <div onClick={handleClickMyAssets}>
              <li>
                {i18n.myAssets}
                <ArrowIcon />
              </li>
            </div>
            <div onClick={handleClickWallet}>
              <li>
                {i18n.wallet}
                <ArrowIcon />
              </li>
            </div>
            <div onClick={handleClickAccountSettings}>
              <li>
                {i18n.settings}
                <ArrowIcon />
              </li>
            </div>
          </ul>
          <div onClick={handleClickSignOut} className="menu-option__sign-out">
            {i18n.signOut}
            <LogoutIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
