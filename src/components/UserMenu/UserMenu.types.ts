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
  | 'account'
  | 'viewProfile'
  | 'signIn'
  | 'signOut'
  | 'guest'
  | 'marketplaceAuthorizations'
  | 'jumpIn',
  string
>

export enum UserMenuEventId {
  ACTIVITY = 'activity',
  ACCOUNT = 'account',
  MY_ASSETS = 'my_assets',
  PROFILE = 'profile',
  SIGN_IN = 'sign_in',
  SIGN_OUT = 'sign_out',
  GUEST = 'guest',
  MARKETPLACE_AUTHORIZATIONS = 'marketplace_authorizations',
  JUMP_IN = 'jump_in',
  BALANCE = 'balance'
}
