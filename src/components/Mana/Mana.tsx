import * as React from 'react'
import './Mana.css'
import { Header, HeaderProps } from 'semantic-ui-react'

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
    const { size, className, black, inline, children, ...rest } = this.props
    const classes = `dcl mana ${inline ? 'inline ' : ''}${className}`.trim()
    return (
      <Header size={size} className={classes} {...rest}>
        <i className="symbol">⏣</i>
        {children}
      </Header>
    )
  }
}
