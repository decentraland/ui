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
    enableSubMenuSection: true
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

  handleToggleShowSubMenu = (
    event: React.MouseEvent,
    section: NavbarPages
  ): void => {
    if (this.props.enableSubMenuSection) {
      const toggle = !!this.state.showSubMenu[section]
      this.setState({
        showSubMenu: { [section]: !toggle }
      })
    }
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
  }

  shouldShowSubMenu = (section: NavbarPages): boolean => {
    return this.props.enableSubMenuSection && this.state.showSubMenu[section]
  }

  renderMarketplaceSubMenu(): React.ReactNode {
    const { i18n } = this.props
    return (
      <Menu.Item className="submenu">
        <Menu vertical>
          <Menu.Item href="https://market.decentraland.org">
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
    )
  }

  renderBuilderSubMenu(): React.ReactNode {
    const { i18n } = this.props
    return (
      <Menu.Item className="submenu">
        <Menu vertical>
          <Menu.Item href="https://builder.decentraland.org">
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
    )
  }

  renderDocsSubMenu(): React.ReactNode {
    const { i18n } = this.props
    return (
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
    )
  }

  renderPlacesSubMenu(): React.ReactNode {
    const { i18n } = this.props
    return (
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
    )
  }

  renderDaoSubMenu(): React.ReactNode {
    const { i18n } = this.props
    return (
      <Menu.Item className="submenu">
        <Menu vertical>
          <Menu.Item href="https://governance.decentraland.org/proposals">
            {i18n.menu.dao.list}
          </Menu.Item>
        </Menu>
      </Menu.Item>
    )
  }

  renderMobileMenuItem = (
    section: NavbarPages,
    title: React.ReactNode,
    href: string,
    children?: React.ReactNode
  ): React.ReactNode => {
    const { activePage, enableSubMenuSection } = this.props
    const showSubMenu = enableSubMenuSection && !!children

    return (
      <>
        <Menu.Item
          active={activePage === section}
          href={!enableSubMenuSection ? href : undefined}
        >
          {showSubMenu ? (
            <Header
              size="small"
              className={`dcl active-page ${
                this.shouldShowSubMenu(section) ? 'caret-up' : 'caret-down'
              }`}
              onClick={(e: React.MouseEvent) =>
                this.handleToggleShowSubMenu(e, section)
              }
            >
              {title}
            </Header>
          ) : (
            title
          )}
        </Menu.Item>
        {this.shouldShowSubMenu(section) && children}
      </>
    )
  }

  renderLeftMobileMenu(): React.ReactNode {
    const { i18n } = this.props

    return (
      <>
        {this.renderMobileMenuItem(
          NavbarPages.MARKETPLACE,
          i18n.menu.marketplace.main,
          'https://market.decentraland.org',
          this.renderMarketplaceSubMenu()
        )}
        {this.renderMobileMenuItem(
          NavbarPages.BUILDER,
          i18n.menu.builder.main,
          'https://builder.decentraland.org',
          this.renderBuilderSubMenu()
        )}
        {this.renderMobileMenuItem(
          NavbarPages.DOCS,
          i18n.menu.docs.main,
          'https://docs.decentraland.org',
          this.renderDocsSubMenu()
        )}
        {this.renderMobileMenuItem(
          NavbarPages.PLACES,
          i18n.menu.places.main,
          'https://places.decentraland.org',
          this.renderPlacesSubMenu()
        )}
        {this.renderMobileMenuItem(
          NavbarPages.EVENTS,
          i18n.menu.events,
          'https://events.decentraland.org'
        )}
        {this.renderMobileMenuItem(
          NavbarPages.DAO,
          i18n.menu.dao.main,
          'https://governance.decentraland.org',
          this.renderDaoSubMenu()
        )}
        {this.renderMobileMenuItem(
          NavbarPages.BLOG,
          i18n.menu.blog,
          'https://decentraland.org/blog'
        )}
      </>
    )
  }

  renderLeftDesktopMenu(): React.ReactNode {
    const { i18n } = this.props

    return (
      <>
        {this.renderMenuItem(
          NavbarPages.MARKETPLACE,
          i18n.menu.marketplace.main,
          'https://market.decentraland.org',
          this.renderMarketplaceSubMenu()
        )}
        {this.renderMenuItem(
          NavbarPages.BUILDER,
          i18n.menu.builder.main,
          'https://builder.decentraland.org',
          this.renderBuilderSubMenu()
        )}
        {this.renderMenuItem(
          NavbarPages.DOCS,
          i18n.menu.docs.main,
          'https://docs.decentraland.org',
          this.renderDocsSubMenu()
        )}

        {this.renderMenuItem(
          NavbarPages.PLACES,
          i18n.menu.places.main,
          'https://places.decentraland.org',
          this.renderPlacesSubMenu()
        )}
        {this.renderMenuItem(
          NavbarPages.EVENTS,
          i18n.menu.events,
          'https://events.decentraland.org'
        )}
        {this.renderMenuItem(
          NavbarPages.DAO,
          i18n.menu.dao.main,
          'https://dao.decentraland.org',
          this.renderDaoSubMenu()
        )}
        {this.renderMenuItem(
          NavbarPages.BLOG,
          i18n.menu.blog,
          'https://decentraland.org/blog'
        )}
      </>
    )
  }

  renderMenuItem(
    section: NavbarPages,
    title: React.ReactNode,
    href: string,
    children?: React.ReactNode
  ): React.ReactNode {
    const { activePage } = this.props
    return (
      <Menu.Item
        active={activePage === section}
        onMouseEnter={(e: React.MouseEvent) =>
          this.handleToggleShowSubMenu(e, section)
        }
        onMouseLeave={(e: React.MouseEvent) =>
          this.handleToggleShowSubMenu(e, section)
        }
      >
        <a className="item" href={href}>
          {title}
        </a>
        {this.shouldShowSubMenu(section) && children}
      </Menu.Item>
    )
  }

  renderLeftMenu(): React.ReactNode {
    const { leftMenu } = this.props
    if (leftMenu) {
      return leftMenu
    }
    return (
      <>
        <NotMobile>{this.renderLeftDesktopMenu()}</NotMobile>
        <Mobile>{this.renderLeftMobileMenu()}</Mobile>
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
