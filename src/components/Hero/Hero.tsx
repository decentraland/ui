import * as React from 'react'
import { Header } from '../..'
import './Hero.css'

export type HeroProps = {
  title: string
  subtitle?: string
  width?: number
  height?: number
}

export class Hero extends React.PureComponent<HeroProps> {
  render() {
    const { title, subtitle, width, height, children } = this.props
    let style = null
    if (width || height) {
      style = { width, height }
    }
    return (
      <div className="dcl hero" style={style}>
        {children ? <div className="content">{children}</div> : null}
        <Header className="title" size="huge">
          {title}
        </Header>
        {subtitle ? <Header className="subtitle">{subtitle}</Header> : null}
      </div>
    )
  }
}
