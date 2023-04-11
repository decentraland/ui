import * as React from 'react'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import { Mana } from '../Mana/Mana'
import { Blockie } from '../Blockie/Blockie'
import { Container } from '../Container/Container'
import { Header } from '../Header/Header'
import { Logo } from '../Logo/Logo'
import { Mobile, NotMobile } from '../Media'
import './Navbar.css'

export type NavbarI18N = {
  menu: {
    marketplace: React.ReactNode
    docs: React.ReactNode
    events: React.ReactNode
    places: React.ReactNode
    agora: React.ReactNode
    dao: React.ReactNode
    blog: React.ReactNode
    builder: {
      main: React.ReactNode
      overview: React.ReactNode
      collections: React.ReactNode
      scenes: React.ReactNode
      land: React.ReactNode
      names: React.ReactNode
    }
  }
  account: {
    signIn: React.ReactNode
    connecting: React.ReactNode
  }
}

export enum NavbarPages {
  MARKETPLACE = 'marketplace',
  DOCS = 'docs',
  EVENTS = 'events',
  PLACES = 'places',
  AGORA = 'agora',
  DAO = 'dao',
  BLOG = 'blog',
  BUILDER = 'builder'
}

export type NavbarProps = {
  mana?: number
  address?: string
  activePage?: NavbarPages | string
  leftMenu?: React.ReactNode
  middleMenu?: React.ReactNode
  rightMenu?: React.ReactNode
  enableSubMenuSection?: boolean
  i18n?: NavbarI18N
  isConnected?: boolean
  isConnecting?: boolean
  isSignIn?: boolean
  isFullscreen?: boolean
  isOverlay?: boolean
  className?: string
  onSignIn?: () => void
  onClickAccount?: () => void
  isFullWidth?: boolean
}

export type NavbarState = {
  toggle: boolean
  showSubMenu: Record<string, boolean>
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
        places: 'Places',
        agora: 'Agora',
        dao: 'DAO',
        blog: 'Blog',
        builder: {
          main: 'Builder',
          overview: 'Overview',
          collections: 'Collections',
          scenes: 'Scenes',
          land: 'Land',
          names: 'Names'
        }
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
    onClickAccount: null,
    isFullWidth: false,
    enableSubMenuSection: false
  }
  public state = {
    toggle: false,
    showSubMenu: {}
  }
  componentDidMount(): void {
    document.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount(): void {
    document.removeEventListener('click', this.handleDocumentClick)
  }
  handleToggle = (event: React.MouseEvent): void => {
    this.setState({ toggle: !this.state.toggle })
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
  }
  handleDocumentClick = (): void => {
    this.setState({ toggle: false })
  }

  handleClickBuilder = (section, toggle): void => {
    this.setState({
      showSubMenu: { ...this.state.showSubMenu, [section]: toggle }
    })
  }

  shouldShowSubMenu = (section): boolean => {
    return this.props.enableSubMenuSection && this.state.showSubMenu[section]
  }

  renderLeftMenu(): React.ReactNode {
    const { activePage, i18n, leftMenu } = this.props
    if (leftMenu) {
      return leftMenu
    }
    return (
      <>
        <Menu.Item
          active={activePage === NavbarPages.MARKETPLACE}
          href="https://market.decentraland.org"
        >
          {i18n.menu.marketplace}
        </Menu.Item>
        <Menu.Item
          active={activePage === NavbarPages.BUILDER}
          onMouseEnter={() =>
            this.handleClickBuilder(NavbarPages.BUILDER, true)
          }
          onMouseLeave={() =>
            this.handleClickBuilder(NavbarPages.BUILDER, false)
          }
        >
          <a className="item" href="https://builder.decentraland.org">
            {i18n.menu.builder.main}
          </a>
          {this.shouldShowSubMenu(NavbarPages.BUILDER) && (
            <Menu.Item className="submenu">
              <Menu vertical>
                <Menu.Item href="https://builder.decentraland.org/">
                  {i18n.menu.builder.overview}
                </Menu.Item>
                <Menu.Item href="https://builder.decentraland.org/collections">
                  {i18n.menu.builder.collections}
                </Menu.Item>
                <Menu.Item href="https://builder.decentraland.org/scenes">
                  {i18n.menu.builder.scenes}
                </Menu.Item>
                <Menu.Item href="https://builder.decentraland.org/land">
                  {i18n.menu.builder.land}
                </Menu.Item>
                <Menu.Item href="https://builder.decentraland.org/names">
                  {i18n.menu.builder.names}
                </Menu.Item>
              </Menu>
            </Menu.Item>
          )}
        </Menu.Item>
        <Menu.Item
          active={activePage === NavbarPages.DOCS}
          href="https://docs.decentraland.org"
        >
          {i18n.menu.docs}
        </Menu.Item>
        <Menu.Item
          active={activePage === NavbarPages.PLACES}
          href="https://places.decentraland.org"
        >
          {i18n.menu.places}
        </Menu.Item>
        <Menu.Item
          active={activePage === NavbarPages.EVENTS}
          href="https://events.decentraland.org"
        >
          {i18n.menu.events}
        </Menu.Item>
        <Menu.Item
          active={activePage === NavbarPages.DAO}
          href="https://dao.decentraland.org"
        >
          {i18n.menu.dao}
        </Menu.Item>
        <Menu.Item
          active={activePage === NavbarPages.BLOG}
          href="https://decentraland.org/blog"
        >
          {i18n.menu.blog}
        </Menu.Item>
      </>
    )
  }

  renderRightMenu(): React.ReactNode {
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
            <NotMobile>
              <Menu secondary className="dcl navbar-account-menu">
                {middleMenu}
              </Menu>
            </NotMobile>
          ) : null}
          <span
            className={`dcl account-wrapper ${
              onClickAccount ? 'clickable' : ''
            }`}
            onClick={onClickAccount}
          >
            {mana != null ? (
              <Mana size="small" title={`${mana.toLocaleString()} MANA`}>
                {Number(mana.toFixed(2)).toLocaleString()}
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

  render(): JSX.Element {
    const {
      activePage,
      className,
      isSignIn,
      isFullscreen,
      isOverlay,
      isFullWidth
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
        <Container className={isFullWidth ? 'full-width' : ''}>
          <div className="dcl navbar-menu">
            <NotMobile>
              <Menu secondary stackable>
                <a className="dcl navbar-logo" href="https://decentraland.org">
                  <Logo />
                </a>
                {this.renderLeftMenu()}
                {/* {this.state.showSubMenu && (
                  <Menu.Item>
                    <Menu vertical>
                      <Menu.Item>Overview</Menu.Item>
                      <Menu.Item>Collections</Menu.Item>
                      <Menu.Item>Scenes</Menu.Item>
                      <Menu.Item>LAND</Menu.Item>
                      <Menu.Item>NAMEs</Menu.Item>
                    </Menu>
                  </Menu.Item>
                )} */}
              </Menu>
            </NotMobile>
            <Mobile>
              <div className="dcl navbar-mobile-menu">
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
              </div>
            </Mobile>
          </div>

          <div className="dcl navbar-account">{this.renderRightMenu()}</div>
        </Container>
        <div className="mobile-menu">{this.renderLeftMenu()}</div>
      </div>
    )
  }
}
