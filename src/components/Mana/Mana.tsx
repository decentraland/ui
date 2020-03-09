import * as React from 'react'
import { Header, HeaderProps } from '../Header/Header'
import './Mana.css'

export type ManaProps = {
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'huge'
  inline?: boolean
  className?: string
  children?: React.ReactChild
}

export class Mana extends React.Component<ManaProps & HeaderProps> {
  static defaultProps = {
    className: ''
  }

  render() {
    const { size, className, inline, children, ...rest } = this.props
    const classes = `dcl mana ${inline ? 'inline ' : ''}${className}`.trim()
    return (
      <Header size={size} className={classes} {...rest}>
        <i className="symbol">⏣</i>
        {children}
      </Header>
    )
  }
}
