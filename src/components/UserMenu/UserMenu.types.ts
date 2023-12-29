import * as React from 'react'
import { UserMenuSignedInProps } from './UserMenuSignedIn/UserMenuSignedIn.types'

export type UserMenuProps = Omit<
  UserMenuSignedInProps,
  'isOpen' | 'isClickable' | 'trackingId' | 'onClickToggle'
> & {
  isSignedIn?: boolean
  isSigningIn?: boolean
  isActivity?: boolean
  onClickSignIn?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onClickOpen?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    trackingId: string
  ) => void
  onClickJumpIn?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export type UserMenuI18N = Record<
  | 'activity'
  | 'myAssets'
  | 'settings'
  | 'myLists'
  | 'account'
  | 'profile'
  | 'viewProfile'
  | 'signIn'
  | 'signOut'
  | 'guest'
  | 'wallet'
  | 'jumpIn',
  string
>
