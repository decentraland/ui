import * as React from 'react'
import classnames from 'classnames'
import arrowDownIcon from '../../assets/arrow-down.svg'
import arrowUpIcon from '../../assets/arrow-up.svg'
import { Button } from '../Button/Button'
import './Box.css'

export type BoxProps = {
  header?: string
  className?: string
  children: React.ReactNode
  borderless?: boolean
  collapsible?: boolean
  collapsed?: boolean
  onToggle?: (shouldCollapse: boolean) => void
}

export const Box = (props: BoxProps): JSX.Element => {
  const {
    collapsed,
    header,
    children,
    borderless,
    className,
    collapsible,
    onToggle
  } = props
  const [isCollapsed, setIsCollapsed] = React.useState(
    'collapsed' in props ? collapsed : false
  )

  const shouldCollapse = 'collapsed' in props ? collapsed : isCollapsed

  function handleToggleCollapse() {
    if (onToggle) {
      onToggle(!isCollapsed)
    }
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className={classnames('dcl box', className, { borderless })}>
      {header && (
        <div
          className={classnames('box-header', { collapsed: shouldCollapse })}
        >
          <div className="dcl box-header-text">{header}</div>
          {collapsible && (
            <Button
              basic
              className="collapse-btn"
              onClick={handleToggleCollapse}
            >
              <img src={shouldCollapse ? arrowDownIcon : arrowUpIcon } alt={shouldCollapse ? "collapse" : "open" }/>
            </Button>
          )}
        </div>
      )}
      {!shouldCollapse && <div className={'dcl box-children'}>{children}</div>}
    </div>
  )
}
