import React from 'react'
import classNames from 'classnames'
import { Props } from './IconBadge.types'
import './IconBadge.css'

const IconBadge = ({ icon, text, onClick, className, children }: Props) => {
  const childrenInt = React.useMemo(
    () => (
      <>
        {children ? (
          <span className="custom-icon">{children}</span>
        ) : (
          <span className={classNames(icon && 'icon', icon)} />
        )}
        <span className="text">{text}</span>
      </>
    ),
    [children, icon, text]
  )

  return (
    <div className={classNames('IconBadge', className)} onClick={onClick}>
      {childrenInt}
    </div>
  )
}

export default React.memo(IconBadge)
