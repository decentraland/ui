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
    marketplace: {
      main: React.ReactNode
      overview: React.ReactNode
      collectibles: React.ReactNode
      land: React.ReactNode
      myAssets: React.ReactNode
    }
    docs: {
      main: React.ReactNode
      players: React.ReactNode
      creators: React.ReactNode
      contributors: React.ReactNode
      studios: React.ReactNode
    }
    events: React.ReactNode
    places: {
      main: React.ReactNode
      overview: React.ReactNode
      allPlaces: React.ReactNode
      faq: React.ReactNode
    }
    agora: React.ReactNode
    dao: { main: React.ReactNode; list: React.ReactNode }
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
        marketplace: {
          main: 'Marketplace',
          overview: 'Overview',
          collectibles: 'Collectibles',
          land: 'LAND',
          myAssets: 'My Assets'
        },
        docs: {
          main: 'Docs',
          players: 'Players',
          creators: 'Content Creators',
          contributors: 'Contributors',
          studios: 'Studios'
        },
        events: 'Events',
        places: {
          main: 'Places',
          overview: 'Overview',
          allPlaces: 'All Places',
          faq: 'FAQ'
        },
        agora: 'Agora',
        dao: { main: 'DAO', list: 'List' },
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

  handleToggleShowSubMenu = (section: NavbarPages, toggle: boolean): void => {
    if (this.props.enableSubMenuSection) {
      this.setState({
        showSubMenu: { [section]: toggle }
      })
    }
  }

  shouldShowSubMenu = (section: NavbarPages): boolean => {
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
          onMouseEnter={() =>
            this.handleToggleShowSubMenu(NavbarPages.MARKETPLACE, true)
          }
          onMouseLeave={() =>
            this.handleToggleShowSubMenu(NavbarPages.MARKETPLACE, false)
          }
        >
          <a className="item" href="https://market.decentraland.org">
            {i18n.menu.marketplace.main}
          </a>
          {this.shouldShowSubMenu(NavbarPages.MARKETPLACE) && (
            <Menu.Item className="submenu">
              <Menu vertical>
                <Menu.Item href="https://market.decentraland.org/">
                  {i18n.menu.marketplace.overview}
                </Menu.Item>
                <Menu.Item href="https://market.decentraland.org/browse">
                  {i18n.menu.marketplace.collectibles}
                </Menu.Item>
                <Menu.Item href="https://market.decentraland.org/lands">
                  {i18n.menu.marketplace.land}
                </Menu.Item>
                <Menu.Item href="https://market.decentraland.org/account">
                  {i18n.menu.marketplace.myAssets}
                </Menu.Item>
              </Menu>
            </Menu.Item>
          )}
        </Menu.Item>
        <Menu.Item
          active={activePage === NavbarPages.BUILDER}
          onMouseEnter={() =>
            this.handleToggleShowSubMenu(NavbarPages.BUILDER, true)
          }
          onMouseLeave={() =>
            this.handleToggleShowSubMenu(NavbarPages.BUILDER, false)
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
          onMouseEnter={() =>
            this.handleToggleShowSubMenu(NavbarPages.DOCS, true)
          }
          onMouseLeave={() =>
            this.handleToggleShowSubMenu(NavbarPages.DOCS, false)
          }
        >
          <a className="item" href="https://docs.decentraland.org">
            {i18n.menu.docs.main}
          </a>
          {this.shouldShowSubMenu(NavbarPages.DOCS) && (
            <Menu.Item className="submenu">
              <Menu vertical>
                <Menu.Item href="https://docs.decentraland.org/player">
                  {i18n.menu.docs.players}
                </Menu.Item>
                <Menu.Item href="https://docs.decentraland.org/creator">
                  {i18n.menu.docs.creators}
                </Menu.Item>
                <Menu.Item href="https://docs.decentraland.org/contributor">
                  {i18n.menu.docs.contributors}
                </Menu.Item>
                <Menu.Item href="https://studios.decentraland.org">
                  {i18n.menu.docs.studios}
                </Menu.Item>
              </Menu>
            </Menu.Item>
          )}
        </Menu.Item>
        <Menu.Item
          active={activePage === NavbarPages.PLACES}
          onMouseEnter={() =>
            this.handleToggleShowSubMenu(NavbarPages.PLACES, true)
          }
          onMouseLeave={() =>
            this.handleToggleShowSubMenu(NavbarPages.PLACES, false)
          }
        >
          <a className="item" href="https://places.decentraland.org">
            {i18n.menu.places.main}
          </a>
          {this.shouldShowSubMenu(NavbarPages.PLACES) && (
            <Menu.Item className="submenu">
              <Menu vertical>
                <Menu.Item href="https://places.decentraland.org">
                  {i18n.menu.places.overview}
                </Menu.Item>
                <Menu.Item href="https://places.decentraland.org/places">
                  {i18n.menu.places.allPlaces}
                </Menu.Item>
                <Menu.Item href="https://docs.decentraland.org/creator/places/faq">
                  {i18n.menu.places.faq}
                </Menu.Item>
              </Menu>
            </Menu.Item>
          )}
        </Menu.Item>
        <Menu.Item
          active={activePage === NavbarPages.EVENTS}
          href="https://events.decentraland.org"
        >
          {i18n.menu.events}
        </Menu.Item>
        <Menu.Item
          active={activePage === NavbarPages.DAO}
          onMouseEnter={() =>
            this.handleToggleShowSubMenu(NavbarPages.DAO, true)
          }
          onMouseLeave={() =>
            this.handleToggleShowSubMenu(NavbarPages.DAO, false)
          }
        >
          <a className="item" href="https://dao.decentraland.org">
            {i18n.menu.dao.main}
          </a>
          {this.shouldShowSubMenu(NavbarPages.DAO) && (
            <Menu.Item className="submenu">
              <Menu vertical>
                <Menu.Item href="https://governance.decentraland.org/proposals">
                  {i18n.menu.dao.list}
                </Menu.Item>
              </Menu>
            </Menu.Item>
          )}
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
