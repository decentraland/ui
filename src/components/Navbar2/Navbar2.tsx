import React, { useState, useCallback } from 'react'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import classNames from 'classnames'

import { Container } from '../Container/Container'
import { Logo } from '../Logo/Logo'
import { Desktop, TabletAndBelow, useTabletAndBelowMediaQuery } from '../Media'
import { UserMenu } from '../UserMenu/UserMenu'
import { Back } from '../Back/Back'

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
          description: 'Uncover what’s happening in the market',
          url: 'https://market.decentraland.org'
        },
        {
          title: 'LANDs',
          description: 'Buy and Rent Lands',
          url: 'https://market.decentraland.org'
        }
      ],
      column2: [
        {
          title: 'Avatar Shop',
          description: 'Buy Wearables and Emotes',
          url: 'https://market.decentraland.org'
        },
        {
          title: 'NAMEs',
          description: 'Claim a Unique Name and Own a World',
          url: 'https://market.decentraland.org'
        }
      ],
      column3: [
        {
          title: 'My Assets',
          description: 'Manage all your assets at a glace',
          url: 'https://market.decentraland.org'
        },
        {
          title: 'My Lists',
          description: 'Save and find all your wished items here',
          url: 'https://market.decentraland.org'
        }
      ]
    },
    create: {
      main: 'Create',
      column1Title: 'PUBLISH',
      column1: [
        {
          title: 'Wearables and Emotes',
          description: 'Monetize your style. Sell your own collections.',
          url: 'https://market.decentraland.org'
        },
        {
          title: 'Scenes',
          description: 'Build virtual spaces for Worlds or LANDs.',
          url: 'https://market.decentraland.org'
        }
      ],
      column2Title: 'MANAGE',
      column2: [
        {
          title: 'My NAMEs',
          description: 'Control your digital identity and brand',
          url: 'https://market.decentraland.org'
        },
        {
          title: 'My Worlds',
          description: 'Own a name? Unlock your personal world.',
          url: 'https://market.decentraland.org'
        },
        {
          title: 'My LAND',
          description: 'Manage permissions and create estates.',
          url: 'https://market.decentraland.org'
        }
      ],
      column3Title: 'HIRE',
      column3: [
        {
          title: 'Decentraland Studios',
          description: 'Work with top-tier talent for your projects.',
          url: 'https://market.decentraland.org',
          isExternal: true
        }
      ]
    },
    explore: {
      main: 'Explore',
      column1: [
        {
          title: 'Events',
          description: 'Find and connect with your metaverse tribe.',
          url: 'https://market.decentraland.org'
        },
        {
          title: 'My Events',
          description: 'Track your virtual events.',
          url: 'https://market.decentraland.org'
        }
      ],
      column2: [
        {
          title: 'Places',
          description: 'Discover the wonders of Decentraland.',
          url: 'https://market.decentraland.org'
        },
        {
          title: 'My Favorite Places',
          description: 'Your personal pick of places.',
          url: 'https://market.decentraland.org'
        }
      ]
    },
    learn: {
      main: 'Learn',
      column1: [
        {
          title: 'About Decentraland',
          description: 'Learn the essentials of Decentraland.',
          url: 'https://market.decentraland.org'
        },
        {
          title: 'Creator Docs',
          description: 'Your go-to guide to crafting in Decentraland.',
          url: 'https://market.decentraland.org'
        }
      ],
      column2: [
        {
          title: 'Blog',
          description: "Stay updated with Decentraland's latest",
          url: 'https://market.decentraland.org'
        },
        {
          title: 'Contributor Docs',
          description: 'Help forge the technical core of Decentraland.',
          url: 'https://market.decentraland.org'
        }
      ]
    },
    governance: {
      main: 'Governance',
      column1: [
        {
          title: 'Overview',
          description: 'Help shape Decentraland’s future',
          url: 'https://market.decentraland.org'
        },
        {
          title: 'DAO Funds',
          description: 'Track the DAO’s financial footprint',
          url: 'https://market.decentraland.org'
        }
      ],
      column2: [
        {
          title: 'Proposals',
          description: 'Use your voting power and participate',
          url: 'https://market.decentraland.org'
        },
        {
          title: 'My DAO Profile',
          description: 'Dashboard for all your DAO activity',
          url: 'https://market.decentraland.org'
        }
      ],
      column3: [
        {
          title: 'Active Grants',
          description: 'Progress tracker for grant initiatives',
          url: 'https://market.decentraland.org'
        },
        {
          title: 'What is a DAO?',
          description: 'Learn the essentials about the DAO.',
          url: 'https://market.decentraland.org'
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
