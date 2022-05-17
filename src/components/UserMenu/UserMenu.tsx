import * as React from 'react'
import { Network } from '@dcl/schemas/dist/dapps/network'
import { Avatar } from '@dcl/schemas/dist/platform/profile/avatar'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import { AvatarFace } from '../AvatarFace/AvatarFace'
import { Mana } from '../Mana/Mana'
import { Button } from '../Button/Button'
import { Row } from '../Row/Row'
import './UserMenu.css'

export type UserMenuI18N = {
  signIn: React.ReactNode
  signOut: React.ReactNode
  guest: React.ReactNode
  settings: React.ReactNode
  account: React.ReactNode
}

export type UserMenuProps = {
  isSignedIn: boolean
  isSigningIn: boolean
  isActivity: boolean
  hasActivity: boolean
  address?: string
  manaBalances?: Partial<Record<Network, number>>
  avatar?: Avatar
  menuItems?: React.ReactNode
  i18n: UserMenuI18N
  onSignOut: () => void
  onSignIn: () => void
  onClickProfile: () => void
  onClickActivity: () => void
  onClickSettings: () => void
  onClickBalance: (network: Network) => void
}

export type UserMenuState = {
  isOpen: boolean
  isClickable: boolean
}

export class UserMenu extends React.Component<UserMenuProps, UserMenuState> {
  static defaultProps: Partial<UserMenuProps> = {
    manaBalances: {},
    i18n: {
      signIn: 'Sign In',
      signOut: 'Sign Out',
      guest: 'Guest',
      settings: 'Settings',
      account: 'Account'
    }
  }

  state: UserMenuState = {
    isOpen: false,
    isClickable: false
  }

  mounted = false

  ref: HTMLElement | null = null

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

  render(): JSX.Element {
    const {
      avatar,
      manaBalances,
      isSignedIn,
      isSigningIn,
      isActivity,
      hasActivity,
      onSignOut,
      onSignIn,
      onClickProfile,
      onClickActivity,
      onClickSettings,
      onClickBalance,
      i18n,
      menuItems
    } = this.props

    const { isOpen, isClickable } = this.state

    const name = avatar ? avatar.name : null

    return (
      <Row className="dcl user-menu-wrapper">
        <Menu.Item
          className={isActivity ? 'activity-bell active' : 'activity-bell'}
        >
          {onClickActivity ? (
            <Icon
              className={hasActivity ? 'pending' : ''}
              name="bell"
              onClick={onClickActivity}
            />
          ) : null}
        </Menu.Item>
        <div className="dcl user-menu" onBlur={this.handleClose} tabIndex={0}>
          {isSignedIn && (
            <>
              <span className="dcl account-wrapper">
                {Object.keys(manaBalances).map((network) => (
                  <Mana
                    key={network}
                    network={network as Network}
                    size="small"
                    className={onClickBalance ? 'clickable' : undefined}
                    title={`${manaBalances[network].toLocaleString()} MANA`}
                    href="https://account.decentraland.org"
                  >
                    {Number(manaBalances[network].toFixed(2)).toLocaleString()}
                  </Mana>
                ))}
              </span>
              <div className="toggle" onClick={this.handleToggle}>
                <AvatarFace size="medium" avatar={avatar} />
              </div>
              <div
                className={`menu ${isOpen ? 'open' : ''} ${
                  isClickable ? 'clickable' : ''
                }`}
              >
                <div
                  className={`info ${onClickProfile ? 'clickable' : ''}`}
                  onClick={onClickProfile}
                >
                  <div className="image">
                    <AvatarFace size="small" avatar={avatar} />
                  </div>
                  <div>
                    <div className="name">{name || i18n.guest}</div>
                  </div>
                </div>
                <ul className="actions">
                  <a href="https://account.decentraland.org">
                    <li>
                      <Icon name="user"></Icon>
                      {i18n.account}
                    </li>
                  </a>
                  {menuItems}
                  {onClickSettings ? (
                    <li onClick={onClickSettings}>
                      <Icon name="cog"></Icon>
                      {i18n.settings}
                    </li>
                  ) : null}
                  {onSignOut ? (
                    <li onClick={onSignOut}>
                      <i className="sign-out-icon" />
                      {i18n.signOut}
                    </li>
                  ) : null}
                </ul>
              </div>
            </>
          )}
          {!isSignedIn && (
            <Button primary disabled={isSigningIn} onClick={onSignIn}>
              {i18n.signIn}
            </Button>
          )}
        </div>
      </Row>
    )
  }
}
