import * as React from 'react'
import { Menu, Responsive } from 'semantic-ui-react'
import { Mana } from '../Mana/Mana'
import { Blockie } from '../Blockie/Blockie'
import { Container } from '../Container/Container'
import { Header } from '../Header/Header'
import { Logo } from '../Logo/Logo'
import './Navbar.css'

export type NavbarI18N = {
  menu: {
    marketplace: React.ReactNode
    docs: React.ReactNode
    events: React.ReactNode
    agora: React.ReactNode
    dao: React.ReactNode
    blog: React.ReactNode
    builder: React.ReactNode
    avatars: React.ReactNode
  }
  account: {
    signIn: React.ReactNode
    connecting: React.ReactNode
  }
}

export type NavbarProps = {
  mana?: number
  address?: string
  activePage?:
  | 'marketplace'
  | 'docs'
  | 'events'
  | 'agora'
  | 'dao'
  | 'blog'
  | 'builder'
  | 'avatars'
  | string
  leftMenu?: React.ReactNode
  middleMenu?: React.ReactNode
  rightMenu?: React.ReactNode
  i18n?: NavbarI18N
  isConnected?: boolean
  isConnecting?: boolean
  isSignIn?: boolean
  isFullscreen?: boolean
  isOverlay?: boolean
  className?: string
  onSignIn?: () => void
  onClickAccount?: () => void
}

export type NavbarState = {
  toggle: boolean
}

export class Navbar extends React.PureComponent<NavbarProps, NavbarState> {
  static defaultProps: Partial<NavbarProps> = {
    mana: null,
    address: null,
    activePage: null,
    leftMenu: null,
    middleMenu: null,
    i18n: {
      menu: {
        marketplace: 'Marketplace',
        docs: 'Docs',
        events: 'Events',
        agora: 'Agora',
        dao: 'DAO',
        blog: 'Blog',
        builder: 'Builder',
        avatars: 'Avatars'
      },
      account: {
        signIn: 'Sign In',
        connecting: 'Connecting...'
      }
    },
    isConnected: false,
    isConnecting: false,
    isFullscreen: false,
    isOverlay: false,
    isSignIn: false,
    onSignIn: null,
    onClickAccount: null
  }
  public state = {
    toggle: false
  }
  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
  }
  handleToggle = event => {
    this.setState({ toggle: !this.state.toggle })
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
  }
  handleDocumentClick = () => {
    this.setState({ toggle: false })
  }

  renderLeftMenu() {
    const { activePage, i18n, leftMenu } = this.props
    if (leftMenu) {
      return leftMenu
    }
    return (
      <>
        <Menu.Item
          active={activePage === 'avatars'}
          href="https://avatars.decentraland.org"
        >
          {i18n.menu.avatars}
        </Menu.Item>
        <Menu.Item
          active={activePage === 'marketplace'}
          href="https://market.decentraland.org"
        >
          {i18n.menu.marketplace}
        </Menu.Item>
        <Menu.Item
          active={activePage === 'builder'}
          href="https://builder.decentraland.org"
        >
          {i18n.menu.builder}
        </Menu.Item>
        <Menu.Item
          active={activePage === 'docs'}
          href="https://docs.decentraland.org"
        >
          {i18n.menu.docs}
        </Menu.Item>
        <Menu.Item
          active={activePage === 'events'}
          href="https://events.decentraland.org"
        >
          {i18n.menu.events}
        </Menu.Item>
        <Menu.Item
          active={activePage === 'dao'}
          href="https://dao.decentraland.org"
        >
          {i18n.menu.dao}
        </Menu.Item>
        <Menu.Item
          active={activePage === 'blog'}
          href="https://decentraland.org/blog"
        >
          {i18n.menu.blog}
        </Menu.Item>
      </>
    )
  }

  renderRightMenu() {
    const {
      rightMenu,
      middleMenu,
      isConnected,
      onClickAccount,
      mana,
      address,
      isConnecting,
      isSignIn,
      i18n,
      onSignIn
    } = this.props
    if (rightMenu) {
      return rightMenu
    } else if (isConnected) {
      return (
        <>
          {middleMenu ? (
            <Responsive
              as={Menu}
              secondary
              className="dcl navbar-account-menu"
              minWidth={Responsive.onlyTablet.minWidth}
            >
              {middleMenu}
            </Responsive>
          ) : null}
          <span
            className={`dcl account-wrapper ${
              onClickAccount ? 'clickable' : ''
              }`}
            onClick={onClickAccount}
          >
            {mana != null ? (
              <Mana size="small" title={`${mana.toLocaleString()} MANA`}>
                {parseInt(mana.toFixed(0), 10).toLocaleString()}
              </Mana>
            ) : null}
            {address != null ? <Blockie seed={address} /> : null}
          </span>
        </>
      )
    } else if (isConnecting && !isSignIn) {
      return (
        <Menu secondary>
          <Menu.Item disabled>{i18n.account.connecting}</Menu.Item>
        </Menu>
      )
    } else if (onSignIn || isSignIn) {
      return (
        <Menu secondary>
          <Menu.Item className="sign-in-button" onClick={onSignIn}>
            {i18n.account.signIn}
          </Menu.Item>
        </Menu>
      )
    } else {
      return null
    }
  }

  render() {
    const {
      activePage,
      className,
      isSignIn,
      isFullscreen,
      isOverlay
    } = this.props

    let classes = `dcl navbar`

    if (this.state.toggle) {
      classes += ' open'
    }

    if (isSignIn) {
      classes += ' sign-in'
    }

    if (isFullscreen) {
      classes += ' fullscreen'
    }

    if (isOverlay) {
      classes += ' overlay'
    }

    if (className) {
      classes += ` ${className}`
    }

    return (
      <div className={classes} role="navigation">
        <Container>
          <div className="dcl navbar-menu">
            <Responsive
              as={Menu}
              secondary
              stackable
              minWidth={Responsive.onlyTablet.minWidth}
            >
              <a className="dcl navbar-logo" href="https://decentraland.org">
                <Logo />
              </a>
              {this.renderLeftMenu()}
            </Responsive>
            <Responsive
              {...Responsive.onlyMobile}
              className="dcl navbar-mobile-menu"
            >
              <a className="dcl navbar-logo" href="https://decentraland.org">
                <Logo />
              </a>
              <Header
                size="small"
                className={`dcl active-page ${
                  this.state.toggle ? 'caret-up' : 'caret-down'
                  }`}
                onClick={this.handleToggle}
              >
                {activePage}
              </Header>
            </Responsive>
          </div>

          <div className="dcl navbar-account">{this.renderRightMenu()}</div>
        </Container>
        <div className="mobile-menu">{this.renderLeftMenu()}</div>
      </div>
    )
  }
}
