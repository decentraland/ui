import * as React from 'react'
import classnames from 'classnames'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import './Box.css'
import { Button } from 'semantic-ui-react'

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
              <Icon
                name={shouldCollapse ? 'chevron down' : 'chevron up'}
                color="yellow"
              />
            </Button>
          )}
        </div>
      )}
      {!shouldCollapse && <div className={'dcl box-children'}>{children}</div>}
    </div>
  )
}
