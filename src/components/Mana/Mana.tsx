import * as React from 'react'
import { Header, HeaderProps } from '../Header/Header'
import './Mana.css'

export type ManaProps = {
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'huge'
  inline?: boolean
  l2?: boolean
  className?: string
  children?: React.ReactChild
}

export class Mana extends React.Component<ManaProps & HeaderProps> {
  static defaultProps = {
    className: ''
  }

  render() {
    const { size, className, inline, children, l2, ...rest } = this.props
    const classes = `dcl mana ${inline ? 'inline ' : ''}${className}`.trim()
    return (
      <Header size={size} className={classes} {...rest}>
        <i className="symbol">{l2 ? <i className="l2" /> : '⏣'}</i>
        {children}
      </Header>
    )
  }
}
