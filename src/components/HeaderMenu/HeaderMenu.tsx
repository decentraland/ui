import * as React from 'react'
import './HeaderMenu.css'

export type HeaderMenuProps = {
  stackable?: boolean
}

export class HeaderMenu extends React.PureComponent<HeaderMenuProps> {
  static defaultProps: Partial<HeaderMenuProps> = {
    stackable: false
  }

  static Left = ({ children }) => (
    <div className="dcl header-menu-left">{children}</div>
  )

  static Right = ({ children }) => (
    <div className="dcl header-menu-right">{children}</div>
  )

  render() {
    const { stackable, children } = this.props
    return (
      <div className={`dcl header-menu ${stackable ? 'stackable' : ''}`}>
        {children}
      </div>
    )
  }
}
