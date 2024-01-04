import React, { useCallback } from 'react'

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
    eventTrackingName,
    onClickMenuOption
  } = props

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      event.preventDefault()
      onClickMenuOption &&
        onClickMenuOption(event, { eventTrackingName, url: href, isExternal })
      setTimeout(
        () => {
          window.open(href, isExternal ? '_blank' : '_self', 'noopener')
        },
        onClickMenuOption ? 300 : 0
      )
    },
    [onClickMenuOption, eventTrackingName, href, isExternal]
  )

  return (
    <div
      className={classNames(
        'dui-submenu-item',
        className,
        isExternal && 'dui-submenu-item-external'
      )}
    >
      <a href={href} onClick={handleClick}>
        <h1>{title}</h1>
        <p>{description}</p>
        {isExternal && <ExternalIcon />}
      </a>
    </div>
  )
}
