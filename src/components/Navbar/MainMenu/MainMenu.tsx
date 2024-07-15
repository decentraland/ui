import React from 'react'
import classNames from 'classnames'

import { MenuItem } from '../MenuItem/MenuItem'
import { NavbarPages } from '../Navbar.types'
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
      />
      <MenuItem
        {...menuItemProps}
        section={NavbarPages.CREATE}
        title={i18n.create}
      />
      <MenuItem
        {...menuItemProps}
        section={NavbarPages.EXPLORE}
        title={i18n.explore}
      />
      <MenuItem
        {...menuItemProps}
        section={NavbarPages.LEARN}
        title={i18n.learn}
      />
      <MenuItem
        {...menuItemProps}
        section={NavbarPages.GOVERNANCE}
        title={i18n.governance}
      />
    </div>
  )
}
