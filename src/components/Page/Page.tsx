import * as React from 'react'

import { Container } from '../..'

import './Page.css'

export type PageProps = {
  hasHero: boolean
  heroHeight: 302
}

export class Page extends React.PureComponent<PageProps> {
  static defaultProps = {
    hasHero: false,
    heroHeight: 302
  }

  render() {
    const { hasHero, heroHeight, children } = this.props
    const style = {
      marginTop: hasHero ? heroHeight : 0
    }
    return (
      <div className="Page" style={style}>
        <Container>{children}</Container>
      </div>
    )
  }
}
