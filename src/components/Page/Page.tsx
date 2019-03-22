import * as React from 'react'

import { Container } from '../..'

import './Page.css'

export type PageProps = {
  hasHero?: boolean
  heroHeight?: 302
  isFullscreen?: boolean
}

export class Page extends React.PureComponent<PageProps> {
  static defaultProps = {
    hasHero: false,
    heroHeight: 302,
    isFullscreen: false
  }

  render() {
    const { hasHero, heroHeight, isFullscreen, children } = this.props
    const style = {
      marginTop: hasHero ? heroHeight : 0
    }
    let classes = 'dcl page'
    if (isFullscreen) {
      classes += ' fullscreen'
    }

    return (
      <div className={classes} style={style}>
        {isFullscreen ? children : <Container>{children}</Container>}
      </div>
    )
  }
}
