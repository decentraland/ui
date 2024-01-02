import React from 'react'

import classNames from 'classnames'
import { SubMenuItemProps } from './SubMenuItem.types'

import './SubMenuItem.css'

export const SubMenuItem = (props: SubMenuItemProps) => {
  const { title, description, href, isExternal, className } = props
  return (
    <div
      className={classNames(
        'dui-submenu-item',
        className,
        isExternal && 'dui-submenu-item-external'
      )}
    >
      <a href={href}>
        <h1>{title}</h1>
        <p>{description}</p>
      </a>
    </div>
  )
}
