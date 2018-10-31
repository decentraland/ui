import * as React from 'react'
import { Blockie, Mana, Logo, Header, Container, Menu, Responsive } from '../..'
import './Navbar.css'

export type NavbarI18N = {
  menu: {
    marketplace: string
    docs: string
    agora: string
    blog: string
  }
  account: {
    signIn: string
    connecting: string
  }
}

export type NavbarProps = {
  mana?: number
  address?: string
  activePage?: 'marketplace' | 'docs' | 'agora' | 'blog'
  menuItems?: React.ReactNode
  i18n?: NavbarI18N
  isConnected?: boolean
  isConnecting?: boolean
  isSignIn?: boolean
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
    menuItems: null,
    i18n: {
      menu: {
        marketplace: 'Marketplace',
        docs: 'Docs',
        agora: 'Agora',
        blog: 'Blog'
      },
      account: {
        signIn: 'Sign In',
        connecting: 'Connecting...'
      }
    },
    isConnected: false,
    isConnecting: false,
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

  renderMenu() {
    const { activePage, i18n } = this.props
    return (
      <>
        <Menu.Item
          active={activePage === 'marketplace'}
          href="https://market.decentraland.org"
        >
          {i18n.menu.marketplace}
        </Menu.Item>
        <Menu.Item
          active={activePage === 'docs'}
          href="https://docs.decentraland.org"
        >
          {i18n.menu.docs}
        </Menu.Item>
        <Menu.Item
          active={activePage === 'agora'}
          href="https://agora.decentraland.org"
        >
          {i18n.menu.agora}
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

  render() {
    const {
      mana,
      address,
      activePage,
      i18n,
      menuItems,
      isConnected,
      isConnecting,
      isSignIn,
      onSignIn,
      onClickAccount,
      children
    } = this.props

    let classes = `dcl navbar`

    if (children) {
      classes += ' has-children'
    }
    if (this.state.toggle) {
      classes += ' open'
    }
    if (isSignIn) {
      classes += ' sign-in'
    }

    return (
      <div className={classes} role="navigation">
        {children ? <div className="children-wrapper">{children}</div> : null}
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
              {this.renderMenu()}
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

          <div className="dcl navbar-account">
            {isConnected ? (
              <>
                {menuItems ? (
                  <Responsive
                    as={Menu}
                    secondary
                    className="dcl navbar-account-menu"
                    minWidth={Responsive.onlyTablet.minWidth}
                  >
                    {menuItems}
                  </Responsive>
                ) : null}
                <span
                  className={`dcl account-wrapper ${
                    onClickAccount ? 'clickable' : ''
                  }`}
                  onClick={onClickAccount}
                >
                  {mana != null ? (
                    <Mana
                      text
                      size="small"
                      title={`${mana.toLocaleString()} MANA`}
                    >
                      {mana.toLocaleString()}
                    </Mana>
                  ) : null}
                  {address != null ? <Blockie seed={address} /> : null}
                </span>
              </>
            ) : isConnecting ? (
              <Menu secondary>
                <Menu.Item disabled>{i18n.account.connecting}</Menu.Item>
              </Menu>
            ) : onSignIn || isSignIn ? (
              <Menu secondary>
                <Menu.Item className="sign-in-button" onClick={onSignIn}>
                  {i18n.account.signIn}
                </Menu.Item>
              </Menu>
            ) : null}
          </div>
        </Container>
        <div className="mobile-menu">{this.renderMenu()}</div>
      </div>
    )
  }
}
