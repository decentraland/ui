import React from 'react'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import classNames from 'classnames'

import ArrowIcon from '../../Icons/ArrowIcon'
import ChevronIcon from '../../Icons/ChevronIcon'
import { MenuItemProps } from './MenuItem.types'

import './MenuItem.css'

export const MenuItem = (props: MenuItemProps) => {
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
      className={classNames('dui-menu-item', section, isMobile && 'mobile')}
    >
      {title}
      {!isMobile && <ChevronIcon down={true} />}
      {isMobile && <ArrowIcon />}
    </Menu.Item>
  )
}
