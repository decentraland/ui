import React, { useState, useCallback } from 'react'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
// import { config } from '../../config'
// import { Mana } from '../Mana/Mana'
// import { Blockie } from '../Blockie/Blockie'
import { Container } from '../Container/Container'
// import { Header } from '../Header/Header'
import { Logo } from '../Logo/Logo'
import { /* Mobile, */ NotMobile } from '../Media'
import classNames from 'classnames'
import {
  ColumnMenuProps,
  ItemSubMenuProps,
  Navbar2I18N,
  Navbar2Pages,
  Navbar2Props,
  RenderLeftDesktopMenuProps,
  RenderMenuItemProps,
  SubMenuProps,
} from './Navbar2.types'
import './Navbar2.css'

export const i18n = {
  menu: {
    marketplace: {
      main: 'Marketplace',
      column1: [
        {
          title: 'Overview',
          description: 'Uncover what’s happening in the market',
          url: 'https://market.decentraland.org',
        },
        {
          title: 'LANDs',
          description: 'Buy and Rent Lands',
          url: 'https://market.decentraland.org',
        },
      ],
      column2: [
        {
          title: 'Avatar Shop',
          description: 'Buy Wearables and Emotes',
          url: 'https://market.decentraland.org',
        },
        {
          title: 'NAMEs',
          description: 'Claim a Unique Name and Own a World',
          url: 'https://market.decentraland.org',
        },
      ],
      column3: [
        {
          title: 'My Assets',
          description: 'Manage all your assets at a glace',
          url: 'https://market.decentraland.org',
        },
        {
          title: 'My Lists',
          description: 'Save and find all your wished items here',
          url: 'https://market.decentraland.org',
        },
      ],
    },
    create: {
      main: 'Create',
      column1Title: 'PUBLISH',
      column1: [
        {
          title: 'Wearables and Emotes',
          description: 'Monetize your style. Sell your own collections.',
          url: 'https://market.decentraland.org',
        },
        {
          title: 'Scenes',
          description: 'Build virtual spaces for Worlds or LANDs.',
          url: 'https://market.decentraland.org',
        },
      ],
      column2Title: 'MANAGE',
      column2: [
        {
          title: 'My NAMEs',
          description: 'Control your digital identity and brand',
          url: 'https://market.decentraland.org',
        },
        {
          title: 'My Worlds',
          description: 'Own a name? Unlock your personal world.',
          url: 'https://market.decentraland.org',
        },
        {
          title: 'My LAND',
          description: 'Manage permissions and create estates.',
          url: 'https://market.decentraland.org',
        },
      ],
      column3Title: 'HIRE',
      column3: [
        {
          title: 'Decentraland Studios',
          description: 'Work with top-tier talent for your projects.',
          url: 'https://market.decentraland.org',
          isExternal: true,
        },
      ],
    },
    discover: {
      main: 'Discover',
      column1: [
        {
          title: 'Events',
          description: 'Find and connect with your metaverse tribe.',
          url: 'https://market.decentraland.org',
        },
        {
          title: 'My Events',
          description: 'Track your virtual events.',
          url: 'https://market.decentraland.org',
        },
      ],
      column2: [
        {
          title: 'Places',
          description: 'Discover the wonders of Decentraland.',
          url: 'https://market.decentraland.org',
        },
        {
          title: 'My Favorite Places',
          description: 'Your personal pick of places.',
          url: 'https://market.decentraland.org',
        },
      ],
    },
    learn: {
      main: 'Learn',
      column1: [
        {
          title: 'About Decentraland',
          description: 'Learn the essentials of Decentraland.',
          url: 'https://market.decentraland.org',
        },
        {
          title: 'Creator Docs',
          description: 'Your go-to guide to crafting in Decentraland.',
          url: 'https://market.decentraland.org',
        },
      ],
      column2: [
        {
          title: 'Blog',
          description: "Stay updated with Decentraland's latest",
          url: 'https://market.decentraland.org',
        },
        {
          title: 'Contributor Docs',
          description: 'Help forge the technical core of Decentraland.',
          url: 'https://market.decentraland.org',
        },
      ],
    },
    vote: {
      main: 'Vote',
      column1: [
        {
          title: 'Overview',
          description: 'Help shape Decentraland’s future',
          url: 'https://market.decentraland.org',
        },
        {
          title: 'DAO Funds',
          description: 'Track the DAO’s financial footprint',
          url: 'https://market.decentraland.org',
        },
      ],
      column2: [
        {
          title: 'Proposals',
          description: 'Use your voting power and participate',
          url: 'https://market.decentraland.org',
        },
        {
          title: 'My DAO Profile',
          description: 'Dashboard for all your DAO activity',
          url: 'https://market.decentraland.org',
        },
      ],
      column3: [
        {
          title: 'Active Grants',
          description: 'Progress tracker for grant initiatives',
          url: 'https://market.decentraland.org',
        },
        {
          title: 'What is a DAO?',
          description: 'Learn the essentials about the DAO.',
          url: 'https://market.decentraland.org',
        },
      ],
    },
  },
  account: {
    signIn: 'Sign In',
    connecting: 'Connecting...',
  },
} as Navbar2I18N

const onClickMenuOption = (event: React.MouseEvent, section: string) => {
  console.log(event, section)
}

const ItemSubMenu = (props: ItemSubMenuProps) => {
  const { title, description, href, isExternal, className } = props
  return (
    <div
      className={classNames(
        'submenu-item',
        className,
        isExternal && 'submenu-item-external'
      )}
    >
      <a href={href}>
        <h1>{title}</h1>
        <p>{description}</p>
      </a>
    </div>
  )
}

const ColumnMenu = (props: ColumnMenuProps) => {
  const { children, title, className } = props
  return (
    <div
      className={classNames(
        'submenu-column',
        className,
        !!title && 'submenu-column-title'
      )}
    >
      {!!title && <h1>{title}</h1>}
      {children}
    </div>
  )
}

const SubMenu = (props: SubMenuProps) => {
  const { selectedMenu, onToggleShowSubMenu } = props

  return (
    <div
      className={classNames('submenu-container', `${selectedMenu}-selected`)}
    >
      {Object.keys(i18n.menu).map((key) => {
        const section = key as Navbar2Pages
        const submenu = i18n.menu[section]
        return (
          <Menu.Item
            className={classNames('submenu', `${section}-submenu`)}
            onMouseEnter={(e: React.MouseEvent) =>
              onToggleShowSubMenu(e, section, true)
            }
            onMouseLeave={(e: React.MouseEvent) =>
              onToggleShowSubMenu(e, section, false)
            }
          >
            <div className="submenu-column__wrapper">
              <ColumnMenu title={submenu.column1Title}>
                {submenu.column1.map((item, index) => (
                  <ItemSubMenu
                    key={index}
                    isExternal={item.isExternal}
                    title={item.title}
                    description={item.description}
                    href={item.url}
                  />
                ))}
              </ColumnMenu>
              <ColumnMenu title={submenu.column2Title}>
                {submenu.column2.map((item, index) => (
                  <ItemSubMenu
                    key={index}
                    isExternal={item.isExternal}
                    title={item.title}
                    description={item.description}
                    href={item.url}
                  />
                ))}
              </ColumnMenu>
              {!!submenu.column3 && (
                <ColumnMenu title={submenu.column3Title}>
                  {submenu.column3.map((item, index) => (
                    <ItemSubMenu
                      key={index}
                      isExternal={item.isExternal}
                      title={item.title}
                      description={item.description}
                      href={item.url}
                    />
                  ))}
                </ColumnMenu>
              )}
            </div>
          </Menu.Item>
        )
      })}
    </div>
  )
}

const MenuItem = (props: RenderMenuItemProps) => {
  const { activePage, section, title, onToggleShowSubMenu } = props

  return (
    <Menu.Item
      active={activePage === section}
      onMouseEnter={(e: React.MouseEvent) =>
        onToggleShowSubMenu(e, section, true)
      }
      onMouseLeave={(e: React.MouseEvent) =>
        onToggleShowSubMenu(e, section, false)
      }
      className={classNames('menu-item', section)}
    >
      {title}
    </Menu.Item>
  )
}

const RenderLeftDesktopMenu = (props: RenderLeftDesktopMenuProps) => {
  const { activePage, onToggleShowSubMenu } = props

  return (
    <>
      <MenuItem
        activePage={activePage}
        section={Navbar2Pages.MARKETPLACE}
        title={i18n.menu.marketplace.main}
        onToggleShowSubMenu={onToggleShowSubMenu}
      />
      <MenuItem
        activePage={activePage}
        section={Navbar2Pages.CREATE}
        title={i18n.menu.create.main}
        onToggleShowSubMenu={onToggleShowSubMenu}
      />
      <MenuItem
        activePage={activePage}
        section={Navbar2Pages.DISCOVER}
        title={i18n.menu.discover.main}
        onToggleShowSubMenu={onToggleShowSubMenu}
      />
      <MenuItem
        activePage={activePage}
        section={Navbar2Pages.LEARN}
        title={i18n.menu.learn.main}
        onToggleShowSubMenu={onToggleShowSubMenu}
      />
      <MenuItem
        activePage={activePage}
        section={Navbar2Pages.VOTE}
        title={i18n.menu.vote.main}
        onToggleShowSubMenu={onToggleShowSubMenu}
      />
    </>
  )
}

export const Navbar2 = React.memo((props: Navbar2Props) => {
  const {
    // activePage,
    className,
    isSignIn,
    isFullscreen,
    isOverlay,
  } = props

  const [toggle, setToggle] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState<Navbar2Pages | boolean>()

  const handleToggle = useCallback(
    (e: React.MouseEvent, section: Navbar2Pages, show: boolean) => {
      setToggle(show)
      console.log('DATA IN TOGGLE', show, section)
      show && setSelectedMenu(section)

      /* if (onClickMenuOption) {
        onClickMenuOption(e, section)
      } */
    },
    [setToggle, onClickMenuOption]
  )

  console.log(selectedMenu)

  const classNameMerged = classNames({
    dcl: true,
    navbar2: true,
    marketplace: toggle && selectedMenu === Navbar2Pages.MARKETPLACE,
    create: toggle && selectedMenu === Navbar2Pages.CREATE,
    discover: toggle && selectedMenu === Navbar2Pages.DISCOVER,
    learn: toggle && selectedMenu === Navbar2Pages.LEARN,
    vote: toggle && selectedMenu === Navbar2Pages.VOTE,
    unselected: !toggle,
    'sign-in': isSignIn,
    fullscreen: isFullscreen,
    overlay: isOverlay,
    className: className,
  })

  return (
    <div className={classNameMerged} role="navigation">
      <Container className="full-width">
        <div className={classNames('dcl', 'navbar2-menu')}>
          <NotMobile>
            <div className={classNames('dcl', 'navbar2-wrapper')}>
              <a
                className={classNames('dcl', 'navbar2-logo')}
                href="https://decentraland.org"
              >
                <Logo />
              </a>
              <RenderLeftDesktopMenu
                activePage={''}
                onToggleShowSubMenu={handleToggle}
              />
            </div>
            {/* <Menu secondary stackable>
              <a className={classNames("dcl", "navbar2-logo")} href="https://decentraland.org">
                <Logo />
              </a>
              <LeftMenu 
                activePage='asd' 
                leftMenu={leftMenu} 
                leftMenuDecorator={leftMenuDecorator} 
                onToggleShowSubMenu={handleToggle} 
              />
            </Menu> */}
          </NotMobile>
          {/* {toggle && <LeftSubMenu selectedMenu={selectedMenu} />} */}
          {/* <Mobile>
            <div className={classNames("dcl", "navbar2-mobile-menu")}>
              <a className={classNames("dcl", "navbar2-logo")} href="https://decentraland.org">
                <Logo />
              </a>
              <Header
                size="small"
                className={classNames({
                  dcl: true,
                  "active-page": true,
                  "caret-up": toggle,
                  "caret-down": !toggle
                })}
                onClick={handleToggle}
              >
                {activePage}
              </Header>
            </div>
          </Mobile> */}
        </div>

        {/* <div className="dcl navbar2-account">{this.renderRightMenu()}</div> */}
      </Container>
      <SubMenu
        selectedMenu={selectedMenu}
        onToggleShowSubMenu={handleToggle}
        onClickMenuOption={onClickMenuOption}
      />
      {/* <div className="mobile-menu">
        <LeftMenu 
          activePage='' 
          leftMenu={leftMenu} 
          leftMenuDecorator={leftMenuDecorator} 
          onToggleShowSubMenu={handleToggle} 
        />
      </div> */}
    </div>
  )
})
