import React from 'react'
import classNames from 'classnames'

import { MenuItem } from '../MenuItem/MenuItem'
import { Navbar2Pages } from '../Navbar2.types'
import { MainMenuProps } from './MainMenu.types'

import './MainMenu.css'

export const MainMenu = (props: MainMenuProps) => {
  const { i18n, ...menuItemProps } = props
  return (
    <div
      className={classNames(
        'dui-navbar2__menu',
        !props.isMobile && 'dui-navbar2__menu-desktop',
        props.isMobile && 'dui-navbar2__menu-mobile'
      )}
    >
      <MenuItem
        {...menuItemProps}
        section={Navbar2Pages.MARKETPLACE}
        title={i18n.marketplace}
      />
      <MenuItem
        {...menuItemProps}
        section={Navbar2Pages.CREATE}
        title={i18n.create}
      />
      <MenuItem
        {...menuItemProps}
        section={Navbar2Pages.EXPLORE}
        title={i18n.explore}
      />
      <MenuItem
        {...menuItemProps}
        section={Navbar2Pages.LEARN}
        title={i18n.learn}
      />
      <MenuItem
        {...menuItemProps}
        section={Navbar2Pages.GOVERNANCE}
        title={i18n.governance}
      />
    </div>
  )
}
