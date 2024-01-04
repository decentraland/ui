import * as React from 'react'
import { UserMenuSignedInProps } from './UserMenuSignedIn/UserMenuSignedIn.types'

export type UserMenuProps = Omit<
  UserMenuSignedInProps,
  'isOpen' | 'isClickable' | 'trackingId' | 'onClickToggle'
> & {
  isSignedIn?: boolean
  isSigningIn?: boolean
  isActivity?: boolean
  i18n?: UserMenuI18N
  onClickSignIn?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onClickOpen?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    trackingId: string
  ) => void
  onClickJumpIn?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export type UserMenuI18N = Record<
  | 'myAssets'
  | 'settings'
  | 'account'
  | 'viewProfile'
  | 'signIn'
  | 'signOut'
  | 'guest'
  | 'wallet'
  | 'jumpIn',
  string
>

export enum UserMenuEventId {
  ACTIVITY = 'activity',
  MY_ASSETS = 'my_assets',
  SETTINGS = 'settings',
  PROFILE = 'profile',
  SIGN_IN = 'sign_in',
  SIGN_OUT = 'sign_out',
  GUEST = 'guest',
  WALLET = 'wallet',
  JUMP_IN = 'jump_in',
  BALANCE = 'balance'
}
