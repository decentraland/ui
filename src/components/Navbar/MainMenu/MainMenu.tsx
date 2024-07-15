import React from 'react'
import classNames from 'classnames'

import { config } from '../../../config'
import { MenuItem } from '../MenuItem/MenuItem'
import { NavbarPages, NavbarPagesUrls } from '../Navbar.types'
import { MainMenuProps } from './MainMenu.types'

import './MainMenu.css'

export const MainMenu = (props: MainMenuProps) => {
  const { i18n, ...menuItemProps } = props

  return (
    <div
      className={classNames(
        'dui-navbar__menu',
        !props.isMobile && 'dui-navbar__menu-desktop',
        props.isMobile && 'dui-navbar__menu-mobile'
      )}
    >
      <MenuItem
        {...menuItemProps}
        section={NavbarPages.MARKETPLACE}
        title={i18n.marketplace}
        mainUrl={config.get(
          NavbarPagesUrls[NavbarPages.MARKETPLACE.toUpperCase()]
        )}
      />
      <MenuItem
        {...menuItemProps}
        section={NavbarPages.CREATE}
        title={i18n.create}
        mainUrl={config.get(NavbarPagesUrls[NavbarPages.CREATE.toUpperCase()])}
      />
      <MenuItem
        {...menuItemProps}
        section={NavbarPages.EXPLORE}
        title={i18n.explore}
        mainUrl={config.get(NavbarPagesUrls[NavbarPages.EXPLORE.toUpperCase()])}
      />
      <MenuItem
        {...menuItemProps}
        section={NavbarPages.LEARN}
        title={i18n.learn}
        mainUrl={config.get(NavbarPagesUrls[NavbarPages.LEARN.toUpperCase()])}
      />
      <MenuItem
        {...menuItemProps}
        section={NavbarPages.GOVERNANCE}
        title={i18n.governance}
        mainUrl={config.get(
          NavbarPagesUrls[NavbarPages.GOVERNANCE.toUpperCase()]
        )}
      />
    </div>
  )
}
