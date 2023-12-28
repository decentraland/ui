import React, { useState, useCallback } from 'react'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import classNames from 'classnames'

import { Container } from '../Container/Container'
import { Logo } from '../Logo/Logo'
import { Desktop, TabletAndBelow, useTabletAndBelowMediaQuery } from '../Media'
import { UserMenu } from '../UserMenu/UserMenu'
import { Back } from '../Back/Back'

import { config } from '../../config'

import {
  SubMenuColumnProps,
  SubMenuItemProps,
  Navbar2I18N,
  Navbar2Pages,
  Navbar2Props,
  MenuLeftDesktopProps as MainMenuProps,
  MenuItemProps,
  SubMenuProps
} from './Navbar2.types'

import './Navbar2.css'

export const i18n = {
  menu: {
    marketplace: {
      main: 'Marketplace',
      column1: [
        {
          title: 'Overview',
          description: "See what's trending & new",
          url: config.get('MARKETPLACE_URL')
        },
        {
          title: 'NAMEs',
          description: 'Claim a NAME, get a whole World',
          url: config.get('MARKETPLACE_NAMES_URL')
        }
      ],
      column2: [
        {
          title: 'Wearables',
          description: 'Customize your digital identity',
          url: config.get('MARKETPLACE_WEARABLES_URL')
        },
        {
          title: 'LAND',
          description: 'Buy or Rent parcels on the Genesis City map',
          url: config.get('MARKETPLACE_LANDS_URL')
        }
      ],
      column3: [
        {
          title: 'Emotes',
          description: 'Animate your avatar',
          url: config.get('MARKETPLACE_EMOTES_URL')
        },
        {
          title: 'My Assets',
          description: 'Manage your assets, listings, bids, &and more',
          url: config.get('MARKETPLACE_MY_ASSETS_URL')
        }
      ]
    },
    create: {
      main: 'Create',
      column1Title: 'PUBLISH',
      column1: [
        {
          title: 'Wearables & Emotes',
          description: 'Publish & manage Marketplace collections',
          url: config.get('BUILDER_WEARABLE_EMOTES_URL')
        },
        {
          title: 'Scenes',
          description: 'Create & publish scenes to LAND or Worlds',
          url: config.get('BUILDER_SCENES_URL')
        }
      ],
      column2Title: 'MANAGE',
      column2: [
        {
          title: 'My NAMEs',
          description: 'Create & manage NAMEs',
          url: config.get('BUILDER_NAMES_URL')
        },
        {
          title: 'My Worlds',
          description: 'Manage Worlds & Worlds storage',
          url: config.get('BUILDER_WORLDS_URL')
        },
        {
          title: 'My LAND',
          description: 'Manage parcel permissions & more',
          url: config.get('BUILDER_LAND_URL')
        }
      ],
      column3Title: 'HIRE',
      column3: [
        {
          title: 'Decentraland Studios',
          description: 'Hire pros to transform your ideas to reality',
          url: config.get('STUDIOS_URL'),
          isExternal: true
        }
      ]
    },
    explore: {
      main: 'Explore',
      column1: [
        {
          title: 'Events',
          description: 'Find an event to jump into',
          url: config.get('EVENTS_URL')
        },
        {
          title: 'My Events',
          description: 'See saved events & events you’re hosting',
          url: config.get('EVENTS_MY_EVENTS_URL')
        }
      ],
      column2: [
        {
          title: 'Places',
          description: 'Browse locations in Genesis City & Worlds',
          url: config.get('PLACES_URL')
        },
        {
          title: 'My Favorite Places',
          description: 'See your saved locations',
          url: config.get('PLACES_MY_FAVORITE_URL')
        }
      ]
    },
    learn: {
      main: 'Learn',
      column1: [
        {
          title: 'About Decentraland',
          description: 'FAQs, Whitepaper, & DAO docs',
          url: config.get('DOCS_ABOUT_URL')
        },
        {
          title: 'Creator Docs',
          description: 'Make Wearables, Emotes, scenes, games, & more',
          url: config.get('DOCS_CREATORS_URL')
        }
      ],
      column2: [
        {
          title: 'Blog',
          description: 'News, Community Highlights, & more',
          url: config.get('BLOG_URL'),
          isExternal: true
        },
        {
          title: 'Open Protocol Docs',
          description: 'See how Decentraland works & contribute',
          url: config.get('DOCS_CONTRIBUTOR_URL')
        }
      ]
    },
    governance: {
      main: 'Governance',
      column1: [
        {
          title: 'Overview',
          description: 'The latest in Decentraland governance',
          url: config.get('GOVERNANCE_URL')
        },
        {
          title: 'DAO Transparency',
          description: 'Treasury, Activity Dashboards, & more',
          url: config.get('GOVERNANCE_TRANSPARENCY_URL')
        }
      ],
      column2: [
        {
          title: 'Proposals',
          description: 'Vote on active proposals',
          url: config.get('GOVERNANCE_PROPOSALS_URL')
        },
        {
          title: 'DAO Grants',
          description: 'Fund your project, contribute to the platform.',
          url: config.get('DAO_GRANTS_URL'),
          isExternal: true
        }
      ],
      column3: [
        {
          title: 'Active Grants',
          description: 'Browse grant-funded community projects',
          url: config.get('GOVERNANCE_PROJECTS_URL')
        },
        {
          title: 'DAO Docs',
          description: 'Learn about the DAO & how to participate',
          url: config.get('DOCS_DAO_URL')
        }
      ]
    }
  },
  account: {
    signIn: 'Sign In',
    connecting: 'Connecting...'
  }
} as Navbar2I18N

const onClickMenuOption = (event: React.MouseEvent, section: string) => {
  console.log(event, section)
}

const SubMenuItem = (props: SubMenuItemProps) => {
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

const SubMenuColumn = (props: SubMenuColumnProps) => {
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
  const { selectedMenu, onToggleShowSubMenu, isMobile } = props

  return (
    <div
      className={classNames(
        'submenu-container',
        `${selectedMenu}-selected`,
        isMobile && 'mobile'
      )}
    >
      {Object.keys(i18n.menu).map((key) => {
        const section = key as Navbar2Pages
        const submenu = i18n.menu[section]
        return (
          <Menu.Item
            className={classNames('submenu', `${section}-submenu`)}
            onMouseEnter={(e: React.MouseEvent) =>
              !isMobile && onToggleShowSubMenu(e, true, section)
            }
            onMouseLeave={(e: React.MouseEvent) =>
              !isMobile && onToggleShowSubMenu(e, false, section)
            }
          >
            {/* React.MouseEventHandler<HTMLDivElement> */}
            <div className="submenu-column__wrapper">
              {isMobile && (
                <Back
                  absolute
                  onClick={(e) => onToggleShowSubMenu(e, false, section)}
                >
                  Back
                </Back>
              )}
              <SubMenuColumn title={submenu.column1Title}>
                {submenu.column1.map((item, index) => (
                  <SubMenuItem
                    key={index}
                    isExternal={item.isExternal}
                    title={item.title}
                    description={item.description}
                    href={item.url}
                  />
                ))}
              </SubMenuColumn>
              <SubMenuColumn title={submenu.column2Title}>
                {submenu.column2.map((item, index) => (
                  <SubMenuItem
                    key={index}
                    isExternal={item.isExternal}
                    title={item.title}
                    description={item.description}
                    href={item.url}
                  />
                ))}
              </SubMenuColumn>
              {!!submenu.column3 && (
                <SubMenuColumn title={submenu.column3Title}>
                  {submenu.column3.map((item, index) => (
                    <SubMenuItem
                      key={index}
                      isExternal={item.isExternal}
                      title={item.title}
                      description={item.description}
                      href={item.url}
                    />
                  ))}
                </SubMenuColumn>
              )}
            </div>
          </Menu.Item>
        )
      })}
    </div>
  )
}

const MenuItem = (props: MenuItemProps) => {
  const { activePage, section, title, onToggleShowSubMenu, isMobile } = props

  return (
    <Menu.Item
      active={activePage === section}
      onMouseEnter={(e: React.MouseEvent) =>
        !isMobile && onToggleShowSubMenu(e, true, section)
      }
      onMouseLeave={(e: React.MouseEvent) =>
        !isMobile && onToggleShowSubMenu(e, false, section)
      }
      onClick={(e: React.MouseEvent) => {
        isMobile && onToggleShowSubMenu(e, true, section)
      }}
      className={classNames('menu-item', section, isMobile && 'mobile')}
    >
      {title}
    </Menu.Item>
  )
}

const MainMenu = (props: MainMenuProps) => {
  return (
    <div
      className={classNames(
        'dcl',
        !props.isMobile && 'navbar2__menu-main',
        props.isMobile && 'navbar2__menu-mobile'
      )}
    >
      <MenuItem
        {...props}
        section={Navbar2Pages.MARKETPLACE}
        title={i18n.menu.marketplace.main}
      />
      <MenuItem
        {...props}
        section={Navbar2Pages.CREATE}
        title={i18n.menu.create.main}
      />
      <MenuItem
        {...props}
        section={Navbar2Pages.EXPLORE}
        title={i18n.menu.explore.main}
      />
      <MenuItem
        {...props}
        section={Navbar2Pages.LEARN}
        title={i18n.menu.learn.main}
      />
      <MenuItem
        {...props}
        section={Navbar2Pages.GOVERNANCE}
        title={i18n.menu.governance.main}
      />
    </div>
  )
}

export const Navbar2 = React.memo((props: Navbar2Props) => {
  const { activePage, className, isSignedIn, ...userMenuProps } = props
  const [toggle, setToggle] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState<Navbar2Pages | boolean>()
  const [menuMobileOpen, setMenuMobileOpen] = useState(false)

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  const handleToggle = useCallback(
    (e: React.MouseEvent, show: boolean, section: Navbar2Pages) => {
      setToggle(show)
      show && setSelectedMenu(section)
    },
    [setToggle, setSelectedMenu]
  )

  const handleMobileToggle = useCallback(
    (e: React.MouseEvent, show: boolean) => {
      !show && setToggle(false)
      setMenuMobileOpen(show)
    },
    [setToggle, setMenuMobileOpen]
  )

  return (
    <div
      className={classNames(
        'dcl',
        'navbar2',
        toggle && selectedMenu,
        menuMobileOpen && 'navbar2__mobile-open',
        !toggle && 'unselected',
        className
      )}
      role="navigation"
    >
      <Container className="navbar2-container">
        <div className={classNames('dcl', 'navbar2-menu')}>
          <div className={classNames('dcl', 'navbar2-wrapper')}>
            <TabletAndBelow>
              <div
                className={classNames(
                  'dcl',
                  'navbar2-toggle',
                  menuMobileOpen && 'open'
                )}
                onClick={(e) => handleMobileToggle(e, !menuMobileOpen)}
              >
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </TabletAndBelow>
            <Desktop>
              <a
                className={classNames('dcl', 'navbar2-logo')}
                href="https://decentraland.org"
              >
                <Logo />
              </a>
              <MainMenu
                activePage={activePage}
                onToggleShowSubMenu={handleToggle}
              />
            </Desktop>
          </div>
          <TabletAndBelow>
            <a
              className={classNames('dcl', 'navbar2-logo')}
              href="https://decentraland.org"
            >
              <Logo />
            </a>
          </TabletAndBelow>
          <div className="dcl navbar2-account">
            <UserMenu {...userMenuProps} isSignedIn={isSignedIn}></UserMenu>
          </div>
        </div>
      </Container>

      <SubMenu
        selectedMenu={selectedMenu}
        onToggleShowSubMenu={handleToggle}
        onClickMenuOption={onClickMenuOption}
        isMobile={isTabletAndBelow}
      />
      <TabletAndBelow>
        <MainMenu
          activePage={activePage}
          onToggleShowSubMenu={handleToggle}
          isMobile={isTabletAndBelow}
        />
      </TabletAndBelow>
    </div>
  )
})
