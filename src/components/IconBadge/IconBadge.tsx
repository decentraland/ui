import React from 'react'
import classNames from 'classnames'
import { Props } from './IconBadge.types'
import './IconBadge.css'

export const IconBadge = ({
  icon,
  text,
  onClick,
  className,
  children
}: Props) => {
  const childrenInt = React.useMemo(
    () => (
      <>
        {children ? (
          <span className="dui-icon-badge__custom-icon">{children}</span>
        ) : (
          <span className={classNames(icon && 'dui-icon-badge__icon', icon)} />
        )}
        <span className="text">{text}</span>
      </>
    ),
    [children, icon, text]
  )

  return (
    <div className={classNames('dui-icon-badge', className)} onClick={onClick}>
      {childrenInt}
    </div>
  )
}
