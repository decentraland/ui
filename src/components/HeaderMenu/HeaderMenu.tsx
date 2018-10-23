import * as React from 'react'
import './HeaderMenu.css'

export class HeaderMenu extends React.PureComponent {
  static Left = ({ children }) => (
    <div className="dcl header-menu-left">{children}</div>
  )

  static Right = ({ children }) => (
    <div className="dcl header-menu-right">{children}</div>
  )

  render() {
    const { children } = this.props
    return <div className="dcl header-menu">{children}</div>
  }
}
