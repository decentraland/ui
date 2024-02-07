import React, { useState, useCallback } from 'react'
import classNames from 'classnames'

import { Container } from '../Container/Container'
import { Logo } from '../Logo/Logo'
import { Desktop, TabletAndBelow, useTabletAndBelowMediaQuery } from '../Media'
import { UserMenu } from '../UserMenu/UserMenu'
import { ChainSelector } from '../ChainSelector/ChainSelector'
import { NavbarPages, NavbarProps } from './Navbar.types'
import { SubMenu } from './SubMenu/SubMenu'
import { MainMenu } from './MainMenu/MainMenu'
import {
  i18nChainSelectorDefault,
  navbarMainTitlesI18N as i18nNavbarTitlesDefault,
  navbarSubmenu
} from './Navbar.defaults'
import { i18n as i18nUserMenuDefault } from '../UserMenu/UserMenu.i18n'

import './Navbar.css'

export const Navbar = React.memo((props: NavbarProps) => {
  const {
    chains,
    chainBeingConfirmed,
    onSelectChain,
    selectedChain,
    activePage,
    className,
    isSignedIn,
    i18nNavbar = i18nNavbarTitlesDefault,
    i18nUserMenu = i18nUserMenuDefault,
    i18nChainSelector = i18nChainSelectorDefault,
    submenuItems = navbarSubmenu,
    onClickNavbarItem,
    ...userMenuProps
  } = props
  const [toggle, setToggle] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState<NavbarPages | boolean>()
  const [menuMobileOpen, setMenuMobileOpen] = useState(false)

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  const handleToggle = useCallback(
    (e: React.MouseEvent, show: boolean, section: NavbarPages) => {
      setToggle(show)
      show && setSelectedMenu(section)
    },
    [setToggle, setSelectedMenu]
  )

  const handleMobileToggle = useCallback(
    (e: React.MouseEvent, show: boolean) => {
      if (!show) {
        setToggle(false)
        window.removeEventListener('scroll', noScroll)
      } else {
        window.addEventListener('scroll', noScroll)
      }
      setMenuMobileOpen(show)
    },
    [setToggle, setMenuMobileOpen]
  )

  const handleClickMenu = useCallback(
    (
      event: React.MouseEvent<HTMLElement, MouseEvent>,
      options: { eventTrackingName: string; url?: string; isExternal?: boolean }
    ) => {
      onClickNavbarItem && onClickNavbarItem(event, options)
    },
    [onClickNavbarItem]
  )

  const handleUserMenuOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    trackingId: string
  ) => {
    if (userMenuProps.onClickOpen) {
      userMenuProps.onClickOpen(event, trackingId)
    }
    handleMobileToggle(event, false)
  }

  return (
    <div
      className={classNames(
        'dui-navbar',
        toggle && selectedMenu,
        menuMobileOpen && 'dui-navbar__mobile-open',
        !toggle && 'unselected',
        className
      )}
      role="navigation"
    >
      <Container className="dui-navbar-container">
        <div className="dui-navbar-menu">
          <div className="dui-navbar-wrapper">
            <TabletAndBelow>
              <div
                className={classNames(
                  'dui-navbar-toggle',
                  menuMobileOpen && 'open'
                )}
                onClick={(e) => handleMobileToggle(e, !menuMobileOpen)}
              >
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </TabletAndBelow>
            <Desktop>
              <a className="dui-navbar-logo" href="https://decentraland.org">
                <Logo />
              </a>
              <MainMenu
                activePage={activePage}
                onToggleShowSubMenu={handleToggle}
                i18n={i18nNavbar}
              />
            </Desktop>
          </div>
          <TabletAndBelow>
            <a className="dui-navbar-logo" href="https://decentraland.org">
              <Logo />
            </a>
          </TabletAndBelow>
          {isSignedIn && chains?.length && selectedChain ? (
            <ChainSelector
              chains={chains}
              selectedChain={selectedChain}
              chainBeingConfirmed={chainBeingConfirmed}
              i18n={i18nChainSelector}
              onSelectChain={onSelectChain}
            />
          ) : null}
          <div className="dui-navbar-account">
            <UserMenu
              {...userMenuProps}
              onClickOpen={
                isTabletAndBelow
                  ? handleUserMenuOpen
                  : userMenuProps.onClickOpen
              }
              isSignedIn={isSignedIn}
              i18n={i18nUserMenu}
            />
          </div>
        </div>
      </Container>

      <SubMenu
        selectedMenu={selectedMenu}
        onToggleShowSubMenu={handleToggle}
        onClickMenuOption={handleClickMenu}
        isMobile={isTabletAndBelow}
        submenus={submenuItems}
      />
      <TabletAndBelow>
        <MainMenu
          activePage={activePage}
          onToggleShowSubMenu={handleToggle}
          isMobile={isTabletAndBelow}
          i18n={i18nNavbar}
        />
      </TabletAndBelow>
    </div>
  )
})

function noScroll() {
  window.scrollTo(0, 0)
}
