import React from 'react'
import classNames from 'classnames'

import { MenuItem } from '../MenuItem/MenuItem'
import { NavbarPages } from '../Navbar.types'
import { MainMenuProps } from './MainMenu.types'
import { NavbarPagesUrl } from '../utils'

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
        mainUrl={NavbarPagesUrl(NavbarPages.MARKETPLACE)}
      />
      <MenuItem
        {...menuItemProps}
        section={NavbarPages.CREATE}
        title={i18n.create}
        mainUrl={NavbarPagesUrl(NavbarPages.CREATE)}
      />
      <MenuItem
        {...menuItemProps}
        section={NavbarPages.EXPLORE}
        title={i18n.explore}
        mainUrl={NavbarPagesUrl(NavbarPages.EXPLORE)}
      />
      <MenuItem
        {...menuItemProps}
        section={NavbarPages.LEARN}
        title={i18n.learn}
        mainUrl={NavbarPagesUrl(NavbarPages.LEARN)}
      />
      <MenuItem
        {...menuItemProps}
        section={NavbarPages.GOVERNANCE}
        title={i18n.governance}
        mainUrl={NavbarPagesUrl(NavbarPages.GOVERNANCE)}
      />
    </div>
  )
}
