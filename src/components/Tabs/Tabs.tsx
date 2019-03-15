import * as React from 'react'
import './Tabs.css'
import { Container, Responsive } from '../..'

export type TabsProps = {
  hasDivider?: boolean
}

export class Tabs extends React.PureComponent<TabsProps> {
  static defaultProps: Partial<TabsProps> = {
    hasDivider: true
  }
  static Left = ({ children }) => (
    <div className="dcl tabs-left">{children}</div>
  )

  static Right = ({ children }) => (
    <div className="dcl tabs-right">{children}</div>
  )

  static Tab = ({
    active,
    children
  }: {
    active?: boolean
    children: React.ReactNode
  }) => <div className={`dcl tab ${active ? 'active' : ''}`}>{children}</div>

  render() {
    const { children, hasDivider } = this.props
    return (
      <div className={`dcl tabs ${hasDivider ? 'divider' : ''}`}>
        <Responsive as={Container} minWidth={Responsive.onlyTablet.minWidth}>
          {children}
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>{children}</Responsive>
      </div>
    )
  }
}
