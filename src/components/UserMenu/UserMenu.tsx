import * as React from 'react'
import { Network } from '@dcl/schemas/dist/dapps/network'
import { Avatar } from '@dcl/schemas/dist/platform/profile/avatar'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import { AvatarFace } from '../AvatarFace/AvatarFace'
import { Mobile } from '../Media'
import { Mana } from '../Mana/Mana'
import { Button } from '../Button/Button'
import { Column } from '../Column/Column'
import { config } from '../../config'
import { Row } from '../Row/Row'
import { WalletIcon } from '../WalletIcon/WalletIcon'
import './UserMenu.css'

export type UserMenuI18N = {
  signIn: React.ReactNode
  signOut: React.ReactNode
  guest: React.ReactNode
  settings: React.ReactNode
  wallet: React.ReactNode
  profile: React.ReactNode
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
      wallet: 'Wallet',
      profile: 'Profile',
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

  renderManaBalances = (): React.ReactNode => {
    const { manaBalances, onClickBalance } = this.props

    return (
      <span className="dcl account-wrapper">
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
      </span>
    )
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
      i18n,
      menuItems
    } = this.props

    const { isOpen, isClickable } = this.state

    const name = avatar ? avatar.name : null

    const isSomeBalanceTooHigh = Object.values(manaBalances).some(
      (balance) => Number(balance.toFixed(2)).toLocaleString().length > 5
    )

    return (
      <Column align="right">
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
                {this.renderManaBalances()}
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
                    <a href={config.get('PROFILE_URL')}>
                      <li>
                        <Icon name="user" />
                        {i18n.profile}
                      </li>
                    </a>
                    <a href={config.get('ACCOUNT_URL')}>
                      <li>
                        <WalletIcon />
                        {i18n.wallet}
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
        {isSignedIn && isSomeBalanceTooHigh && (
          <Mobile>
            <Row className="dcl mobile-user-balances-wrapper" align="right">
              {this.renderManaBalances()}
            </Row>
          </Mobile>
        )}
      </Column>
    )
  }
}
