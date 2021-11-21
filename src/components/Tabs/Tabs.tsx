import * as React from 'react'
import { Mobile, NotMobile } from '../Media'
import { Container } from '../Container/Container'
import './Tabs.css'

export type TabsProps = {
  isFullscreen?: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export class Tabs extends React.PureComponent<TabsProps> {
  static defaultProps: Partial<TabsProps> = {
    isFullscreen: false
  }
  static Left = ({ children }: { children: React.ReactNode }): JSX.Element => (
    <div className="dcl tabs-left">{children}</div>
  )

  static Right = ({ children }: { children: React.ReactNode }): JSX.Element => (
    <div className="dcl tabs-right">{children}</div>
  )

  static Tab = ({
    active,
    onClick,
    children
  }: {
    active?: boolean
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    children: React.ReactNode
  }) => (
    <div className={`dcl tab ${active ? 'active' : ''}`} onClick={onClick}>
      {children}
      {active ? <div className="active-bar"></div> : null}
    </div>
  )

  render(): JSX.Element {
    const { children, isFullscreen, onClick } = this.props
    return (
      <div
        className={`dcl tabs ${isFullscreen ? 'fullscreen' : ''}`}
        onClick={onClick}
      >
        <NotMobile>
          <Container>{children}</Container>
        </NotMobile>
        <Mobile>{children}</Mobile>
      </div>
    )
  }
}
