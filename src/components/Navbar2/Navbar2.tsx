import React, { useState, useCallback } from 'react'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import classNames from 'classnames'

import { Container } from '../Container/Container'
import { Logo } from '../Logo/Logo'
import { Desktop, TabletAndBelow, useTabletAndBelowMediaQuery } from '../Media'
import { UserMenu } from '../UserMenu/UserMenu'
import { Back } from '../Back/Back'
import ChevronIcon from '../Icons/ChevronIcon'

import {
  SubMenuColumnProps,
  SubMenuItemProps,
  Navbar2Pages,
  Navbar2Props,
  MenuLeftDesktopProps as MainMenuProps,
  MenuItemProps,
  SubMenuProps
} from './Navbar2.types'

import './Navbar2.css'
import ArrowIcon from '../Icons/ArrowIcon'
import { i18n } from './Navbar2.i18n'

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
      {!isMobile && <ChevronIcon down={true} />}
      {isMobile && <ArrowIcon />}
    </Menu.Item>
  )
}

const MainMenu = (props: MainMenuProps) => {
  return (
    <div
      className={classNames(
        'dcl',
        !props.isMobile && 'dui-navbar2__menu-main',
        props.isMobile && 'dui-navbar2__menu-mobile'
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
  const {
    activePage,
    className,
    isSignedIn,
    onClickMenuOption,
    ...userMenuProps
  } = props
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
        'dui-navbar2',
        toggle && selectedMenu,
        menuMobileOpen && 'dui-navbar2__mobile-open',
        !toggle && 'unselected',
        className
      )}
      role="navigation"
    >
      <Container className="dui-navbar2-container">
        <div className="dui-navbar2-menu">
          <div className="dui-navbar2-wrapper">
            <TabletAndBelow>
              <div
                className={classNames(
                  'dui-navbar2-toggle',
                  menuMobileOpen && 'open'
                )}
                onClick={(e) => handleMobileToggle(e, !menuMobileOpen)}
              >
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </TabletAndBelow>
            <Desktop>
              <a className="dui-navbar2-logo" href="https://decentraland.org">
                <Logo />
              </a>
              <MainMenu
                activePage={activePage}
                onToggleShowSubMenu={handleToggle}
              />
            </Desktop>
          </div>
          <TabletAndBelow>
            <a className="dui-navbar2-logo" href="https://decentraland.org">
              <Logo />
            </a>
          </TabletAndBelow>
          <div className="dui-navbar2-account">
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
