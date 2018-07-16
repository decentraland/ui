import * as React from 'react'
import './Mana.css'
import { Header } from 'semantic-ui-react'

export type ManaProps = {
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'huge'
  black?: boolean
  text?: boolean
  inline?: boolean
  className?: string
  children?: React.ReactChild
}

export class Mana extends React.Component<ManaProps> {
  static defaultProps = {
    className: ''
  }

  render() {
    let { size, className, black, text, inline, children, ...rest } = this.props
    if (black) {
      console.warn(
        'Deprecation Warning: the prop `black` of <Mana/> component has been deprecated in favor of `text`.'
      )
      text = true
    }
    const classes = `dcl mana ${text ? 'text ' : ''}${
      inline ? 'inline ' : ''
    }${className}`.trim()
    return (
      <Header size={size} className={classes} {...rest}>
        <i className="symbol">⏣</i>
        {children}
      </Header>
    )
  }
}
