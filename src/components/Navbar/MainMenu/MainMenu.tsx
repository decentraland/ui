import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import { MenuItem } from '../MenuItem/MenuItem'
import { NavbarPages } from '../Navbar.types'
import { MainMenuProps } from './MainMenu.types'
import { getExtraButton, getNavbarPagesUrls, NavbarExtraButton } from '../utils'

import './MainMenu.css'

export const MainMenu = (props: MainMenuProps) => {
  const { i18n, ...menuItemProps } = props

  const urls = getNavbarPagesUrls()

  // load extra button
  const isMounted = useRef(false)
  const [extraButton, setExtraButton] = useState<NavbarExtraButton | null>(null)
  useEffect(() => {
    isMounted.current = true
    if (!extraButton) {
      getExtraButton().then((button) => {
        if (!isMounted.current) return
        setExtraButton(button)
      })
    }
    return () => {
      isMounted.current = false
    }
  }, [extraButton, isMounted, setExtraButton])

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
        mainUrl={urls[NavbarPages.MARKETPLACE]}
      />
      <MenuItem
        {...menuItemProps}
        section={NavbarPages.CREATE}
        title={i18n.create}
        mainUrl={urls[NavbarPages.CREATE]}
      />
      <MenuItem
        {...menuItemProps}
        section={NavbarPages.LEARN}
        title={i18n.learn}
        mainUrl={urls[NavbarPages.LEARN]}
      />
      <MenuItem
        {...menuItemProps}
        section={NavbarPages.GOVERNANCE}
        title={i18n.governance}
        mainUrl={urls[NavbarPages.GOVERNANCE]}
      />
      <MenuItem
        {...menuItemProps}
        section={NavbarPages.EXPLORE}
        title={i18n.explore}
        mainUrl={urls[NavbarPages.EXPLORE]}
      />
      {extraButton && extraButton.visible ? (
        <MenuItem
          {...menuItemProps}
          section={NavbarPages.EXTRA}
          title={extraButton.text}
          mainUrl={extraButton.link}
          textColor={extraButton.textColor}
          backgroundColor={extraButton.backgroundColor}
        />
      ) : null}
    </div>
  )
}
