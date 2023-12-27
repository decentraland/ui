import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames'

import { ManaBalances } from './ManaBalances'
import { UserMenuSignedIn } from './UserMenuSignedIn'
import { UserMenuProps, UserMenuLabels } from './UserMenu.types'
import './UserMenu.css'
import { Mobile } from '../Media'
import { Button } from '../Button/Button'
import { Column } from '../Column/Column'
import { config } from '../../config'
import { Row } from '../Row/Row'

export const UserMenu = React.memo((props: UserMenuProps) => {
  const {
    isSignedIn,
    isSigningIn,
    manaBalances,
    onClickSignIn,
    onClickBalance,
    onClickOpen,
    onClickJumpIn,
    onClickMenuItem,
    ...signInProps
  } = props

  const [isOpen, setIsOpen] = useState(false)
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
      onClickMenuItem &&
        onClickMenuItem(event, UserMenuLabels.PROFILE, trackingId)

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
              isClickable={isClickable}
              onClickToggle={handleToggle}
              onClickMenuItem={onClickMenuItem}
              onClickBalance={onClickBalance}
            />
          )}
          {!isSignedIn && (
            <Button inverted disabled={isSigningIn} onClick={onClickSignIn}>
              {UserMenuLabels.SIGN_IN}
            </Button>
          )}
          <Button
            className="user-menu__jump-in"
            primary
            disabled={isSigningIn}
            onClick={handleClickJumpIn}
          >
            {UserMenuLabels.JUMP_IN}
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
