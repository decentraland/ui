import React, { useCallback } from 'react'
import Menu from 'semantic-ui-react'
import classNames from 'classnames'

import ArrowIcon from '../../Icons/ArrowIcon'
import { MenuItemProps } from './MenuItem.types'

import './MenuItem.css'

/**
 * @deprecated Should start using the same component migrated to UI2.
 */
export const MenuItem = (props: MenuItemProps) => {
  const {
    activePage,
    section,
    title,
    onToggleShowSubMenu,
    isMobile,
    mainUrl,
    textColor,
    backgroundColor,
    isExtraButton
  } = props

  const mainRedirect = useCallback(() => {
    mainUrl && window.open(mainUrl, '_self')
  }, [mainUrl])

  return (
    <Menu.Item
      active={activePage === section}
      onClick={(e: React.MouseEvent) => {
        isMobile && !isExtraButton
          ? onToggleShowSubMenu(e, true, section)
          : mainRedirect()
      }}
      onMouseEnter={(e: React.MouseEvent) =>
        !isMobile && onToggleShowSubMenu(e, true, section)
      }
      onMouseLeave={(e: React.MouseEvent) =>
        !isMobile && onToggleShowSubMenu(e, false, section)
      }
      className={classNames(
        'dui-menu-item',
        section,
        isMobile && 'mobile',
        backgroundColor && 'has-background'
      )}
      style={{ color: textColor, backgroundColor }}
    >
      {title}
      {isMobile && <ArrowIcon />}
    </Menu.Item>
  )
}
