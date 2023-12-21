import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Network } from '@dcl/schemas/dist/dapps/network'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import classNames from 'classnames'

import { AvatarFace } from '../AvatarFace/AvatarFace'
import { Mobile } from '../Media'
import { Mana } from '../Mana/Mana'
import { Button } from '../Button/Button'
import { Column } from '../Column/Column'
import { config } from '../../config'
import { Row } from '../Row/Row'
import ActivityIcon from '../Icons/ActivityIcon'
import LogoutIcon from '../Icons/LogoutIcon'
import { WearablePreview } from '../WearablePreview/WearablePreview'
import {
  ManaBalancesProps,
  SignedInProps,
  UserMenuProps,
  UserMenuLabelsType,
} from './UserMenu.types'
import './UserMenu.css'

const ManaBalances = (props: ManaBalancesProps) => {
  const { manaBalances, onClickBalance } = props

  return (
    <span className={classNames('dcl', 'account-wrapper')}>
      {manaBalances &&
        Object.keys(manaBalances).map((network) => (
          <Mana
            key={network}
            network={network as Network}
            size="small"
            className={classNames(onClickBalance && 'clickable')}
            title={`${manaBalances[network].toLocaleString()} MANA`}
            href={config.get('ACCOUNT_URL')}
          >
            {Number(manaBalances[network].toFixed(2)).toLocaleString()}
          </Mana>
        ))}
    </span>
  )
}

const SignedIn = (props: SignedInProps) => {
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

export const UserMenu = React.memo((props: UserMenuProps) => {
  const {
    avatar,
    manaBalances,
    isSignedIn,
    isSigningIn,
    isActivity,
    hasActivity,
    onSignIn,
    onSignOut,
    onClickActivity,
    onClickBalance,
    onClickProfile,
    onClickOpen,
    onClickJumpIn,
    onClickSettings,
    onClickMenuItem,
  } = props

  const [isOpen, setIsOpen] = useState(true)
  const [isClickable, setIsClickable] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [trackingId, setTrackingId] = useState<string | null>(null)

  useEffect(() => {
    setIsOpen(isOpen)
    setTimeout(() => {
      if (isMounted) {
        setIsClickable(isOpen)
      }
    }, 250)
  }, [isOpen, setIsOpen, setIsClickable, setIsMounted])

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const handleToggle = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const trackId = uuidv4()
      setIsOpen((prev) => {
        !prev && setTrackingId(trackId)
        !prev && onClickOpen && onClickOpen(event, trackId)
        return true
      })
    },
    [setIsOpen, onClickOpen]
  )

  const handleClose = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const handleClickJumpIn = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onClickMenuItem &&
        onClickMenuItem(event, UserMenuLabelsType.PROFILE, trackingId)

      setTimeout(
        () => {
          onClickJumpIn
            ? onClickJumpIn(event)
            : window.open(config.get('EXPLORER_URL'), '_blank', 'noopener')
        },
        onClickMenuItem ? 300 : 0
      )
    },
    [onClickJumpIn, onClickMenuItem, trackingId]
  )

  const isSomeBalanceTooHigh = useMemo(
    () =>
      manaBalances &&
      Object.values(manaBalances).some(
        (balance) => Number(balance.toFixed(2)).toLocaleString().length > 5
      ),
    [manaBalances]
  )

  return (
    <Column align="right">
      <Row className={classNames('dcl', 'user-menu-wrapper')}>
        <Menu.Item
          className={classNames('activity-bell', isActivity && 'active')}
        >
          {onClickActivity ? (
            <Icon
              className={classNames(hasActivity && 'pending')}
              name="bell"
              onClick={onClickActivity}
            />
          ) : null}
        </Menu.Item>
        <div
          className={classNames('dcl', 'user-menu')}
          onBlur={handleClose}
          tabIndex={0}
        >
          {isSignedIn && (
            <SignedIn
              manaBalances={manaBalances}
              avatar={avatar}
              trackingId={trackingId}
              isOpen={isOpen}
              isClickable={isClickable}
              onClickToggle={handleToggle}
              onClickMenuItem={onClickMenuItem}
              onClickProfile={onClickProfile}
              onClickSettings={onClickSettings}
              onSignOut={onSignOut}
            />
          )}
          {!isSignedIn && (
            <Button inverted disabled={isSigningIn} onClick={onSignIn}>
              {UserMenuLabelsType.SIGN_IN}
            </Button>
          )}
          <Button
            className="user-menu__jump-in"
            primary
            disabled={isSigningIn}
            onClick={handleClickJumpIn}
          >
            {UserMenuLabelsType.JUMP_IN}
          </Button>
        </div>
      </Row>
      {isSignedIn && isSomeBalanceTooHigh && (
        <Mobile>
          <Row
            className={classNames('dcl', 'mobile-user-balances-wrapper')}
            align="right"
          >
            <ManaBalances
              manaBalances={manaBalances}
              onClickBalance={onClickBalance}
            />
          </Row>
        </Mobile>
      )}
    </Column>
  )
})
