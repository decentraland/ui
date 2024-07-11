import React, { useCallback } from 'react'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import classNames from 'classnames'

import ArrowIcon from '../../Icons/ArrowIcon'
import ChevronIcon from '../../Icons/ChevronIcon'
import { MenuItemProps } from './MenuItem.types'

import './MenuItem.css'

export const MenuItem = (props: MenuItemProps) => {
  const { activePage, section, title, onToggleShowSubMenu, isMobile, mainUrl } =
    props

  const mainRedirect = useCallback(() => {
    mainUrl && window.open(mainUrl, '_self')
  }, [mainUrl])

  return (
    <Menu.Item
      active={activePage === section}
      onClick={(e: React.MouseEvent) => {
        isMobile && onToggleShowSubMenu(e, true, section)
      }}
      className={classNames('dui-menu-item', section, isMobile && 'mobile')}
    >
      <div onClick={mainRedirect}>{title}</div>
      {!isMobile && (
        <div
          onClick={(e: React.MouseEvent) => {
            onToggleShowSubMenu(e, true, section)
          }}
        >
          <ChevronIcon down={true} />
        </div>
      )}
      {isMobile && <ArrowIcon />}
    </Menu.Item>
  )
}
