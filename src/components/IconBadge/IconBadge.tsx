import React from 'react'
import classNames from 'classnames'
import { Props } from './IconBadge.types'
import './IconBadge.css'

/**
 * @deprecated Should start using the same component migrated to UI2.
 */
export const IconBadge = ({
  icon,
  text,
  onClick,
  className,
  children,
  inline
}: Props) => {
  const inlined = inline ? 'inlined' : 'boxed'
  const childrenInt = React.useMemo(
    () => (
      <>
        {children && icon ? (
          <span className="dui-icon-badge__custom-icon">{children}</span>
        ) : icon ? (
          <span className={classNames(icon && 'dui-icon-badge__icon', icon)} />
        ) : null}
        {text ? <span className="text">{text}</span> : null}
      </>
    ),
    [children, icon, text]
  )

  return (
    <span
      className={classNames(
        'dui-icon-badge',
        className,
        onClick && 'clickable',
        inlined
      )}
      onClick={onClick}
    >
      {childrenInt}
    </span>
  )
}
