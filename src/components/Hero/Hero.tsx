import * as React from 'react'
import { ContainerProps } from 'semantic-ui-react/dist/commonjs/elements/Container/Container'
import { HeaderProps } from 'semantic-ui-react/dist/commonjs/elements/Header/Header'
import { Container } from '../Container/Container'
import { Header } from '../Header/Header'
import './Hero.css'

export type HeroProps = {
  width?: number
  height?: number
  centered?: boolean
  className?: string
}

export class Hero extends React.PureComponent<HeroProps> {
  static Header = ({ children, ...props }: HeaderProps): JSX.Element => (
    <Container>
      <Header className="hero-title" size="huge" {...props}>
        {children}
      </Header>
    </Container>
  )

  static Description = ({ children, ...props }: HeaderProps): JSX.Element => (
    <Container>
      <Header className="hero-subtitle" {...props}>
        {children}
      </Header>
    </Container>
  )

  static Content = ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
    <div className="hero-content" {...props}>
      {children}
    </div>
  )

  static Actions = ({ children, ...props }: ContainerProps): JSX.Element => (
    <Container className="hero-actions" {...props}>
      {children}
    </Container>
  )

  render(): JSX.Element {
    const { centered = false, width, height, className, children } = this.props
    let style = null
    let classes = ''

    if (centered) {
      classes += ' centered'
    }

    if (className) {
      classes += ` ${className}`
    }

    if (width || height) {
      style = { width, height }
    }
    return (
      <div className={'dcl hero' + classes} style={style}>
        {children}
      </div>
    )
  }
}
