import React, { useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames'
import { Network } from '@dcl/schemas/dist/dapps/network'

import { UserMenuSignedIn } from './UserMenuSignedIn/UserMenuSignedIn'
import { i18n as i18nUserMenu } from './UserMenu.i18n'
import { UserMenuProps, UserMenuEventId } from './UserMenu.types'
import { Button } from '../Button/Button'
import { Column } from '../Column/Column'
import { Loader } from '../Loader/Loader'
import { config } from '../../config'
import { Row } from '../Row/Row'

import './UserMenu.css'
import { useTabletAndBelowMediaQuery } from '../Media'
import DownloadIcon from '../Icons/DownloadIcon'

/**
 * @deprecated Should start using the same component migrated to UI2.
 */
export const UserMenu = React.memo((props: UserMenuProps) => {
  const {
    isSignedIn,
    isSigningIn,
    isDisconnecting,
    manaBalances,
    i18n = i18nUserMenu,
    onClickSignIn,
    onClickBalance,
    onClickOpen,
    onClickDownload,
    onClickUserMenuItem,
    ...signInProps
  } = props

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

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

        if (isTabletAndBelow) {
          if (!prev) {
            window.addEventListener('scroll', noScroll)
          } else {
            window.removeEventListener('scroll', noScroll)
          }
        }

        return !prev
      })
    },
    [setIsOpen, onClickOpen]
  )

  const handleClose = useCallback(() => {
    setIsOpen(false)
    if (isTabletAndBelow) {
      window.removeEventListener('scroll', noScroll)
    }
  }, [setIsOpen])

  const handleDownload = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()
      onClickUserMenuItem &&
        onClickUserMenuItem(event, {
          type: UserMenuEventId.DOWNLOAD,
          track_uuid: trackingId,
          url: config.get('DOWNLOAD_URL')
        })

      setTimeout(
        () => {
          onClickDownload
            ? onClickDownload(event)
            : window.open(config.get('DOWNLOAD_URL'), '_blank', 'noopener')
        },
        onClickUserMenuItem ? 300 : 0
      )
    },
    [onClickDownload, onClickUserMenuItem, trackingId]
  )

  const handleClickSignIn = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()
      onClickUserMenuItem &&
        onClickUserMenuItem(event, {
          type: UserMenuEventId.SIGN_IN,
          track_uuid: trackingId,
          url: config.get('MARKETPLACE_URL')
        })

      onClickSignIn(event)
    },
    [onClickSignIn, onClickUserMenuItem, trackingId]
  )

  const handleClickBalance = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      network: Network
    ) => {
      event.preventDefault()
      onClickUserMenuItem &&
        onClickUserMenuItem(event, {
          type: UserMenuEventId.BALANCE
        })

      setTimeout(
        () => {
          onClickBalance
            ? onClickBalance(event, network)
            : window.open(config.get('ACCOUNT_URL'), '_blank', 'noopener')
        },
        onClickUserMenuItem ? 300 : 0
      )
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
          {isDisconnecting ? (
            <div className="dcl user-menu-loader">
              <Loader inline active size="medium" />
            </div>
          ) : (
            <>
              {isSignedIn && (
                <UserMenuSignedIn
                  {...signInProps}
                  manaBalances={manaBalances}
                  trackingId={trackingId}
                  isOpen={isOpen}
                  i18n={i18n}
                  onClickToggle={handleToggle}
                  onClickClose={handleClose}
                  onClickUserMenuItem={onClickUserMenuItem}
                  onClickBalance={handleClickBalance}
                />
              )}
              {!isSignedIn ? (
                <Button
                  inverted
                  disabled={isSigningIn}
                  loading={isSigningIn}
                  onClick={handleClickSignIn}
                >
                  {i18n.signIn}
                </Button>
              ) : null}
              <Button
                className="user-menu__download"
                primary
                onClick={handleDownload}
                as={'a'}
                href={config.get('DOWNLOAD_URL')}
              >
                <DownloadIcon />
                {i18n.download}
              </Button>
            </>
          )}
        </div>
      </Row>
    </Column>
  )
})

function noScroll() {
  window.scrollTo(0, 0)
}
