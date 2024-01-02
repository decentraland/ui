import React from 'react'

import classNames from 'classnames'
import { SubMenuItemProps } from './SubMenuItem.types'
import ExternalIcon from '../../Icons/ExternalIcon'

import './SubMenuItem.css'

export const SubMenuItem = (props: SubMenuItemProps) => {
  const {
    title,
    description,
    href,
    isExternal,
    className,
    eventTracking,
    onClickMenuOption
  } = props
  return (
    <div
      className={classNames(
        'dui-submenu-item',
        className,
        isExternal && 'dui-submenu-item-external'
      )}
    >
      <a href={href} onClick={(e) => onClickMenuOption(e, eventTracking)}>
        <h1>{title}</h1>
        <p>{description}</p>
        {isExternal && <ExternalIcon />}
      </a>
    </div>
  )
}
