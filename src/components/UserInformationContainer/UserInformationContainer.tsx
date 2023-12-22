import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames'
import { Network } from '@dcl/schemas/dist/dapps/network'
import { Avatar } from '@dcl/schemas/dist/platform/profile/avatar'
import { AvatarFace } from '../AvatarFace/AvatarFace'
import { Mana } from '../Mana/Mana'
import { Button } from '../Button/Button'
import { Column } from '../Column/Column'
import ActivityIcon from '../Icons/ActivityIcon'
import Wallet from '../Icons/Wallet'
import LogoutIcon from '../Icons/LogoutIcon'
import SettingsIcon from '../Icons/SettingsIcon'
import GroupIcon from '../Icons/GroupIcon'
import BookmarkedIcon from '../Icons/BookmarkedIcon'
import { config } from '../../config'
import Notifications, {
  NotificationsProps
} from '../Notifications/Notifications'
import './UserInformationContainer.css'

export type UserInformationComponentI18N = {
  signIn: React.ReactNode
  guest: React.ReactNode
  profile: React.ReactNode
  wallet: React.ReactNode
  myAssets: React.ReactNode
  myLists: React.ReactNode
  settings: React.ReactNode
  signOut: React.ReactNode
}

export type UserInformationComponentProps = {
  isSignedIn: boolean
  isSigningIn: boolean
  address?: string
  sliceAddressBy?: number
  manaBalances?: Partial<Record<Network, number>>
  avatar?: Avatar
  hasActivity: boolean
  menuItems?: React.ReactNode
  i18n: UserInformationComponentI18N
  notifications?: NotificationsProps
  onSignOut: (trackingId: string) => void
  onSignIn: () => void
  onClickBalance?: (network: Network) => void
  onClickSettings?: () => void
  onClickActivity?: () => void
  onClickMyLists?: () => void
  onClickMyAssets?: () => void
  onClickProfile?: () => void
  onMenuItemClick?: (id: MenuItemType, trackingId: string) => void
  onOpen?: (trackId: string) => void
  onClickAccount?: () => void
}

export enum MenuItemType {
  ACTIVITY = 'Activity',
  MY_ASSETS = 'My Assets',
  SETTINGS = 'Settings',
  MY_LISTS = 'My Lists',
  ACCOUNT = 'Account',
  PROFILE = 'Profile',
}

export type UserInformationComponentState = {
  isOpen: boolean
  isClickable: boolean
}

export class UserInformationContainer extends React.Component<
  UserInformationComponentProps,
  UserInformationComponentState
> {
  static defaultProps: Partial<UserInformationComponentProps> = {
    manaBalances: {},
    i18n: {
      signIn: 'Sign In',
      guest: 'Guest',
      profile: 'View My Profile',
      wallet: 'Wallet',
      myAssets: 'My Assets',
      myLists: 'My Lists',
      settings: 'Account Settings',
      signOut: 'Log Out',
    },
  }

  state: UserInformationComponentState = {
    isOpen: false,
    isClickable: false,
  }

  trackingId: string | null = null
  mounted = false

  handleClose = (): void => {
    this.toggle(false)
  }

  handleToggle = (): void => {
    if (!this.state.isOpen) {
      this.trackingId = uuidv4()
      if (this.props.onOpen) {
        this.props.onOpen(this.trackingId)
      }
    }
    this.toggle(!this.state.isOpen)
  }

  toggle(value: boolean): void {
    this.setState({ isOpen: value })
    setTimeout(() => {
      if (this.mounted) {
        this.setState({ isClickable: value })
      }
    }, 250)
  }

  componentDidMount(): void {
    this.mounted = true
  }

  componentWillUnmount(): void {
    this.mounted = false
  }

  renderManaBalances = (): React.ReactNode => {
    const { manaBalances, onClickBalance } = this.props

    return (
      <div className="dcl new-account-wrapper">
        {Object.keys(manaBalances).map((network) => (
          <Mana
            key={network}
            network={network as Network}
            size="small"
            className={onClickBalance ? 'clickable' : undefined}
            onClick={() => {
              if (onClickBalance) {
                onClickBalance(network as Network)
              }
              // Waits for any possible tracking to finish
              setTimeout(
                () => {
                  window.open(config.get('ACCOUNT_URL'), '_blank', 'noopener')
                },
                onClickBalance ? 300 : 0
              )
            }}
            title={`${manaBalances[network].toLocaleString()} MANA`}
          >
            {Number(manaBalances[network].toFixed(2)).toLocaleString()}
          </Mana>
        ))}
      </div>
    )
  }

  handleClickActivity = (): void => {
    const { onClickActivity, onMenuItemClick } = this.props
    if (onMenuItemClick) {
      onMenuItemClick(MenuItemType.ACTIVITY, this.trackingId)
    }
    setTimeout(
      () => {
        onClickActivity
          ? onClickActivity()
          : window.open(
              `${config.get('MARKETPLACE_URL')}/activity`,
              '_blank',
              'noopener'
            )
      },
      onClickActivity ? 300 : 0
    )
  }

  handleClickMyAssets = (): void => {
    const { onClickMyAssets, onMenuItemClick } = this.props
    if (onMenuItemClick) {
      onMenuItemClick(MenuItemType.MY_ASSETS, this.trackingId)
    }

    setTimeout(
      () => {
        onClickMyAssets
          ? onClickMyAssets()
          : window.open(
              `${config.get('MARKETPLACE_URL')}/account?section=collections`,
              '_blank',
              'noopener'
            )
      },
      onMenuItemClick ? 300 : 0
    )
  }

  handleClickSettings = (): void => {
    const { onClickSettings, onMenuItemClick } = this.props
    if (onMenuItemClick) {
      onMenuItemClick(MenuItemType.SETTINGS, this.trackingId)
    }

    setTimeout(
      () => {
        onClickSettings
          ? onClickSettings()
          : window.open(
              `${config.get('MARKETPLACE_URL')}/settings`,
              '_blank',
              'noopener'
            )
      },
      onMenuItemClick ? 300 : 0
    )
  }

  handleClickMyLists = (): void => {
    const { onClickMyLists, onMenuItemClick } = this.props
    if (onMenuItemClick) {
      onMenuItemClick(MenuItemType.MY_LISTS, this.trackingId)
    }

    setTimeout(
      () => {
        onClickMyLists
          ? onClickMyLists()
          : window.open(
              `${config.get('MARKETPLACE_URL')}/lists`,
              '_blank',
              'noopener'
            )
      },
      onMenuItemClick ? 300 : 0
    )
  }

  handleClickAccount = (): void => {
    const { onClickAccount, onMenuItemClick } = this.props
    if (onMenuItemClick) {
      onMenuItemClick(MenuItemType.ACCOUNT, this.trackingId)
    }

    setTimeout(
      () => {
        onClickAccount
          ? onClickAccount()
          : window.open(config.get('ACCOUNT_URL'), '_blank', 'noopener')
      },
      onMenuItemClick ? 300 : 0
    )
  }

  handleClickProfile = (): void => {
    const { onClickProfile, onMenuItemClick } = this.props
    if (onMenuItemClick) {
      onMenuItemClick(MenuItemType.PROFILE, this.trackingId)
    }

    setTimeout(
      () => {
        onClickProfile
          ? onClickProfile()
          : window.open(config.get('PROFILE_URL'), '_blank', 'noopener')
      },
      onMenuItemClick ? 300 : 0
    )
  }

  handleSignOut = (): void => {
    const { onSignOut } = this.props
    onSignOut(this.trackingId)
  }

  getAvatarName = () => {
    const { avatar, address, sliceAddressBy } = this.props
    const sliceLimit = Math.max(Math.min(sliceAddressBy, 42), 6)
    if (!avatar || !avatar.name) {
      return address.slice(0, sliceLimit)
    }

    if (avatar.hasClaimedName) {
      return avatar.name
    }

    const userId = address || avatar.userId
    const lastPart = userId ? `#${userId.slice(-4)}` : ''
    return avatar.name.endsWith(lastPart) ? avatar.name : avatar.name + lastPart
  }

  render(): JSX.Element {
    const {
      avatar,
      isSignedIn,
      isSigningIn,
      onSignIn,
      onClickProfile,
      i18n,
      hasActivity,
      notifications
    } = this.props

    const { isOpen, isClickable } = this.state

    const name = avatar ? this.getAvatarName() : null

    return (
      <Column align="right">
        {!isSignedIn ? (
          <Button
            primary
            disabled={isSigningIn}
            onClick={onSignIn}
            className="navbar-sign-in"
          >
            {i18n.signIn}
          </Button>
        ) : (
          <div
            className="dcl new-user-menu"
            onBlur={this.handleClose}
            tabIndex={0}
          >
            {notifications && <Notifications {...notifications} />}
            <Button
              basic
              onClick={this.handleClickActivity}
              className="activity-icon"
            >
              <ActivityIcon hasActivity={hasActivity} />
            </Button>
            {this.renderManaBalances()}
            <div className="toggle" onClick={this.handleToggle}>
              <AvatarFace size="medium" avatar={avatar} />
            </div>
            <div
              className={classNames(
                'menu',
                isOpen && 'open',
                isClickable && 'clickable'
              )}
            >
              <div
                className={`info ${onClickProfile ? 'clickable' : ''}`}
                onClick={this.handleClickProfile}
              >
                <div className="image">
                  <AvatarFace size="small" avatar={avatar} />
                </div>
                <div>
                  <div className="name">{name ?? i18n.guest}</div>
                </div>
              </div>
              <Button
                className="view-profile"
                inverted
                onClick={this.handleClickProfile}
              >
                {i18n.profile}
              </Button>
              <ul className="actions">
                <div onClick={this.handleClickAccount}>
                  <li className="menu-option">
                    <Wallet />
                    &nbsp;
                    {i18n.wallet}
                  </li>
                </div>
                <div onClick={this.handleClickMyAssets}>
                  <li className="menu-option">
                    <GroupIcon /> &nbsp;
                    {i18n.myAssets}
                  </li>
                </div>
                <div onClick={this.handleClickMyLists}>
                  <li className="menu-option">
                    <BookmarkedIcon /> &nbsp;
                    {i18n.myLists}
                  </li>
                </div>
                <div onClick={this.handleClickSettings}>
                  <li className="menu-option">
                    <SettingsIcon /> &nbsp;
                    {i18n.settings}
                  </li>
                </div>
                <li onClick={this.handleSignOut} className="menu-option">
                  <LogoutIcon /> &nbsp;
                  {i18n.signOut}
                </li>
              </ul>
            </div>
          </div>
        )}
      </Column>
    )
  }
}
