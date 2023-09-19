import * as React from 'react'
import { Network } from '@dcl/schemas/dist/dapps/network'
import { Avatar } from '@dcl/schemas/dist/platform/profile/avatar'
import { AvatarFace } from '../AvatarFace/AvatarFace'
import { Mana } from '../Mana/Mana'
import { Button } from '../Button/Button'
import { Column } from '../Column/Column'
import './UserInformationContainer.css'
import ActivityIcon from '../Icons/ActivityIcon'
import classNames from 'classnames'
import Wallet from '../Icons/Wallet'
import LogoutIcon from '../Icons/LogoutIcon'
import SettingsIcon from '../Icons/SettingsIcon'
import GroupIcon from '../Icons/GroupIcon'
import BookmarkedIcon from '../Icons/BookmarkedIcon'
import { config } from '../../config'

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
  manaBalances?: Partial<Record<Network, number>>
  avatar?: Avatar
  hasActivity: boolean
  menuItems?: React.ReactNode
  i18n: UserInformationComponentI18N
  onSignOut: () => void
  onSignIn: () => void
  onClickBalance: (network: Network) => void
  onClickSettings?: () => void
  onClickActivity?: () => void
  onClickMyLists?: () => void
  onClickMyAssets?: () => void
  onClickProfile?: () => void
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
      signOut: 'Log Out'
    }
  }

  state: UserInformationComponentState = {
    isOpen: false,
    isClickable: false
  }

  mounted = false

  handleClose = (): void => {
    this.toggle(false)
  }

  handleToggle = (): void => {
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
            title={`${manaBalances[network].toLocaleString()} MANA`}
            href={config.get('ACCOUNT_URL')}
          >
            {Number(manaBalances[network].toFixed(2)).toLocaleString()}
          </Mana>
        ))}
      </div>
    )
  }

  render(): JSX.Element {
    const {
      avatar,
      isSignedIn,
      isSigningIn,
      onSignOut,
      onSignIn,
      onClickProfile,
      onClickSettings,
      onClickActivity,
      onClickMyAssets,
      onClickMyLists,
      i18n,
      hasActivity
    } = this.props

    const { isOpen, isClickable } = this.state

    const name = avatar ? avatar.name : null

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
            <Button
              basic
              onClick={
                onClickActivity
                  ? onClickActivity
                  : () =>
                      window.open(`${config.get('MARKETPLACE_URL')}/activity`)
              }
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
                onClick={onClickProfile}
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
                onClick={
                  onClickProfile
                    ? onClickProfile
                    : () => window.open(config.get('PROFILE_URL'))
                }
              >
                {i18n.profile}
              </Button>
              <ul className="actions">
                <a
                  href={config.get('ACCOUNT_URL')}
                  target="_blank"
                  rel="noreferrer"
                >
                  <li className="menu-option">
                    <Wallet />
                    &nbsp;
                    {i18n.wallet}
                  </li>
                </a>
                <div
                  onClick={
                    onClickMyAssets
                      ? onClickMyAssets
                      : () =>
                          window.open(
                            `${config.get('MARKETPLACE_URL')}/account?section=collections`
                          )
                  }
                >
                  <li className="menu-option">
                    <GroupIcon /> &nbsp;
                    {i18n.myAssets}
                  </li>
                </div>
                <div
                  onClick={
                    onClickMyLists
                      ? onClickMyLists
                      : () =>
                          window.open(`${config.get('MARKETPLCE_URL')}/lists`)
                  }
                >
                  <li className="menu-option">
                    <BookmarkedIcon /> &nbsp;
                    {i18n.myLists}
                  </li>
                </div>
                <div
                  onClick={
                    onClickSettings
                      ? onClickSettings
                      : () =>
                          window.open(
                            `${config.get('MARKETPLACE_URL')}/settings`
                          )
                  }
                >
                  <li className="menu-option">
                    <SettingsIcon /> &nbsp;
                    {i18n.settings}
                  </li>
                </div>
                <li onClick={onSignOut} className="menu-option">
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
