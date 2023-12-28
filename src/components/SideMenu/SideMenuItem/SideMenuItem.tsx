import React from 'react'
import classNames from 'classnames'

import { SideMenuItemProps } from './SideMenuItem.types'

import './SideMenuItem.css'

export const SideMenuItem = ({
  branch,
  value,
  item,
  level,
  onClick
}: SideMenuItemProps) => {
  return (
    <li
      className={classNames(
        'dui-side-menu-item',
        `dui-side-menu-item--level-${level}`,
        {
          'dui-side-menu-item--active': value === item.id
        }
      )}
      onClick={() => onClick(item.id)}
    >
      {item.label}
      {level === 2 && item.children && (
        <i
          className={classNames('dui-side-menu-item__caret dropdown icon', {
            'dui-side-menu-item__caret--open': branch.has(item.id)
          })}
        ></i>
      )}
    </li>
  )
}
