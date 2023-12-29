import { Avatar } from '@dcl/schemas/dist/platform/profile/avatar'
import { NotificationsProps } from '../../Notifications/Notifications'
import { ManaBalancesProps } from '../ManaBalances/ManaBalances.types'

export type UserMenuSignedInProps = ManaBalancesProps & {
  avatar?: Avatar
  address?: string
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
