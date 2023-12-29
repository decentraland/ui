import * as React from 'react'
import { Avatar } from '@dcl/schemas/dist/platform/profile/avatar'
import { NotificationsProps } from '../Notifications/Notifications'
import { ManaBalancesProps } from './ManaBalances/ManaBalances.types'

export type UserMenuSignedInProps = ManaBalancesProps & {
  avatar?: Avatar
  isOpen?: boolean
  trackingId?: string | null
  hasActivity?: boolean
  notifications?: NotificationsProps
  onClickAccountSettings?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void
  onClickActivity?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onClickMyAssets?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onClickProfile?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onClickSignOut?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    trackingId: string
  ) => void
  onClickToggle?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onClickWallet?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onClickMenuItem?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
    trackingId?: string
  ) => void
}

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
