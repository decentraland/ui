import React, { useState, useCallback } from 'react'
import classNames from 'classnames'

import { Container } from '../Container/Container'
import { Logo } from '../Logo/Logo'
import { Desktop, TabletAndBelow, useTabletAndBelowMediaQuery } from '../Media'
import { UserMenu } from '../UserMenu/UserMenu'
import { Navbar2Pages, Navbar2Props } from './Navbar2.types'
import { SubMenu } from './SubMenu/SubMenu'
import { MainMenu } from './MainMenu/MainMenu'

import './Navbar2.css'

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
