import { Network } from '@dcl/schemas'
import * as React from 'react'
import { Avatar } from '../../types/avatar'
import { AvatarFace, Mana, Button, Menu, Icon, Row } from '../..'
import './UserMenu.css'

export type UserMenuI18N = {
  signIn: React.ReactNode
  signOut: React.ReactNode
  guest: React.ReactNode
  settings: React.ReactNode
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
}

export type UserMenuState = {
  isOpen: boolean
}

export class UserMenu extends React.Component<UserMenuProps, UserMenuState> {
  static defaultProps: Partial<UserMenuProps> = {
    manaBalances: {},
    i18n: {
      signIn: 'Sign In',
      signOut: 'Sign Out',
      guest: 'Guest',
      settings: 'Settings'
    }
  }

  state: UserMenuState = {
    isOpen: false
  }

  ref: HTMLElement | null = null

  handleClose = () => {
    this.setState({ isOpen: false })
  }

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
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
      i18n,
      menuItems
    } = this.props

    const { isOpen } = this.state

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
                {Object.keys(manaBalances).map(network => (
                  <Mana
                    key={network}
                    network={network as Network}
                    size="small"
                    title={`${manaBalances[network].toLocaleString()} MANA`}
                  >
                    {parseInt(
                      manaBalances[network].toFixed(0),
                      10
                    ).toLocaleString()}
                  </Mana>
                ))}
              </span>
              <div className="toggle" onClick={this.handleToggle}>
                <AvatarFace size="medium" avatar={avatar} />
              </div>
              <div className={`menu ${isOpen ? 'open' : ''}`}>
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
