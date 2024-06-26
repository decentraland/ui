import { Avatar } from '@dcl/schemas/dist/platform/profile/avatar'
import { NotificationsProps } from '../../Notifications/Notifications'
import { ManaBalancesProps } from '../ManaBalances/ManaBalances.types'
import { UserMenuI18N } from '../UserMenu.types'

export type UserMenuSignedInProps = ManaBalancesProps & {
  avatar?: Avatar
  address?: string
  isOpen?: boolean
  trackingId?: string | null
  hasActivity?: boolean
  notifications?: NotificationsProps
  i18n: UserMenuI18N
  onClickMarketplaceAuthorization?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void
  onClickActivity?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onClickClose?: () => void
  onClickMyAssets?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onClickProfile?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onClickSignOut?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    trackingId: string
  ) => void
  onClickToggle?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onClickAccount?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onClickUserMenuItem?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    options: { type: string; url?: string; track_uuid?: string }
  ) => void
}
