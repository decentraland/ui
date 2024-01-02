import React from 'react'
import classNames from 'classnames'

import { SubMenuColumnProps } from './SubMenuColumn.types'

import './SubMenuColumn.css'

export const SubMenuColumn = (props: SubMenuColumnProps) => {
  const { children, title, className } = props
  return (
    <div
      className={classNames(
        'dui-submenu-column',
        className,
        !!title && 'dui-submenu-column-title'
      )}
    >
      {!!title && <h1>{title}</h1>}
      {children}
    </div>
  )
}
