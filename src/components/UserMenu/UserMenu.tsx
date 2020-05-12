import * as React from 'react'
import { Avatar } from '../../types/avatar'

import './UserMenu.css'
import { AvatarFace, Mana, Button } from '../..'

export type UserMenuI18N = {
  signIn: string
  signOut: string
  guest: string
}

export type UserMenuProps = {
  isSignedIn: boolean
  isSigningIn: boolean
  address?: string
  mana?: number
  avatar?: Avatar
  menuItems?: React.ReactNode
  i18n: UserMenuI18N
  onSignOut: () => void
  onSignIn: () => void
  onClickProfile: () => void
}

export type UserMenuState = {
  isOpen: boolean
}

export class UserMenu extends React.Component<UserMenuProps, UserMenuState> {
  static defaultProps: Partial<UserMenuProps> = {
    i18n: {
      signIn: 'Sign In',
      signOut: 'Sign Out',
      guest: 'Guest'
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
      mana,
      isSignedIn,
      isSigningIn,
      onSignOut,
      onSignIn,
      onClickProfile,
      i18n,
      menuItems
    } = this.props

    const { isOpen } = this.state

    const name = avatar ? avatar.name : null

    return (
      <div className="dcl user-menu" onBlur={this.handleClose} tabIndex={0}>
        {isSignedIn && (
          <>
            <span className="dcl account-wrapper">
              {mana !== undefined ? (
                <Mana size="small" title={`${mana.toLocaleString()} MANA`}>
                  {parseInt(mana.toFixed(0), 10).toLocaleString()}
                </Mana>
              ) : null}
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
                <li onClick={onSignOut}>
                  <i className="sign-out-icon" />
                  {i18n.signOut}
                </li>
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
    )
  }
}
