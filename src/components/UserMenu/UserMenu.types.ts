import * as React from 'react'
import { Network } from '@dcl/schemas/dist/dapps/network'
import { Avatar } from '@dcl/schemas/dist/platform/profile/avatar'
import { NotificationsProps } from '../Notifications/Notifications'

export type ManaBalancesProps = {
  manaBalances?: Partial<Record<Network, number>>
  onClickBalance?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    network: Network
  ) => void
}

export type UserMenuSignedInProps = ManaBalancesProps & {
  avatar?: Avatar
  isOpen?: boolean
  trackingId?: string | null
  hasActivity?: boolean
  isClickable?: boolean
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
    id: UserMenuLabels,
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

export enum UserMenuLabels {
  ACTIVITY = 'Activity',
  MY_ASSETS = 'My Assets',
  SETTINGS = 'Account Settings',
  MY_LISTS = 'My Lists',
  ACCOUNT = 'Account',
  PROFILE = 'Profile',
  VIEW_PROFILE = 'View Profile',
  SIGN_IN = 'Sign In',
  SIGN_OUT = 'Sign out',
  GUEST = 'Guest',
  WALLET = 'My Wallet',
  JUMP_IN = 'Jump In'
}
