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

export type UserMenuProps = ManaBalancesProps & {
  isSignedIn?: boolean
  isSigningIn?: boolean
  isActivity?: boolean
  onSignIn?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void

  hasActivity?: boolean
  avatar?: Avatar
  notifications?: NotificationsProps
  onSignOut?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    trackingId: string
  ) => void
  onClickOpen?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    trackId: string
  ) => void
  onClickAccount?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onClickActivity?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onClickProfile?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onClickJumpIn?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onClickSettings?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onClickMenuItem?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: UserMenuLabelsType,
    trackingId: string
  ) => void
  onClickMyAssets?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onClickMyLists?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export type SignedInProps = Omit<
  UserMenuProps,
  'isSignedIn' | 'isSigningIn' | 'isActivity' | 'onSignIn'
> & {
  isOpen?: boolean
  isClickable?: boolean
  trackingId: string | null
  onClickToggle?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export enum UserMenuLabelsType {
  ACTIVITY = 'Activity',
  MY_ASSETS = 'My Assets',
  SETTINGS = 'Settings',
  MY_LISTS = 'My Lists',
  ACCOUNT = 'Account',
  PROFILE = 'Profile',
  SIGN_IN = 'Sign In',
  SIGN_OUT = 'Sign out',
  GUEST = 'Guest',
  WALLET = 'Wallet',
  JUMP_IN = 'Jump In',
}
