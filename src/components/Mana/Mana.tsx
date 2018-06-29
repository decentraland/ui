import * as React from 'react'
import './Mana.css'
import { Header } from 'semantic-ui-react'

type Props = {
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'huge'
  black?: boolean
  inline?: boolean
  className?: string
  children?: React.ReactChild
}

export class Mana extends React.Component<Props> {
  static defaultProps = {
    className: ''
  }

  render() {
    const { size, className, black, inline, children, ...rest } = this.props
    const classes = `dcl mana ${black ? 'black ' : ''}${
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
