import React, { useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames'
import { Network } from '@dcl/schemas/dist/dapps/network'

import { UserMenuSignedIn } from './UserMenuSignedIn/UserMenuSignedIn'
import { i18n as i18nUserMenu } from './UserMenu.i18n'
import { UserMenuProps, UserMenuEventId } from './UserMenu.types'
import { Button } from '../Button/Button'
import { Column } from '../Column/Column'
import { config } from '../../config'
import { Row } from '../Row/Row'

import './UserMenu.css'

export const UserMenu = React.memo((props: UserMenuProps) => {
  const {
    isSignedIn,
    isSigningIn,
    manaBalances,
    i18n = i18nUserMenu,
    onClickSignIn,
    onClickBalance,
    onClickOpen,
    onClickJumpIn,
    onClickUserMenuItem,
    ...signInProps
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const [trackingId, setTrackingId] = useState<string | null>(null)
  const handleToggle = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const trackId = uuidv4()
      setIsOpen((prev) => {
        if (!prev) {
          setTrackingId(trackId)
        }
        if (!prev && onClickOpen) {
          onClickOpen(event, trackId)
        }
        return !prev
      })
    },
    [setIsOpen, onClickOpen]
  )

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const handleClickJumpIn = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()
      onClickUserMenuItem &&
        onClickUserMenuItem(event, {
          eventTrackingName: UserMenuEventId.JUMP_IN,
          trackingId,
          url: config.get('EXPLORER_URL')
        })

      setTimeout(
        () => {
          onClickJumpIn
            ? onClickJumpIn(event)
            : window.open(config.get('EXPLORER_URL'), '_blank', 'noopener')
        },
        onClickUserMenuItem ? 300 : 0
      )
    },
    [onClickJumpIn, onClickUserMenuItem, trackingId]
  )

  const handleClickSignIn = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()
      onClickUserMenuItem &&
        onClickUserMenuItem(event, {
          eventTrackingName: UserMenuEventId.SIGN_IN,
          trackingId,
          url: config.get('MARKETPLACE_URL')
        })

      onClickSignIn(event)
    },
    [onClickSignIn, onClickUserMenuItem, trackingId]
  )

  const handleClickBalance = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, network: Network) => {
      event.preventDefault()
      onClickUserMenuItem &&
        onClickUserMenuItem(event, {
          eventTrackingName: UserMenuEventId.BALANCE
        })

      onClickBalance(event, network)
    },
    [onClickBalance, onClickUserMenuItem, trackingId]
  )

  return (
    <Column align="right">
      <Row className={classNames('dcl', 'user-menu-wrapper')}>
        <div
          className={classNames('dcl', 'user-menu')}
          onBlur={handleClose}
          tabIndex={0}
        >
          {isSignedIn && (
            <UserMenuSignedIn
              {...signInProps}
              manaBalances={manaBalances}
              trackingId={trackingId}
              isOpen={isOpen}
              i18n={i18n}
              onClickToggle={handleToggle}
              onClickUserMenuItem={onClickUserMenuItem}
              onClickBalance={handleClickBalance}
            />
          )}
          {!isSignedIn && (
            <Button inverted disabled={isSigningIn} onClick={handleClickSignIn}>
              {i18n.signIn}
            </Button>
          )}
          <Button
            className="user-menu__jump-in"
            primary
            disabled={isSigningIn}
            onClick={handleClickJumpIn}
            as={'a'}
            href={config.get('EXPLORER_URL')}
          >
            {i18n.jumpIn}
          </Button>
        </div>
      </Row>
    </Column>
  )
})
