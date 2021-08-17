import * as React from 'react'
import { Container } from '../Container/Container'
import './Page.css'

export type PageProps = {
  className?: string
  isFullscreen?: boolean
}

export class Page extends React.PureComponent<PageProps> {
  static defaultProps = {
    hasHero: false,
    heroHeight: 302,
    isFullscreen: false
  }

  render(): JSX.Element {
    const { isFullscreen, className, children } = this.props
    let classes = 'dcl page'

    if (isFullscreen) {
      classes += ' fullscreen'
    }

    if (className) {
      classes += ` ${className}`
    }

    return (
      <div className={classes}>
        {isFullscreen ? children : <Container>{children}</Container>}
      </div>
    )
  }
}
