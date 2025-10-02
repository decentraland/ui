import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'

import { ManaBalances } from '../ManaBalances/ManaBalances'
import { UserMenuSignedInProps } from './UserMenuSignedIn.types'
import { AvatarFace } from '../../AvatarFace/AvatarFace'
import Button from '../../Button/Button'
import ActivityIcon from '../../Icons/ActivityIcon'
import LogoutIcon from '../../Icons/LogoutIcon'
import Notifications from '../../Notifications/Notifications'
import ArrowIcon from '../../Icons/ArrowIcon'
import { config } from '../../../config'
import { UserMenuEventId } from '../UserMenu.types'
import { useTabletAndBelowMediaQuery } from '../../Media'

import '../UserMenu.css'
import './UserMenuSignedIn.css'

/**
 * @deprecated Should start using the same component migrated to UI2.
 */
export const UserMenuSignedIn = (props: UserMenuSignedInProps) => {
  const {
    manaBalances,
    avatar,
    address,
    hasActivity,
    isOpen,
    trackingId,
    notifications,
    i18n,
    onClickMarketplaceAuthorization,
    onClickActivity,
    onClickBalance,
    onClickClose,
    onClickUserMenuItem,
    onClickMyAssets,
    onClickProfile,
    onClickSignOut,
    onClickToggle,
    onClickAccount
  } = props

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  const handleClickActivity = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (onClickUserMenuItem) {
        onClickUserMenuItem(event, {
          type: UserMenuEventId.ACTIVITY,
          track_uuid: trackingId,
          url: `${config.get('MARKETPLACE_URL')}/activity`
        })
      }
      setTimeout(
        () => {
          if (onClickActivity) {
            onClickActivity(event)
          } else {
            window.open(
              `${config.get('MARKETPLACE_URL')}/activity`,
              '_blank',
              'noopener'
            )
          }
        },
        onClickActivity ? 300 : 0
      )
    },
    [onClickActivity, onClickUserMenuItem, trackingId]
  )

  const handleClickMyAssets = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (onClickUserMenuItem) {
        onClickUserMenuItem(event, {
          type: UserMenuEventId.MY_ASSETS,
          track_uuid: trackingId,
          url: config.get('MARKETPLACE_MY_ASSETS_URL')
        })
      }

      setTimeout(
        () => {
          if (onClickMyAssets) {
            onClickMyAssets(event)
          } else {
            window.open(
              `${config.get('MARKETPLACE_MY_ASSETS_URL')}`,
              '_blank',
              'noopener'
            )
          }
        },
        onClickUserMenuItem ? 300 : 0
      )
    },
    [onClickMyAssets, onClickUserMenuItem, trackingId]
  )

  const handleClickMarketplaceAuthorization = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (onClickUserMenuItem) {
        onClickUserMenuItem(event, {
          type: UserMenuEventId.MARKETPLACE_AUTHORIZATIONS,
          track_uuid: trackingId,
          url: config.get('MARKETPLACE_SETTINGS_URL')
        })
      }
      setTimeout(
        () => {
          if (onClickMarketplaceAuthorization) {
            onClickMarketplaceAuthorization(event)
          } else {
            window.open(
              `${config.get('MARKETPLACE_SETTINGS_URL')}`,
              '_blank',
              'noopener'
            )
          }
        },
        onClickUserMenuItem ? 300 : 0
      )
    },
    [onClickMarketplaceAuthorization, onClickUserMenuItem, trackingId]
  )

  const handleClickProfile = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (onClickUserMenuItem) {
        onClickUserMenuItem(event, {
          type: UserMenuEventId.PROFILE,
          track_uuid: trackingId,
          url: config.get('PROFILE_URL')
        })
      }

      setTimeout(
        () => {
          if (onClickProfile) {
            onClickProfile(event)
          } else {
            window.open(config.get('PROFILE_URL'), '_blank', 'noopener')
          }
        },
        onClickUserMenuItem ? 300 : 0
      )
    },
    [onClickProfile, onClickUserMenuItem, trackingId]
  )

  const handleClickAccount = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (onClickUserMenuItem) {
        onClickUserMenuItem(event, {
          type: UserMenuEventId.ACCOUNT,
          track_uuid: trackingId,
          url: config.get('ACCOUNT_URL')
        })
      }

      setTimeout(
        () => {
          if (onClickAccount) {
            onClickAccount(event)
          } else {
            window.open(config.get('ACCOUNT_URL'), '_blank', 'noopener')
          }
        },
        onClickUserMenuItem ? 300 : 0
      )
    },
    [onClickAccount, onClickUserMenuItem, trackingId]
  )

  const handleClickSignOut = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (onClickUserMenuItem) {
        onClickUserMenuItem(event, {
          type: UserMenuEventId.SIGN_OUT,
          track_uuid: trackingId
        })
      }
      onClickSignOut(event, trackingId)
    },
    [onClickSignOut, onClickUserMenuItem, trackingId]
  )

  const handleClickToggle = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onClickToggle(event)
    },
    [onClickToggle]
  )

  const handleClickClose = useCallback(() => {
    onClickClose()
  }, [onClickClose])

  const userAddress = useMemo(
    () => avatar?.ethAddress || address,
    [avatar, address]
  )

  return (
    <div className={classNames('dui-user-menu-signed-in')}>
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
        onMouseLeave={handleClickClose}
        onScroll={!isTabletAndBelow ? handleClickClose : undefined}
      >
        <div
          className={classNames(
            'menu-wearable-preview',
            !avatar && 'default-avatar'
          )}
        >
          <div
            style={
              avatar?.avatar?.snapshots?.body
                ? {
                    backgroundImage: `url(${avatar?.avatar?.snapshots?.body})`
                  }
                : undefined
            }
          ></div>
        </div>
        <div className="menu-actions__wrapper">
          <div className={'menu-info'}>
            {avatar?.name || i18n.guest}{' '}
            {!avatar?.hasClaimedName && userAddress && (
              <span>#{userAddress.substring(userAddress.length - 4)}</span>
            )}
          </div>
          <ul className="menu-actions">
            <li>
              <div onClick={handleClickProfile}>
                {i18n.viewProfile}
                <ArrowIcon />
              </div>
            </li>
            <li>
              <div onClick={handleClickMyAssets}>
                {i18n.myAssets}
                <ArrowIcon />
              </div>
            </li>
            <li>
              <div onClick={handleClickAccount}>
                {i18n.account}
                <ArrowIcon />
              </div>
            </li>
            <li>
              <div onClick={handleClickMarketplaceAuthorization}>
                {i18n.marketplaceAuthorizations}
                <ArrowIcon />
              </div>
            </li>
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
